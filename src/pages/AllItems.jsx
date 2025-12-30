import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { produceData } from '../produce-data.js'
import FilterButtons from '../components/FilterButtons'
import ProduceCard from '../components/ProduceCard'
import '../components/Header.css'
import './AllItems.css'

function AllItems() {
  const navigate = useNavigate()
  
  const [activeFilter, setActiveFilter] = useState(sessionStorage.getItem('selectedFilter') || 'all')
  
  // Theme is handled globally in App.jsx, no need to apply here

  const handleFilterChange = (filter) => {
    if (filter === activeFilter) {
      setActiveFilter('all')
      sessionStorage.removeItem('selectedFilter')
    } else {
      setActiveFilter(filter)
      sessionStorage.setItem('selectedFilter', filter)
    }
  }

  const filteredCards = useMemo(() => {
    return Object.entries(produceData)
      .map(([key, item]) => ({
        id: key,
        ...item,
        activeperiods: item.activeperiods.split(',')
      }))
      .filter(card => {
        if (activeFilter === 'all') return true
        if (activeFilter === 'fruits' && card.classification === 'fruit') return true
        if (activeFilter === 'vegetables' && card.classification === 'vegetable') return true
        if (activeFilter === 'nuts' && card.classification === 'nut') return true
        if (activeFilter === 'yearRound' && card.activeperiods.length >= 24) return true
        return false
      })
  }, [activeFilter])

  return (
    <>
      <div className="header-details">
        <div className="header-content">
          <div className="header-container">
            <h1 id="header-title">What's in Season?</h1>
            <h2 id="header-title-h2">All Produce Items</h2>
          </div>
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
        <div className="container scallop" id="container-all-items">
          {filteredCards.map(card => (
            <ProduceCard
              key={card.id}
              id={card.id}
              name={card.name}
              image={card.image}
              className="all-items"
              onClick={() => navigate(`/produce/${card.id}`)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default AllItems

