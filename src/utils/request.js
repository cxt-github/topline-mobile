import axios from 'axios'

//导入store
import store from '../store/index'
//导入json-bigint,用来处理大数字
import JSONbig from 'json-bigint'

//可以使用自定义配置新建一个 axios 实例
const myrequest = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/',
    transformResponse:  (data) => {
      // 对 data 进行任意转换处理
      try {
         //如果能转换成功，就转换，并返回转换后的结果
         let obj = JSONbig.parse(data);
         return obj
      } catch (error) {
        // 如果不能转换成功，就直接返回它原来的结果
        return data;
      }
    },
})

//再自定义一个 axios 实例，用来刷新token
const myrequest_token = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
})

// 添加请求拦截器
myrequest.interceptors.request.use( (config) => {
    // 在发送请求之前做些什么
    //在store仓库获取token
    const use = store.state.user
    //判断，有值才添加请求头
    if(use && use.token) {
      config.headers.Authorization = `Bearer ${use.token}`
    }
    return config
  },  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
myrequest.interceptors.response.use( (response) => {
    // 对响应数据做点什么
    return response.data.data || response.data;
  }, async (error) => {
    // 对响应错误做点什么
    if(error.response.status === 401) {
      let refresh_token = store.state.user.refresh_token
      let res = await myrequest_token({
        url: '/app/v1_0/authorizations',
        method: 'put',
        headers:{
          Authorization: `Bearer ${refresh_token}`
        }
      })
      //得到新token
      let token = res.data.data.token
      //保存新同肯
      store.commit('setUse',{
        token,
        refresh_token
      })
      //重新发请求登录
      return myrequest(error.config)
    }
    return Promise.reject(error);
  });

export default myrequest