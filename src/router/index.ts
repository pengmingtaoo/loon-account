import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';

import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import detail from '@/views/detail.vue'
import EditLabel from '@/views/EditLabel.vue';


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path:'/',
        redirect:'/money'  // 重定向
    },
    {
        path:'/money',
        name:'money',
        component:Money,
    },
    {
        // path:'/labels',
        // name:'labels',
        // component: Labels,
        path:'/detail',
        name:'detail',
        component: detail,
    },
    {
        path:'/statistics',
        name:'statistics',
        component:Statistics,
    },
    {
        path:'/detail/edit/:id',
        name:'editLabel',
        component:EditLabel,
    },
    {
        path:'*',
        name:'*',
        component:NotFound,
    }
];

const router = new VueRouter({
  routes
});

export default router;
