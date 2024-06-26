import {createStore} from 'vuex'
import auth from './modules/auth'
import profile from './modules/profile'
import todo from './modules/todo';
import expanse from './modules/expanse';
import test from './modules/test';

const store = createStore({
    modules: {
        auth,
        profile,
        todo,
        expanse,
        test
    }
})

export default store