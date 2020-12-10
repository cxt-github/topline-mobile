// 封装所有用户相关的网络请求

//导入request
import request from '../utils/request'

// 请求登录接口
export function userLogin({mobile,code}) {
    return request({
        url: '/app/v1_0/authorizations',
        method: 'post',
        data:{
            mobile,
            code
        }
    })
}