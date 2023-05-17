import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "@/components/Login";
import Register from "@/components/Register";
import VueCookies from 'vue-cookies';
import Home from "@/components/Home";
import SysLogin from "@/components/sys/SysLogin"
import CourseSchedule from '@/components/CourseSchedule';
import CourseSelect from '@/components/CourseSelect';
import SysHome from "@/components/sys/SysHome";
import SysStudent from "@/components/sys/SysStudent";



Vue.use(VueRouter)
Vue.use(VueCookies)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
        // component: () => import('../views/index.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/sysLogin',
        name: 'SysLogin',
        component: SysLogin
    },
    {
        path: '/course_select/select',
        name: 'CourseSelect',
        component: CourseSelect
    },
    {
        path: '/course_select/schedule',
        name: 'CourseSchedule',
        component: CourseSchedule
    },
    {
        path: '/sysHome',
        name: 'SysHome',
        component: SysHome
    },
    {
        path: '/sysStudent',
        name: 'SysStudent',
        component: SysStudent
    }
];

const router = new VueRouter({
    mode: 'history',//去掉URL中的#
    // base: process.env.BASE_URL,
    routes: routes
})



export default router
