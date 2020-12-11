//封装所以与频道相关的请求

//导入request
import request from '../utils/request'

//获取用户频道
export function getChannel() {
    return request({
        url: '/app/v1_0/user/channels',
        method: 'get',
    })
}

//获取全部频道
export function getAllChannel() {
    return request({
        url: '/app/v1_0/channels',
        method: 'get'
    })
}

//保存用户频道
export function setChannel({channels}) {
    return request({
        url: '/app/v1_0/user/channels',
        method: 'put',
        data:{
            channels
        }
    })
}