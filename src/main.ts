import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'
import './css/tailwind.css'
import router from './router'
import ToastService from 'primevue/toastservice';

createApp(App).use(router).use(ToastService).use(PrimeVue,{
    theme:{
        preset : Aura,
        options: {
            darkModeSelector: false // 👈 disable dark mode
        }
    }
}).mount('#app')
