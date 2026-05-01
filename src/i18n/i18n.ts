// src/i18n.js
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    welcome: 'Welcome to our app!',
    user: "User"
  },
  kh: {
    welcome: 'សូមស្វាគម៏',
    user: "អ្នកប្រើប្រាស់"
  }
}

const i18n = createI18n({
  legacy: false, // Set to false to use Composition API
  locale: 'en', // default locale
  fallbackLocale: 'en', // fallback if key is missing
  messages,
})

export default i18n
