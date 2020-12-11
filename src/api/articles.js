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