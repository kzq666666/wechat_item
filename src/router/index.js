import Vue from 'vue'
import VueRouter from 'vue-router';
import main from '../components/main'
import add from '../components/add'

import setting from '../components/setting'
Vue.use(VueRouter)
export default new VueRouter({
    routes:[
        {
            path:'/',
            name:'main',
            component:main
        },
        {
            path:'/add',
            name:'add',
            component:add
        },
        {
            path:'/setting',
            name:'setting',
            component:setting
        }
    ]
})