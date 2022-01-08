import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import i18n from './i18n'
import {authService} from './components/auth'
import FontAwesomeIcon from "./_helpers/fontawesome";

router.beforeEach((to, from, next) => {
    let language = 'ru'
    if(authService.currentUserValue) {
        language = authService.currentUserValue.language ? authService.currentUserValue.language : 'ru'
    }
    i18n.global.locale = language
    next()
})

createApp(App)
    .use(router)
    .use(i18n)
    .use(Toast)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
