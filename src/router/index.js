import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/dashboard', component: Dashboard }
]

const history = createWebHistory()

const router = createRouter({
    history,
    routes
})

export default router;