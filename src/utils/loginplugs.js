import Vue from 'vue'
// 导入 store
import store from "@/store";
// 导入 dailog 
import { Dialog } from "vant";
// 导入 router
import router from "@/router";

//使用store router vant 
Vue.use(Dialog);

//给Vue封装一个登录的插件
var myplugs = {};

export default myplugs.install = (Vue, options) => {
    // 4. 添加实例方法
    Vue.prototype.$login = () => {
        // 逻辑...
        //判断用户是否登录
        let use = store.state.user;
        if (!use || !use.token) {
            Dialog.confirm({
                title: "注意",
                message: "要进行当前操作需要登录",
            })
                .then(() => {
                    //没有登录直接跳转到登录页面
                    router.push("/login");
                })
                .catch(() => {
                });
             return use
        }
    }
}