import React, { useState, useRef, useEffect } from 'react'
import './PeriodDropdown.css'

const PERIODS = [
  'Early January', 'Late January',
  'Early February', 'Late February',
  'Early March', 'Late March',
  'Early April', 'Late April',
  'Early May', 'Late May',
  'Early June', 'Late June',
  'Early July', 'Late July',
  'Early August', 'Late August',
  'Early September', 'Late September',
  'Early October', 'Late October',
  'Early November', 'Late November',
  'Early December', 'Late December'
]

function PeriodDropdown({ selectedPeriod, onPeriodChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      // Scroll to active item when opening
      setTimeout(() => {
        const activeItem = dropdownRef.current?.querySelector('li.active')
        if (activeItem && dropdownRef.current) {
          const menu = dropdownRef.current.querySelector('.menu')
          if (menu) {
            const menuHeight = menu.clientHeight
            const itemOffsetTop = activeItem.offsetTop
            const itemHeight = activeItem.offsetHeight
            const scrollTarget = itemOffsetTop - (menuHeight / 2) + (itemHeight / 2)
            const maxScroll = menu.scrollHeight - menu.clientHeight
            menu.scrollTop = Math.max(0, Math.min(scrollTarget, maxScroll))
          }
        }
      }, 10)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (period) => {
    onPeriodChange(period)
    setIsOpen(false)
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div
        className={`select ${isOpen ? 'select-clicked' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="selected">{selectedPeriod}</span>
        <div className={`caret ${isOpen ? 'caret-rotate' : ''}`}></div>
      </div>
      <ul className={`menu ${isOpen ? 'menu-open' : ''}`}>
        {PERIODS.map(period => (
          <li
            key={period}
            className={period === selectedPeriod ? 'active' : ''}
            onClick={() => handleSelect(period)}
          >
            {period}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PeriodDropdown

