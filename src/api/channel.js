//封装所以与频道相关的请求

//导入request
import request from '../utils/request'

export function getChannel() {
    return request({
        url: '/app/v1_0/user/channels',
        method: 'get',
    })
}