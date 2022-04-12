import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Home from '../views/Home.vue'
import InfoShow from '../views/InfoShow.vue'
import FundList from '../views/FundList.vue'
import AdminIndex from '../views/AdminIndex.vue'
import Repair from '../views/Repair.vue'
import Complain from '../views/Complain.vue'
import Other from '../views/Other.vue'
import HouseHold from '../views/HouseHold.vue'
import Pay from '../views/Pay.vue'

const routes = [
  {
    path: '/',
    redirect:'/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      { path: '', component: Home },
      { path: '/home', name: 'home', component: Home },
      { path: '/infoshow', name: 'infoshow', component: InfoShow },
      { path: '/repair', name: 'repair', component: Repair },
      { path: '/complain', name: 'complain', component: Complain },
      { path: '/other', name: 'other', component: Other },
      { path: '/household', name: 'household', component: HouseHold },
      { path: '/pay', name: 'pay', component: Pay },
    ]
  },
  {
    path: '/register',
    name: 'register',
    component:Register
  },
  {
    path: '/login',
    name: 'login',
    component:Login
  },
  {
    path: '/adminindex',
    name: 'adminindex',
    component:AdminIndex,

  },
  {
    path: '/:pathMatch(.*)*',
    name: '/404',
    component:NotFound
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=> {
  const isLogin = localStorage.eleToken ? true : false
  //const isLoginA = localStorage.eleTokena ? true : false
  //console.log(localStorage)
  if (to.path == "/login" || to.path == "/register") {
    next()
  }
  else {
    isLogin ? next() : next("/login")
    //isLogin ? next() : next("/login")
  }
  /*if (isLoginA) {
    next('/indexa')
  } else {
    isLogin ? next() : next("/login")
  }*/
})

export default router
