import Main from './components/Main.vue'
import User from './components/User.vue'
import MyKids from './components/MyKids.vue'
import Students from './components/Students.vue'
import AllDarses from './components/AllDarses.vue'
//import Login from './components/Login.vue'

const routes = [
  {
    path: '/',
    component: User,
    name: 'user' 
  },
  {
    path: '/mykids',
    component: MyKids,
    name: 'mykids' 
  },
  {
    path: '/alldarses/:code',
    component: AllDarses,
    name: 'all_darses' 
  },
  {
    path: '/all_students',
    component: Students,
    name: 'admin_students' 
  },
  {
    path: '/dars/:code',
    component: Main,
    name: 'main'
  }
]

export default routes
