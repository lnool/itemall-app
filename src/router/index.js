import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../views/home/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    name: 'detail',
    path: '/detail/:iid',
    component: () => import('../views/home/Detail.vue'),
    meta: {
      title: '商品详情'
    }
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('../views/category/Category.vue'),
    meta: {
      title: '分类'
    }
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('../views/cart/Cart.vue'),
    meta: {
      title: '购物车'
    }
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('../views/profile/Profile.vue'),
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
