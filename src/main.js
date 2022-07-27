import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

export const TaskBus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')
