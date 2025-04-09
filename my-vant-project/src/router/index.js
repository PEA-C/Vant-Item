import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from '@/views/UserLogin.vue'
import UserRegister from '@/views/UserRegister.vue'
import PageDetail from '@/views/PageDetail.vue'
import PageLayout from '@/views/PageLayout.vue'
import PublicArticle from '@/views/PublicArticle.vue'
import MyCollect from '@/views/MyCollect.vue'
import LoginUser from '@/views/LoginUser.vue'
import MyLike from '@/views/MyLike.vue'

import { getToken } from '@/utils/storage'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: UserLogin },
    { path: '/register', component: UserRegister },
    { path: '/article/:id', component: PageDetail },
    {
      path: '/',
      component: PageLayout,
      redirect: '/article',
      children: [
        { path: 'article', component: PublicArticle },
        { path: 'like', component: MyLike },
        { path: 'collect', component: MyCollect },
        { path: 'user', component: LoginUser }
      ]
    }
  ]
})

// 全局前置守卫：
// 1. 所有的路由一旦被匹配到，在真正渲染解析之前，都会先经过全局前置守卫
// 2. 只有全局前置守卫放行，才能看到真正的页面

// 任何路由，被解析访问前，都会先执行这个回调
// 1. from 你从哪里来， 从哪来的路由信息对象
// 2. to   你往哪里去， 到哪去的路由信息对象
// 3. next() 是否放行，如果next()调用，就是放行 => 放你去想去的页面
//    next(路径) 拦截到某个路径页面

const whiteList = ['/login', '/register']
// 白名单列表，记录无需权限访问的所有页面

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
