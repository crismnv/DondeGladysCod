import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import './helpers/firebase'


Vue.use(VueFire)

new Vue({
  el: '#app',
  render: h => h(App)
})
