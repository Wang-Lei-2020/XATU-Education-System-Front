import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
Vue.use(Vuex)

const store = new Vuex.Store({
    //存储用户登录信息的一个状态
    state:{
        number:null,//当前用户
        isLogin:false,//登录状态
        name:null,//用户名字
        token:'' //用户登录成功后持有的token
    },
    //关联着其他三个目录，目的松耦合
    getters,
    mutations,
    actions
})
export default store;



// export default new Vuex.Store({
//     state: {
//         //是否登录判断
//         islogin: ''
//     },
//     mutations: {
//         login: (state, n) => {
//             //传入登录状态islogin
//             let islogin = JSON.parse(n);
//             localStorage.setItem('islogin', JSON.stringify(islogin));
//             console.log("store:" + islogin);
//             state.islogin = islogin;
//         }
//     }
// });