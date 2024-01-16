import { InitOptions } from "i18next"

export const fallbackLng = "en"
export const languages = [fallbackLng, "de", "it", "ch"] as const
export type Language = (typeof languages)[number]
export const defaultNS = "common"

export function getOptions(lng = fallbackLng, ns = defaultNS): InitOptions {
  return {
    // debug: true,
    supportedLngs: languages,
    // preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
