import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { seasonThemes, seasonMapping } from './produce-data.js'
import '../../styles.css' // Main stylesheet
import './index.css' // React-specific styles

// Apply theme synchronously before React renders to prevent flash
function applyInitialTheme() {
  const now = new Date()
  const currentPeriod = (now.getDate() < 16 ? 'Early ' : 'Late ') +
    now.toLocaleDateString('en-US', { month: 'long' })
  
  const storedPeriod = sessionStorage.getItem('selectedPeriod')
  const periodToUse = storedPeriod || currentPeriod
  const season = seasonMapping[periodToUse] || "Summer"
  const theme = seasonThemes[season]
  
  // Apply CSS variables immediately
  document.documentElement.style.setProperty('--color-primary', theme.primary)
  document.documentElement.style.setProperty('--color-secondary', theme.secondary)
  document.documentElement.style.setProperty('--color-background', theme.background)
  document.documentElement.style.setProperty('--color-text', theme.text)
  
  // Apply body class
  document.body.className = season.toLowerCase()
}

// Apply theme before React renders
applyInitialTheme()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

