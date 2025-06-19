import { createRouter, createWebHistory } from 'vue-router'
import StarWarsExplorerView from '../views/StarWarsExplorerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StarWarsExplorerView,
    },
  ],
})

export default router
