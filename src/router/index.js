import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "@/components/user/Login";
import Register from "@/components/user/Register";
import VueCookies from 'vue-cookies';
import Home from "@/components/Home";
import SysLogin from "@/components/sys/SysLogin";
import CoursePlatform from "@/components/homework/CoursePlatform.vue";
import CoursePage from "@/components/homework/CoursePage.vue";
import HomePage from "@/components/homework/HomePage";
import HomeworkList from "@/components/homework/student/HomeworkList.vue";
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
import HomeworkPage from "@/components/homework/student/HomeworkPage.vue";
import THomeworkList from "@/components/homework/teacher/THomeworkList.vue";
import AddHomework from "@/components/homework/teacher/AddHomework.vue";
import StudentHomeworkList from "@/components/homework/teacher/StudentHomeworkList.vue";
import TeacherHomeworkPage from "@/components/homework/teacher/TeacherHomeworkPage.vue";
import CourseScore from '@/components/course_score/CourseScore'


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
        path: '/course_score',
        name: 'courseScore',
        component: CourseScore
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
            }, {
                path: '/coursepage/thomeworklist',
                name: 'THomeworkList',
                component: THomeworkList

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
    },
    {
        path: '/addhomework',
        name: 'AddHomework',
        component: AddHomework
    },{
        path: '/studenthomeworklist',
        name: 'StudentHomeworkList',
        component: StudentHomeworkList
    },{
        path: '/teacherhomeworkpage',
        name: 'TeacherHomeworkPage',
        component: TeacherHomeworkPage
    }

];

const router = new VueRouter({
    mode: 'history',//去掉URL中的#
    // base: process.env.BASE_URL,
    routes: routes
})


export default router
