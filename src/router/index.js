import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "@/pages/login/LoginView";
import IndexView from "@/pages/index/IndexView";
import cookie from "vue-cookie";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'loginView',
        component: LoginView,
    },
    {
        path: '/index',
        name: 'index',
        component: IndexView,
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要权限
        },
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    // 判断页面是否需要权限
    if (to.meta.requireAuth) {
        if (cookie.get('token')) { // 判断cookie.token是否存在
            next()
        } else {
            // cookie.token 不存在
            setTimeout(() => {
                next({
                    path: '/',
                    query: {redirect: to.fullPath,state:'notlogin'}
                })
            }, 100)
        }
    } else {
        next()
    }
})

export default router
