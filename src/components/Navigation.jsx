import React, { useState, useEffect, useMemo, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

const Navigation = memo(function Navigation() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const location = useLocation()
  const [navScalloped, setNavScalloped] = useState(false)
  const [isRouteChanging, setIsRouteChanging] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header') || document.querySelector('.header-details')
      if (header) {
        const headerBottom = header.getBoundingClientRect().bottom
        setNavScalloped(headerBottom <= 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // CRITICAL: Add route-changing class FIRST, before any other operations
    // This must happen synchronously to prevent any visual changes
    document.body.classList.add('route-changing')
    setIsRouteChanging(true) // Track in component state too
    
    // Force synchronous application
    void document.body.offsetHeight
    
    // Close mobile nav on route change
    setIsMobileNavOpen(false)
    
    // Remove route-changing class after route change is complete
    // Use longer delay to ensure all React updates are done
    setTimeout(() => {
      document.body.classList.remove('route-changing')
      setIsRouteChanging(false)
    }, 150)
  }, [location.pathname])

  useEffect(() => {
    // Prevent body scroll when mobile nav is open
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileNavOpen])

  const toggleMobileNav = () => {
    setIsMobileNavOpen(true)
  }

  const closeMobileNav = () => {
    setIsMobileNavOpen(false)
  }

  const handleNavLinkClick = () => {
    // Close mobile nav when any link is clicked
    closeMobileNav()
  }

  // Memoize active states to prevent unnecessary re-renders
  const activeStates = useMemo(() => {
    return {
      home: location.pathname === '/',
      allItems: location.pathname.startsWith('/all-items'),
      about: location.pathname.startsWith('/about'),
      mission: location.pathname.startsWith('/mission')
    }
  }, [location.pathname])
  
  const isActive = (path) => {
    if (path === '/') return activeStates.home
    if (path === '/all-items') return activeStates.allItems
    if (path === '/about') return activeStates.about
    if (path === '/mission') return activeStates.mission
    return false
  }

  return (
    <>
      {/* Mobile Nav Bar */}
      <div className="nav-container-mobile">
        <div className="mobile-nav-bar">
          <button className="mobile-menu-toggle" onClick={toggleMobileNav}>
            ☰
          </button>
          <h1 id="header-title-mobile">What's in Season?</h1>
        </div>
      </div>

      {/* Desktop Nav */}
      <div 
        className={`nav-container ${navScalloped ? 'scalloped-bottom' : ''}`}
        style={{
          backgroundColor: 'var(--color-primary)',
          transition: isRouteChanging ? 'none' : undefined
        }}
      >
        <div 
          className="nav"
          style={{
            backgroundColor: 'var(--color-primary)',
            transition: isRouteChanging ? 'none' : undefined
          }}
        >
          <div className={`nav-left ${isActive('/') ? 'nav-active' : ''}`}>
            <img src="/images/favicon.png" alt="Logo" id="favicon" />
            <h3>
              <Link to="/" className="home-link" onClick={() => {
                // Reset filters and period to current date when clicking home
                const now = new Date()
                const currentPeriod = (now.getDate() < 16 ? 'Early ' : 'Late ') +
                  now.toLocaleDateString('en-US', { month: 'long' })
                sessionStorage.setItem('selectedPeriod', currentPeriod)
                sessionStorage.removeItem('selectedFilter')
              }}>Home</Link>
            </h3>
          </div>
          <h3>
            <Link to="/all-items" className={isActive('/all-items') ? 'nav-active' : ''}>
              All Items
            </Link>
          </h3>
          <h3>
            <Link to="/about" className={isActive('/about') ? 'nav-active' : ''}>
              About
            </Link>
          </h3>
          <h3>
            <Link to="/mission" className={isActive('/mission') ? 'nav-active' : ''}>
              Mission
            </Link>
          </h3>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={`mobile-nav-overlay ${isMobileNavOpen ? 'active' : ''}`}
        onClick={closeMobileNav}
      />

      {/* Mobile Nav Menu */}
      <div className={`mobile-nav ${isMobileNavOpen ? 'active' : ''}`}>
        <button className="mobile-nav-close" onClick={closeMobileNav}>
          ×
        </button>
        <div className="mobile-nav-links" onClick={handleNavLinkClick}>
          <div className={`nav-left ${isActive('/') ? 'nav-active' : ''}`}>
            <img src="/images/favicon.png" alt="Logo" id="favicon" />
            <h2>
              <Link to="/" className="delayed-nav home-link" onClick={(e) => {
                handleNavLinkClick()
                // Reset filters and period to current date when clicking home
                const now = new Date()
                const currentPeriod = (now.getDate() < 16 ? 'Early ' : 'Late ') +
                  now.toLocaleDateString('en-US', { month: 'long' })
                sessionStorage.setItem('selectedPeriod', currentPeriod)
                sessionStorage.removeItem('selectedFilter')
              }}>
                Home
              </Link>
            </h2>
          </div>
          <h2>
            <Link to="/all-items" className={`delayed-nav ${isActive('/all-items') ? 'nav-active' : ''}`} onClick={handleNavLinkClick}>
              All Items
            </Link>
          </h2>
          <h2>
            <Link to="/about" className={`delayed-nav ${isActive('/about') ? 'nav-active' : ''}`} onClick={handleNavLinkClick}>
              About
            </Link>
          </h2>
          <h2>
            <Link to="/mission" className={`delayed-nav ${isActive('/mission') ? 'nav-active' : ''}`} onClick={handleNavLinkClick}>
              Mission
            </Link>
          </h2>
        </div>
      </div>

      {/* Escape key handler */}
      {isMobileNavOpen && (
        <EscapeHandler onEscape={closeMobileNav} />
      )}
    </>
  )
})

function EscapeHandler({ onEscape }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onEscape()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onEscape])
  return null
}

export default Navigation

