import {
  DefaultLng,
  FallbackLng,
  DefaultNS,
  DefaultLabel,
  LanguageItem,
} from '@/types/i18next'

// It is recommended to read up on IETF Language Codes.
// If you're using a language detector, do not define the lng option
// https://en.wikipedia.org/wiki/IETF_language_tag
export const defaultLng: DefaultLng = 'en'
export const fallbackLng: FallbackLng = 'ko'

// If passing the ns option, the defaultNS will, by default, be set to the first ns passed.
export const defaultNS: DefaultNS = ['translation', 'zod', 'zod-custom']

// LanguageStatus
export const defaultLabel: DefaultLabel = 'English (United States)'

// LanguageSwitcher
export const languageItems: LanguageItem[] = [
  { value: defaultLng, label: defaultLabel },
  { value: 'ko', label: '한국어' },
]
