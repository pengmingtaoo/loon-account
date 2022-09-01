import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import TagsExpendLayout from '@/components/money/TagsExpendLayout.vue'
import TagsIncomeLayout from '@/components/money/TagsIncomeLayout.vue';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout',Layout);
Vue.component('Icon',Icon);
Vue.component('TagsExpendLayout',TagsExpendLayout);
Vue.component('TagsIncomeLayout',TagsIncomeLayout);


new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app');

