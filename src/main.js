import '@babel/polyfill'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

import store from './store'
import './registerServiceWorker'
// import Materials from 'vue-materials'
// import 'materialize-css/dist/css/materialize.css'
// import 'materialize-css/dist/js/materialize.js'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(VeeValidate)

// Vue.use(Materials)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
