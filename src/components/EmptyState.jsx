import React from 'react'
import './EmptyState.css'

function EmptyState({ visible }) {
  if (!visible) return null

  return (
    <div className="empty-state">
      <img src="/images/empty_state.png" alt="No items found" className="empty-state-image" />
      <p className="empty-state-text">No items to show</p>
    </div>
  )
}

export default EmptyState

