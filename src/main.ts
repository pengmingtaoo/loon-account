import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import TagsLayout from '@/components/money/TagsLayout.vue';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout',Layout);
Vue.component('Icon',Icon);
Vue.component('TagsLayout',TagsLayout);

new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app');

// const addDate = function(value:number){
//   return value < 10 ? '0'+value:value;
// }
//
// Vue.filter('formatDate', function(value:number) {
//   const date = new Date(value);
//   const year = date.getFullYear();
//   const month = addDate(date.getMonth());
//   const day = addDate(date.getDate());
//   const hours = addDate(date.getHours());
//   const min = addDate(date.getMinutes());
//   const sec = addDate(date.getSeconds());
//   return year+'年'+month+'月'+day+'日  '+hours+':'+min+':'+sec;
// })