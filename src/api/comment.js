//封装所以与品论相关的请求

//导入request
import request from '../utils/request'

//获取评论或评论回复
export function getComment({type,source,offset,limit}) {
    return request({
        url: '/app/v1_0/comments',
        method: 'get',
        params: {
            type: type,
            source: source,
            offset: offset || null,
            limit:  limit || null,
        }
    })
}