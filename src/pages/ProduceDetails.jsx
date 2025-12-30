import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { produceData } from '../produce-data.js'
import { useSeasonTheme } from '../hooks/useSeasonTheme'
import '../components/Header.css'
import './ProduceDetails.css'

function ProduceDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { applyTheme } = useSeasonTheme()
  
  const produce = produceData[id]

  useEffect(() => {
    if (!produce) {
      navigate('/')
      return
    }

    // Determine peak season for theme
    const periods = produce.activeperiods.split(',').map(p => p.trim())
    const now = new Date()
    const currentPeriod = (now.getDate() < 16 ? 'Early ' : 'Late ') +
      now.toLocaleDateString('en-US', { month: 'long' })

    let peakSeason
    if (periods.length === 24) {
      peakSeason = currentPeriod
    } else {
      const middleIndex = Math.floor(periods.length / 2) - 1
      peakSeason = periods[middleIndex]
    }

    applyTheme(peakSeason)
  }, [id, produce, navigate, applyTheme])

  if (!produce) {
    return null
  }

  const now = new Date()
  const datetime = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  const handleBack = () => {
    if (document.referrer && document.referrer.includes(window.location.hostname)) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <div className="header-details">
        <div className="header-content">
          <nav>
            <a href="#" className="back-button" onClick={(e) => { e.preventDefault(); handleBack(); }}>
              <span className="material-symbols-outlined">arrow_back</span>
            </a>
          </nav>
          <div className="header-container">
            <h1 id="header-title">What's in Season?</h1>
            <h2 id="datetime">Today's date: {datetime}</h2>
          </div>
        </div>
      </div>

      <div className="produce-content">
        <div className="produce-card">
          <div className="produce-image">
            <img id="produce-img" src={produce.image} alt={produce.name} />
            <h2 id="produce-title">{produce.name}</h2>
          </div>
        </div>
        <div className="produce-info">
          {produce.season && (
            <div className="info-section">
              <h3>Season</h3>
              <p id="produce-season">{produce.season}</p>
            </div>
          )}

          {produce.benefits && (
            <div className="info-section">
              <h3>Benefits</h3>
              <p id="produce-benefits">{produce.benefits}</p>
            </div>
          )}

          {produce.recipes && produce.recipes.length > 0 && (
            <div className="info-section">
              <h3>Recipe Suggestions</h3>
              <ul className="recipe-list">
                {produce.recipes.map((recipe, index) => (
                  <li key={index}>{recipe}</li>
                ))}
              </ul>
            </div>
          )}

          {produce.notes && (
            <div className="info-section">
              <h3>Notes</h3>
              <p id="produce-notes">
                {Array.isArray(produce.notes) ? produce.notes.join(' ') : produce.notes}
              </p>
            </div>
          )}

          {produce.joke && (
            <div className="info-section">
              <h3>Pick Up Line</h3>
              <p id="produce-joke">{produce.joke}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProduceDetails

