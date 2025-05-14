import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeSlice'

export const useTheme = () => {
  const { dark, toggle } = useThemeStore()
//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', dark)
//   }, [dark])
  return { dark, toggle }
}
