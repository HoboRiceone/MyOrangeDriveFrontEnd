import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import MainFrame from '../components/MainFrame.vue'
import Filemanagement from '../components/subpage/Filemanagement.vue'
import Settings from '../components/subpage/Settings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/MainFrame',
    name: 'MainFrame',
    component: MainFrame,
    children:[
      {
        path: '/Filemanagement',
        name: 'Filemanagement',
        component: Filemanagement
      },
      {
        path: '/Settings',
        name: 'Settings',
        component: Settings
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
