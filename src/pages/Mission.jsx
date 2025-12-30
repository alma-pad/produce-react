import React from 'react'
import '../components/Header.css'
import './Mission.css'

function Mission() {
  // Theme is handled globally in App.jsx, no need to apply here

  return (
    <>
      <div className="header-details">
        <div className="header-content">
          <div className="header-container">
            <h1 id="header-title">What's in Season?</h1>
            <h2 id="header-title-h2">Website Mission</h2>
          </div>
        </div>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>There are countless reasons to eat seasonal produce:</h2>
        </div>
        <div className="mission-container" id="container-reverse">
          <div className="mission-section">
            <img id="mission-bullet" src="/images/blueberry_bullet.png" alt="Bullet Point" />
            <p>
              Foods that are in season are typically picked at the peaks of ripeness, which leads to higher concentrations of essential vitamins, minerals, and antioxidants.
            </p>
          </div>
          <div className="mission-section">
            <img id="mission-bullet" src="/images/lemon_bullet.png" alt="Bullet Point" />
            <p>
              Eating seasonally reduces the need for transportation and energy-intensive methods of cultivation and storage, leading to a lower carbon footprint.
            </p>
          </div>
          <div className="mission-section">
            <img id="mission-bullet" src="/images/tomato_bullet.png" alt="Bullet Point" />
            <p>
              Choosing seasonal produce supports local farmers and markets. The money spent on seasonal produce helps maintain farmland and stimulates local economies.
            </p>
          </div>
          <div className="mission-section">
            <img id="mission-bullet" src="/images/orange_bullet.png" alt="Bullet Point" />
            <p>
              Most importantly, seasonal foods are tasty and full of flavor and make life more enjoyable. ♥
            </p>
          </div>
        </div>
        <div className="about-text">
          <h2>
            I hope this website inspires you to eat fruits and vegetables that are in season today. Whether you pick something new or stick with something familiar, eating seasonal produce is a good choice for yourself and the planet.
          </h2>
        </div>
        <img id="mission-image" src="/images/farmers_market_stand.png" alt="Image that says Thanks for visiting!" />
      </div>
    </>
  )
}

export default Mission

