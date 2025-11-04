import i18next from 'i18next';

// Import translation resources
import jaNavigation from './locales/ja/navigation.json';
import jaCommon from './locales/ja/common.json';
import jaHome from './locales/ja/home.json';
import jaAbout from './locales/ja/about.json';
import jaTutorial from './locales/ja/tutorial.json';
import jaGuidelines from './locales/ja/guidelines.json';
import jaDeveloper from './locales/ja/developer.json';
import jaGallery from './locales/ja/gallery.json';

import enNavigation from './locales/en/navigation.json';
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enAbout from './locales/en/about.json';
import enTutorial from './locales/en/tutorial.json';
import enGuidelines from './locales/en/guidelines.json';
import enDeveloper from './locales/en/developer.json';
import enGallery from './locales/en/gallery.json';

export const defaultLocale = 'ja';
export const supportedLocales = ['ja', 'en'] as const;

export type Locale = typeof supportedLocales[number];

export const resources = {
  ja: {
    navigation: jaNavigation,
    common: jaCommon,
    home: jaHome,
    about: jaAbout,
    tutorial: jaTutorial,
    guidelines: jaGuidelines,
    developer: jaDeveloper,
    gallery: jaGallery,
  },
  en: {
    navigation: enNavigation,
    common: enCommon,
    home: enHome,
    about: enAbout,
    tutorial: enTutorial,
    guidelines: enGuidelines,
    developer: enDeveloper,
    gallery: enGallery,
  },
} as const;

// Initialize i18next
export const initI18n = (locale: Locale = defaultLocale) => {
  if (!i18next.isInitialized) {
    i18next.init({
      lng: locale,
      fallbackLng: defaultLocale,
      supportedLngs: supportedLocales,
      resources,
      interpolation: {
        escapeValue: false, // React already escapes
      },
    });
  } else {
    i18next.changeLanguage(locale);
  }
  return i18next;
};

// Get translation function
export const getT = (locale: Locale = defaultLocale) => {
  const i18n = initI18n(locale);
  return i18n.t.bind(i18n);
};

// Detect locale from query parameter or browser language
export const detectLocale = (url: URL, acceptLanguage?: string): Locale => {
  // Check query parameter first
  const langParam = url.searchParams.get('lang');
  if (langParam && supportedLocales.includes(langParam as Locale)) {
    return langParam as Locale;
  }

  // Check Accept-Language header
  if (acceptLanguage) {
    const browserLang = acceptLanguage.split(',')[0].split('-')[0];
    if (supportedLocales.includes(browserLang as Locale)) {
      return browserLang as Locale;
    }
  }

  return defaultLocale;
};
