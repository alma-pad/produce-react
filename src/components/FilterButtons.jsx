import React from 'react'
import './FilterButtons.css'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'fruits', label: 'Fruits' },
  { key: 'vegetables', label: 'Vegetables' },
  { key: 'nuts', label: 'Nuts' },
  { key: 'yearRound', label: 'Year Round' }
]

function FilterButtons({ activeFilter, onFilterChange }) {
  return (
    <>
      {FILTERS.map(filter => (
        <button
          key={filter.key}
          className={`filter-button ${activeFilter === filter.key ? 'button-active' : ''}`}
          data-filter={filter.key}
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </>
  )
}

export default FilterButtons

