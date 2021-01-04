import Main from './components/Main.vue'
import User from './components/User.vue'
import MyKids from './components/MyKids.vue'
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
    path: '/dars',
    component: Main,
    name: 'main'
  }
]

export default routes
