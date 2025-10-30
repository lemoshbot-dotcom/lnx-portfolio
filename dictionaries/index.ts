import 'server-only'
import type { Locale } from '@/i18n-config'

const dictionaries = {
  'pt-BR': () => import('./pt-BR.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]()
}
