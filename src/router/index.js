import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('../views/Category.vue'),
    meta: {
      title: '分类'
    }
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      title: '购物车'
    }
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      title: '我的'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
export default router
