import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/dataPick1',
        name: 'dataPick1',
        component: () => import('../views/dataPick/index.vue')
    },
    {
        path: '/dataPick2',
        name: 'dataPick2',
        component: () => import('../views/dataPick2/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_SUB_PATH),
    routes
})

export default router
