import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'
import './css/tailwind.css'
import router from './router'

createApp(App).use(router).use(PrimeVue,{
    theme:{
        preset : Aura,
        options: {
            darkModeSelector: false // 👈 disable dark mode
        }
    }
}).mount('#app')
