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

//拉黑作者
export function userBlacklist(id) {
    return request({
        url: '/app/v1_0/user/blacklists',
        method: 'POST',
        data: {
            target: id
        }
    })
}

//关注作者
export function userFollowed(artId) {
    return request({
        url: '/app/v1_0/user/followings',
        method: 'POST',
        data: {
            target: artId
        }
    })
}

//取关作者
export function unUserFollowed(artId) {
    return request({
        url: `/app/v1_0/user/followings/${artId}`,
        method: 'DELETE'
    })
}

//获取用户自己信息
export function userData() {
    return request({
        url: '/app/v1_0/user',
        method: 'GET'
    })
}

//获取用户个人资料
export function perData() {
    return request({
        url: '/app/v1_0/user/profile',
        method: 'GET'
    })
}

//获取用户的关注列表
export function getUserAttention() {
    return request({
        url: '/app/v1_0/user/followings',
        method: 'GET',
    })
}

//获取用户的粉丝列表
export function userFens() {
    return request({
        url: '/app/v1_0/user/followers',
        method: 'GET'
    })
}