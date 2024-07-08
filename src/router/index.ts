import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('../views/WeatherView.vue')
    },
    {
      path: '/travel',
      name: 'travel',
      component: () => import('../views/TravelView.vue'),
      redirect: '/travel/spots',
      children: [
        { path: 'spots', component: import('../views/TravelSpotView.vue') },
        { path: 'restaurants', component: import('../views/TravelRestView.vue') },
        { path: 'hotels', component: import('../views/TravelHotelView.vue') },
        { path: 'activities', component: import('../views/TravelActivityView.vue') }
      ]
    }
  ]
})

export default router
