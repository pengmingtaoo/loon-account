import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';

import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import detail from '@/views/detail.vue'
import EditLabel from '@/views/EditLabel.vue';
import Tags from '@/components/money/Tags.vue';
import EditRecord from '@/components/label/EditRecord.vue';


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
        path:'/labels',
        name:'labels',
        component: Labels,
    },
    {
        path:'/statistics',
        name:'statistics',
        component:Statistics,
    },

    {
        path:'*',
        name:'*',
        component:NotFound,
    },
    {
        path:'/tags',
        name:'tags',
        component:Tags,
    },
    {
        path: '/record/edit/:id',
        name: 'EditRecord',
        component: EditRecord
    },
];

const router = new VueRouter({
  routes
});

export default router;
