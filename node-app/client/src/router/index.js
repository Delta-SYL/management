import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Home from '../views/Home.vue'
import InfoShow from '../views/InfoShow.vue'
import FundList from '../views/FundList.vue'
import AdminIndex from '../views/admin/AdminIndex.vue'
import Repair from '../views/Repair.vue'
import Complain from '../views/Complain.vue'
import Other from '../views/Other.vue'
import HouseHold from '../views/HouseHold.vue'
import Pay from '../views/Pay.vue'
import AdminHome from '../views/admin/AdminHome.vue'
import AdminRepair from '../views/admin/AdminRepair.vue'
import AdminOther from '../views/admin/AdminOther.vue'
import AdminComplain from '../views/admin/AdminComplain.vue'
import AdminUserInfo from '../views/admin/AdminUserInfo.vue'
import AdminHouse from '../views/admin/AdminHouse.vue'
import AdminCar from '../views/admin/AdminCar.vue'
import AdminNotice from '../views/admin/AdminNotice.vue'
import AdminPay from '../views/admin/AdminPay.vue'
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
     // { path: '', component: Home },
      { path: '/index', redirect: '/home' },
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
    children: [
     // { path: '', component: AdminHome },
     { path: '/adminindex', redirect: '/adminhome' },
      { path: '/adminhome', name: 'adminhome', component: AdminHome },
      { path: '/adminrepair', name: 'adminrepair', component: AdminRepair },
      { path: '/admincomplain', name: 'admincomplain', component: AdminComplain },
      { path: '/adminother', name: 'adminother', component: AdminOther },
      { path: '/adminuserinfo', name: 'adminuserinfo', component: AdminUserInfo },
      { path: '/adminhouse', name: 'adminhouse', component: AdminHouse },
      { path: '/admincar', name: 'admincar', component: AdminCar },
      { path: '/adminnotice', name: 'adminnotice', component: AdminNotice },
      { path: '/adminpay', name: 'adminpay', component: AdminPay },

    ]
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
