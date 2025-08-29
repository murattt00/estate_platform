import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardView.vue')
  },
  {
    path: '/appointments',
    name: 'appointments',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "appointments" */ '../views/AppointmentsView.vue')
  },
  {
    path: '/appointment/:id',
    name: 'appointment',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "appointment" */ '../views/AppointmentView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next({ name: "login" }) // giriş yoksa login sayfasına yönlendir
  } else {
    next() // geçişe izin ver
  }
})

export default router
