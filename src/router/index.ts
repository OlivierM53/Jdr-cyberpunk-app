import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/character' },
    {
      path: '/character',
      name: 'character',
      component: () => import('@/views/CharacterSheetView.vue'),
    },
    {
      path: '/lore',
      name: 'lore',
      component: () => import('@/views/LoreView.vue'),
    },
  ],
})

export default router
