import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'

//import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import VueClaw from 'vueclaw'
import VImageInput from 'vuetify-image-input/a-la-carte'

Vue.use(vuetify)

Vue.directive(VueClaw.name, VueClaw)
Vue.component(VImageInput.name, VImageInput)


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.component(VImageInput.name, VImageInput);

import routes from './routes'
let router = new VueRouter({
   routes,
   mode: 'history'
})

new Vue({ 
  store,
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
