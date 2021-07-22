import Vue from 'vue'
import VueRouter from 'vue-router'
import { queryToken } from '../util'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../views/home/Home.vue'),
    meta: {
      title: '首页',
      keepAlive: true
    }
  },
  {
    name: 'detail',
    path: '/detail/:iid/:id',
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
      title: '分类',
      keepAlive: true
    }
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('../views/cart/Cart.vue'),
    meta: {
      title: '购物车',
      requireAuth: true,
      keepAlive: false
    }
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('../views/profile/Profile.vue'),
    meta: {
      title: '我的',
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('../views/profile/Register.vue'),
    meta: {
      title: '注册',
      keepAlive: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/profile/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    name: 'order',
    path: '/order',
    component: () => import('../views/order/Order.vue'),
    meta: {
      title: '订单',
      requireAuth: true,
      keepAlive: false
    }
  },
  {
    name: 'order-detail',
    path: '/order-detail',
    component: () => import('../views/order/OrderDetail.vue'),
    meta: {
      title: '订单详情',
      requireAuth: true,
      keepAlive: false
    }
  },
]

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // 验证授权
  if (to.meta.requireAuth) {
    if (!queryToken().token) {
      router.replace('/login')
    }
  }

  window.document.title = to.meta.title
  next()
})
export default router
