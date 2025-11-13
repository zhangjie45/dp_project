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
    },
    //五星铝业
    {
        path: '/dfp',
        name: 'dfp',
        children: [
            {
                path: '/dfp/page1',
                name: 'page1',
                component: () => import('../views/dfp/dataPick/index.vue')
            },
            {
                path: '/dfp/page2',
                name: 'page2',
                component: () => import('../views/dfp/dataPick2/index.vue')
            },
            {
                path: '/dfp/page3',
                name: 'page3',
                component: () => import('../views/dfp/dataPickFactory/index.vue')
            },
            {
                path: '/dfp/page4',
                name: 'page4',
                component: () => import('../views/dfp/dataPickSection/index.vue')
            },

        ]
    },

]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_SUB_PATH),
    routes
})

export default router
