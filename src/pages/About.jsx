import React from 'react'
import '../components/Header.css'
import './About.css'

function About() {
  // Theme is handled globally in App.jsx, no need to apply here

  return (
    <>
      <div className="header-details">
        <div className="header-content">
          <div className="header-container">
            <h1 id="header-title">What's in Season?</h1>
            <h2 id="header-title-h2">About This Website</h2>
          </div>
        </div>
      </div>

      <div className="about-content">
        <div className="about-container" id="container-reverse">
          <div className="about-section">
            <div className="about-text">
              <h2>"What's in season?"</h2>
              <h2>
                This is a question that I hear often from friends who want to eat seasonally but don't actually know what's in season. I created this website as a fun way to address the gap between this desire and knowledge.
              </h2>
            </div>
          </div>
          <img id="about-image" src="/images/picnic_basket.png" alt="Picnic Basket" />
        </div>

        <div className="about-container">
          <img id="about-image" src="/images/cut_vegetables.png" alt="Cutting Produce on Board" />
          <div className="about-section">
            <div className="about-text">
              <h2>A few notes about how I defined selection and seasonality:</h2>
              <ul className="list">
                <li>
                  The selection of produce on this website, as well the seasonalities, is based on an imprecise scientific process that is colored by my own opinions and experience.
                </li>
                <li>
                  Not all items shown are grown in California. For example, lychee is available in many grocery stores but is generally imported from Mexico or Asia.
                </li>
                <li>
                  Due to California's diverse climate, many items are amply available year-round even though they have seasonalities. I used my best judgement to define the seasonalities.
                </li>
                <li>
                  For the classification of items I went with the culinary definition of fruits, vegetables, and nuts. In this case, tomatoes are classified as vegetables.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="about-container" id="container-reverse">
          <div className="about-section">
            <div className="about-text">
              <h2>This website was made by Alma</h2>
              <ul className="list">
                <li>Iconography and illustrations drawn in Procreate</li>
                <li>UI/UX designed in Figma</li>
                <li>Website coded with HTML, CSS, and JavaScript</li>
              </ul>
            </div>
          </div>
          <img id="about-image" src="/images/meal.png" alt="Shakshuka and Stuffed Eggplant Meal" />
        </div>
      </div>
    </>
  )
}

export default About

