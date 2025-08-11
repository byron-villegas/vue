import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../components/UserDetail.vue'),
    },
    {
      path: '/amiibos',
      name: 'amiibos',
      component: () => import('../components/AmiiboList.vue'),
    },
    {
      path: '/amiibo/:id',
      name: 'amiibo-view',
      component: () => import('../components/AmiiboView.vue'),
    }
  ],
})

// Guard general para rutas que requieren autenticacion
router.beforeEach((to, from, next) => {
  if (to.name === 'amiibo-view') {
    const token = sessionStorage.getItem('token')

    if (!token) {
      return next({ name: 'home' })
    }
  }
  next()
})

export default router
