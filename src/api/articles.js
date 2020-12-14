//负责封装所有文章相关的服务请求

//导入request
import request from '../utils/request'

//频道新闻推荐
export function getArticles({channel_id,timestamp,with_top}) {
    return request({
        url: '/app/v1_1/articles',
        method: 'get',
        params: {
            channel_id,
            timestamp,
            with_top
        }
    })
}

//不喜欢文章
export function dislikeArticles(id) {
    return request({
        url: '/app/v1_0/article/dislikes',
        method: 'POST',
        data: {
            target: id
        }
    })
}

//举报文章
export function informArticles({id,type}) {
    return request({
        url: '/app/v1_0/article/reports',
        method: 'POST',
        data: {
            target: id,
            type: type,
            remark: '不爽，就想举报'
        }
    })
}

//联想建议
export function associateSuggest(q){
    return request({
        url: '/app/v1_0/suggestion',
        method: 'GET',
        params: {
            q
        }
    })
}

//搜索关键字文章列表
export function searchKeyArticles({page,per_page,key}) {
    return request({
        url: '/app/v1_0/search',
        method: 'GET',
        params:{
            page,
            per_page,
            q:key
        }
    })
}

//获取id文章详情
export function articlesDetails(artId) {
    return request({
        url: `/app/v1_0/articles/${artId}`,
        method: 'GET',
    })
}