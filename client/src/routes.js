import Main from './components/Main.vue'
import User from './components/User.vue'
import MyKids from './components/MyKids.vue'
import Students from './components/Students.vue'
import AllDarses from './components/AllDarses.vue'
import Alefba from './components/Alefba.vue'
import Kelas from './components/Kelas.vue'
//import Login from './components/Login.vue'

const routes = [
  {
    path: '/',
    component: User,
    name: 'user' 
  },
  {
    path: '/ui/mk',
    component: MyKids,
    name: 'mykids' 
  },
  {
    path: '/ui/all_darses',
    component: AllDarses,
    name: 'all_darses' 
  },
  {
    path: '/ui/as',
    component: Students,
    name: 'admin_students' 
  },
  {
    path: '/ui/dars/:darsId',
    component: Main,
    name: 'main'
  },
  {
    path: '/ui/alefba',
    component: Alefba,
    name: 'alefba'
  },
  {
    path: '/ui/kelas',
    component: Kelas,
    name: 'kelas'
  }
]

export default routes
