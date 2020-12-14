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