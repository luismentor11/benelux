const dictionaries = {
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  pt: () => import('./dictionaries/pt.json').then((module) => module.default),
};

export type Locale = 'es' | 'en' | 'pt';

export const getDictionary = async (locale: Locale) => {
  if (locale === 'en' || locale === 'pt' || locale === 'es') {
    return dictionaries[locale]();
  }
  return dictionaries.es();
};
