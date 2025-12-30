import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { produceData } from '../produce-data.js'
import { useSeasonTheme } from '../hooks/useSeasonTheme'
import PeriodDropdown from '../components/PeriodDropdown'
import FilterButtons from '../components/FilterButtons'
import ProduceCard from '../components/ProduceCard'
import EmptyState from '../components/EmptyState'
import '../components/Header.css'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const { applyTheme } = useSeasonTheme()
  
  const now = new Date()
  const defaultPeriod = (now.getDate() < 16 ? 'Early ' : 'Late ') +
    now.toLocaleDateString('en-US', { month: 'long' })
  
  const storedPeriod = sessionStorage.getItem('selectedPeriod')
  const [selectedPeriod, setSelectedPeriod] = useState(storedPeriod || defaultPeriod)
  const [activeFilter, setActiveFilter] = useState(sessionStorage.getItem('selectedFilter') || 'all')
  
  // Theme is handled globally in App.jsx, no need to re-apply here
  // This prevents double theme application that causes flash on route changes

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period)
    sessionStorage.setItem('selectedPeriod', period)
    // Pass true to indicate this is a theme change (not route change)
    applyTheme(period, true)
  }

  const handleFilterChange = (filter) => {
    if (filter === activeFilter) {
      // Toggle off if clicking the same filter
      setActiveFilter('all')
      sessionStorage.removeItem('selectedFilter')
    } else {
      setActiveFilter(filter)
      sessionStorage.setItem('selectedFilter', filter)
    }
  }

  const datetime = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  const handleDateClick = () => {
    const currentPeriod = (now.getDate() < 16 ? 'Early ' : 'Late ') +
      now.toLocaleDateString('en-US', { month: 'long' })
    // This is a theme change, so use smooth transition
    setSelectedPeriod(currentPeriod)
    sessionStorage.setItem('selectedPeriod', currentPeriod)
    applyTheme(currentPeriod, true) // Pass true for smooth theme transition
    setActiveFilter('all')
    sessionStorage.removeItem('selectedFilter')
  }

  // Filter and sort cards
  const filteredCards = useMemo(() => {
    return Object.entries(produceData)
      .map(([key, item]) => ({
        id: key,
        ...item,
        activeperiods: item.activeperiods.split(',')
      }))
      .filter(card => {
        // Period filter
        const matchesPeriod = card.activeperiods.includes(selectedPeriod)
        if (!matchesPeriod) return false

        // Classification filter
        if (activeFilter === 'all') return true
        if (activeFilter === 'fruits' && card.classification === 'fruit') return true
        if (activeFilter === 'vegetables' && card.classification === 'vegetable') return true
        if (activeFilter === 'nuts' && card.classification === 'nut') return true
        if (activeFilter === 'yearRound' && card.activeperiods.length >= 24) return true
        
        return false
      })
  }, [selectedPeriod, activeFilter])

  return (
    <>
      <div className="header" id="index">
        <h1 id="header-title">What's in Season?</h1>
        <h2 id="datetime">
          <a href="#" className="date-link" onClick={(e) => { e.preventDefault(); handleDateClick(); }}>
            Today's date: {datetime}
          </a>
        </h2>
        <div className="dropdown-container">
          <PeriodDropdown
            selectedPeriod={selectedPeriod}
            onPeriodChange={handlePeriodChange}
          />
        </div>
      </div>

      <div className="button-wrapper">
        <div className="button-container">
          <FilterButtons
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="container-wrapper">
        <div className={`container scallop ${filteredCards.length === 0 ? 'no-padding' : ''}`} id="cards-container">
          {filteredCards.map(card => (
            <ProduceCard
              key={card.id}
              id={card.id}
              name={card.name}
              image={card.image}
              onClick={() => navigate(`/produce/${card.id}`)}
            />
          ))}
        </div>
        <div className="container-empty-state">
          <EmptyState visible={filteredCards.length === 0} />
        </div>
      </div>
    </>
  )
}

export default Home

