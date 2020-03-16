import Vue from 'vue'
import router from '@/router'

import './plugins/element.js'
import axios from './utils/http'

import App from './App.vue'
import { Message, Loading } from 'element-ui'

Vue.use(Message)
Vue.use(Loading)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.filter('escape2Html', (val) => {
  if (!val) return
  var arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' }
  return val.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, i) {
    return arrEntities[i]
  })
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
