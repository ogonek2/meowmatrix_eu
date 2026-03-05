import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServicesPageView from '../views/ServicesPageView.vue'
import HowWeWorkView from '../views/HowWeWorkView.vue'
import BriefView from '../views/BriefView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/services', name: 'Services', component: ServicesPageView },
  { path: '/how-we-work', name: 'HowWeWork', component: HowWeWorkView },
  { path: '/brief', name: 'Brief', component: BriefView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
