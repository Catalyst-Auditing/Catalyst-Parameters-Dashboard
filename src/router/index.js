import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue'
import SubmitChange from '../views/SubmitChange.vue'
import Profile from '../views/Profile.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/submitchange', component: SubmitChange },
    { path: '/profile', component: Profile }
]

const history = createWebHistory()

const router = createRouter({
    history,
    routes
})

export default router;