import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "@/components/user/Login";
import Register from "@/components/user/Register";
import VueCookies from 'vue-cookies';
import Home from "@/components/Home";
import SysLogin from "@/components/sys/SysLogin";
import CoursePlatform from "@/components/homework/CoursePlatform";
import CoursePage from "@/components/homework/CoursePage";
import HomePage from "@/components/homework/HomePage";
import HomeworkList from "@/components/homework/HomeworkList";
import CourseInfo from "@/components/homework/CourseInfo";
import CourseSchedule from '@/components/course_select/CourseSchedule';
import CourseSelect from '@/components/course_select/CourseSelect';
import SysHome from "@/components/sys/SysHome";
import SysStudent from "@/components/sys/SysStudent";
import SysTeacher from "@/components/sys/SysTeacher";
import SysCourse from "@/components/sys/SysCourse";
import SysSingleCourse from "@/components/sys/SysSingleCourse";
import ChangePassword from "@/components/user/ChangePassword";
import CourseList from "@/components/homework/CourseList.vue";
import HomeworkPage from "@/components/homework/HomeworkPage.vue";



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
    },
    {
        path: '/sysTeacher',
        name: 'SysTeacher',
        component: SysTeacher
    },
    {
        path: '/sysCourse',
        name: 'SysCourse',
        component: SysCourse
    },    
    {
        path: '/sysSingleCourse',
        name: 'SysSingleCourse',
        component: SysSingleCourse
    },  
    {
        path: '/courseplatform',
        name: 'CoursePlatform',
        component: CoursePlatform
    },
    {
        path: '/coursepage',
        name: 'CoursePage',
        component: CoursePage,
        children: [{
            path: '/coursepage/homepage',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/coursepage/info',
            name: 'CourseInfo',
            component: CourseInfo
        }, {
            path: '/coursepage/homeworklist',
            name: 'HomeworkList',
            component: HomeworkList
        }]
    },
    {
        path: '/courselist',
        name: 'CourseList',
        component: CourseList,
    },
    {
        path: '/homeworkpage',
        name: 'HomeworkPage',
        component: HomeworkPage
    },
    {
        path: '/changePassword',
        name: 'ChangePassword',
        component: ChangePassword
    }

];

const router = new VueRouter({
    mode: 'history',//去掉URL中的#
    // base: process.env.BASE_URL,
    routes: routes
})



export default router
