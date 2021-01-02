import Vue from 'vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

import routes from './routes'
let router = new VueRouter({
   routes,
   mode: 'history'
})

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
