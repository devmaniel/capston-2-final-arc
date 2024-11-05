import { useEffect } from 'react'

export default function ThemeProvider({ children }) {
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        document.documentElement.setAttribute('data-theme', storedTheme || 'dark')
    }, [])
    return <>{children}</>
}