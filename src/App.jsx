import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import AllItems from './pages/AllItems'
import ProduceDetails from './pages/ProduceDetails'
import About from './pages/About'
import Mission from './pages/Mission'
import Footer from './components/Footer'
import { useSeasonTheme } from './hooks/useSeasonTheme'
import { seasonThemes, seasonMapping } from './produce-data.js'

function App() {
  const location = useLocation()
  const { applyTheme } = useSeasonTheme()

  useEffect(() => {
    // CRITICAL: Disable transitions IMMEDIATELY on route change
    // Apply class synchronously before any other operations
    document.body.classList.add('route-changing')
    
    // Force synchronous application by reading a property
    void document.body.offsetHeight
    
    // Don't apply theme during route changes - it's already set correctly
    // Theme is applied synchronously in main.jsx and doesn't need re-application
    // Re-applying causes CSS variable updates which trigger flashes
    
    // Remove route-changing class after route change is complete
    setTimeout(() => {
      document.body.classList.remove('route-changing')
    }, 100)
  }, [location.pathname]) // Only depend on pathname, not applyTheme

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-items" element={<AllItems />} />
        <Route path="/produce/:id" element={<ProduceDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/mission" element={<Mission />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

