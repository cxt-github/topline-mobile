// 对 token 操作的封装

//定义键
const user = 'user_token'

//数据保存
export function setToken(token) {
    window.localStorage.setItem(user,JSON.stringify(token))
}

//取出数据
export function getToken(){
    return JSON.parse(window.localStorage.getItem(user))
}

//删除数据
export function removeToken(){
    window.localStorage.removeItem(user)
}