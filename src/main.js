import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import locale from 'element-ui/lib/locale/lang/en'

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
 
Vue.component('apexchart', VueApexCharts)

Vue.use(ElementUI, { locale })
 

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)


import router from './router.js'

Vue.prototype.$qs = require('querystring')

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router
}).$mount('#app')
