import {db, auth} from '@/firebase'

export default {
    install: (app) => {
        app.config.globalProperties.$db = db;
        app.config.globalProperties.$auth = auth;
    }
};