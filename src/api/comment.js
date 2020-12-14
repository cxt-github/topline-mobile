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

//添加评论或评论回复
export function addComment({target,content,art_id}) {
    return request({
        url: '/app/v1_0/comments',
        method: 'POST',
        data: {
            target,
            content,
            art_id: art_id || null
        }
    })
}