import React, { useState } from 'react'
import './ProduceCard.css'

function ProduceCard({ id, name, image, onClick, className = '' }) {
  const [isVisible, setIsVisible] = useState(true)

  const handleClick = () => {
    onClick()
  }

  if (!isVisible) return null

  return (
    <div className={`card ${className}`} onClick={handleClick}>
      <img src={image || `/images/${id}.png`} alt={name} />
      <p>{name}</p>
    </div>
  )
}

export default ProduceCard

