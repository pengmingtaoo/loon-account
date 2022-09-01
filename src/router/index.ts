import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';

import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import TagsMinus from'@/components/money/TagsMinus.vue';
import TagsAdd from'@/components/money/TagsAdd.vue';

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
        redirect:'/TagsMinus',
        children:[{
            path:'/TagsMinus',
            name:'TagsMinus',
            component:TagsMinus,
        },{
            path:'/TagsAdd',
            name:'TagsAdd',
            component:TagsAdd,
        }],
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
    }
];

const router = new VueRouter({
  routes
});

export default router;
