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