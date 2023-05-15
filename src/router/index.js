import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "@/components/Login";
import Register from "@/components/Register";
import VueCookies from 'vue-cookies';
import Home from "@/components/Home";
import CourseSchedule from '@/components/CourseSchedule';
import CourseSelect from '@/components/CourseSelect';


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
        path: '/course_select/select',
        name: 'CourseSelect',
        component: CourseSelect
    },
    {
        path: '/course_select/schedule',
        name: 'CourseSchedule',
        component: CourseSchedule
    }
];

const router = new VueRouter({
    mode: 'history',//去掉URL中的#
    // base: process.env.BASE_URL,
    routes: routes
})



export default router