import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OscilloscopeView from '../views/OscilloscopeView.vue'
import FileView from '../views/FileView.vue'
import HistoryView from '../views/HistoryView.vue'
import AboutView from '../views/AboutView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/oscilloscope',
    name: 'oscilloscope',
    component: OscilloscopeView
  },
  {
    path: '/file',
    name: 'files',
    component: FileView
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    component: AboutView
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  // history: createWebHistory("osc/"),
  history: createWebHashHistory(),
  routes
})

export default router
