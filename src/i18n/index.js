
import { createI18n } from 'vue-i18n'
import zh_ch from './zh-cn.json'
export const languages = {
  'zh_CN': {
    ...zh_ch
     
  },
  
}

export const getLanguage = () => {
  const chooselang = localStorage.getItem('locale')
  return chooselang || 'zh_CN'
}


 const i18n = createI18n({
    legacy: false,
    locale: getLanguage(),
    fallbackLocale: 'zh_CN',
    global: true,
    messages: languages
})

export default i18n;
