import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vClickOutside from 'v-click-outside';
import { getDateAndTime } from '@/helpers/dateTime';
import { toInitials } from './helpers/text';
 
Vue.use(vClickOutside)
Vue.filter('getDateAndTimeAsString', getDateAndTime);
Vue.filter('toInitials', toInitials);
Vue.config.productionTip = false;
Vue.config.devtools = true;

// Vue.config.errorHandler = function (err, vm, info) {
//     console.log(err + '---' + info);
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
