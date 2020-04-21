import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import MainFrame from '../components/MainFrame.vue'
import AdminMainFrame from '../components/AdminMainFrame.vue'
import Filemanagement from '../components/subpage/Filemanagement.vue'
import Settings from '../components/subpage/Settings.vue'
import SystemSettings from '../components/Adminsubpage/SystemSettings.vue'
import Usermanagement from '../components/Adminsubpage/Usermanagement.vue'
import Useradd from '../components/Adminsubpage/Usersubpage/Useradd.vue'
import Userchange from '../components/Adminsubpage/Usersubpage/Userchange.vue'
import Storageconfigure from '../components/Adminsubpage/Storageconfigure.vue'
import AWSadd from '../components/Adminsubpage/Configsubpage/AWSadd.vue'
import AWSchange from '../components/Adminsubpage/Configsubpage/AWSchange.vue'
import Azurechange from '../components/Adminsubpage/Configsubpage/Azurechange.vue'


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
    path: '/AdminMainFrame',
    name: 'AdminMainFrame',
    component: AdminMainFrame,
    children:[
      {
        path: '/SystemSettings',
        name: 'SystemSettings',
        component: SystemSettings
      },
      {
        path: '/Usermanagement',
        name: 'Usermanagement',
        component: Usermanagement
      },
      {
        path: '/Useradd',
        name: 'Useradd',
        component: Useradd
      },
      {
        path: '/Userchange',
        name: 'Userchange',
        component: Userchange
      },
      {
        path: '/Storageconfigure',
        name: 'Storageconfigure',
        component: Storageconfigure
      },
      {
        path: '/AWSadd',
        name: 'AWSadd',
        component: AWSadd
      },
      {
        path: '/AWSchange',
        name: 'AWSchange',
        component: AWSchange
      },
      {
        path: '/Azurechange',
        name: 'Azurechange',
        component: Azurechange
      },
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
