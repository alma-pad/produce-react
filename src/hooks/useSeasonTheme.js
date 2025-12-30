import { useCallback } from 'react'
import { seasonThemes, seasonMapping } from '../produce-data.js'

export function useSeasonTheme() {
  const applyTheme = useCallback((activePeriod, isThemeChange = false) => {
    const season = seasonMapping[activePeriod] || "Summer"
    
    console.log(`Applying theme for period: ${activePeriod}, Season: ${season}`)
    
    // CRITICAL: If route-changing class is present, DO NOT update CSS variables
    // This prevents any visual changes during route navigation
    const isRouteChanging = document.body.classList.contains('route-changing')
    if (isRouteChanging && !isThemeChange) {
      console.log('Skipping theme update during route change to prevent flash')
      return // Exit early - don't update CSS variables during route changes
    }
    
    // Add class to enable smooth transitions for theme changes BEFORE changing CSS variables
    if (isThemeChange && !isRouteChanging) {
      document.body.classList.add('theme-changing')
    }
    
    // Get the theme colors
    const theme = seasonThemes[season]
    
    // Apply CSS variables - this will trigger the transition if theme-changing class is present
    document.documentElement.style.setProperty('--color-primary', theme.primary)
    document.documentElement.style.setProperty('--color-secondary', theme.secondary)
    document.documentElement.style.setProperty('--color-background', theme.background)
    document.documentElement.style.setProperty('--color-text', theme.text)
    
    // Apply body class - use classList methods to preserve theme-changing/route-changing classes
    document.body.classList.remove('spring', 'summer', 'autumn', 'winter', 'fall')
    document.body.classList.add(season.toLowerCase())
    
    // Remove theme-changing class after transition completes
    if (isThemeChange && !isRouteChanging) {
      setTimeout(() => {
        document.body.classList.remove('theme-changing')
      }, 350) // Slightly longer than 0.3s transition
    }
  }, [])

  return { applyTheme }
}

