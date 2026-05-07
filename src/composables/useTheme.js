import { useTheme as useVuetifyTheme } from 'vuetify'

export function useTheme() {
  const theme = useVuetifyTheme()

  return {
    getPrimaryColor: () => theme.current.value.colors.primary,
    getSecondaryColor: () => theme.current.value.colors.secondary,
    getHeaderColor: () => theme.current.value.colors.header,
    getHeroColor: () => theme.current.value.colors.hero,
    getContrastColor: () => theme.current.value.colors.contrast,
    getBackgroundColor: () => theme.current.value.colors.primary,
    getTextColor: () => theme.current.value.colors.text,
    getTextAuxiliarColor: () => theme.current.value.colors.textAuxiliar,
    getAuxiliarColor: () => theme.current.value.colors.auxiliar,
    getAlternativeButtonColor: () => theme.current.value.colors.alternativeButtoncolor,
  }
}
