import { createI18n } from 'vue-i18n'
import locales from './locales';


export default createI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages: locales,
  silentTranslationWarn: true,
});

