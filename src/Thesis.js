import React, { useRef, useState, useEffect } from 'react';
import './Thesis.css';
import thesisData from './Thesis.json';
import PlanetW from './img/PlanetW.svg';
import PlanetB from './img/PlanetB.svg';
import ArrowL from './img/ArrowL.svg';
import ArrowL_A from './img/ArrowL_A.svg';
import ArrowL_D from './img/ArrowL_D.svg';
import ArrowR from './img/ArrowR.svg';
import ArrowR_A from './img/ArrowR_A.svg';
import ArrowR_D from './img/ArrowR_D.svg';

function Thesis() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedThesisDetails, setSelectedThesisDetails] = useState([]);
  const imageContainerRef = useRef(null);
  const detailsContainerRef = useRef(null);
  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(false);

  useEffect(() => {
    const uniqueYears = Array.from(new Set(thesisData[0].map(item => item.year)))
      .sort((a, b) => b - a);
    setYears(uniqueYears);
    if (uniqueYears.length > 0) {
      const latestYear = uniqueYears[0];
      setSelectedYear(latestYear);
      const selectedDetails = thesisData[0].filter(item => item.year === latestYear);
      setSelectedThesisDetails(selectedDetails);
    }
  }, []);

  const handleClick = (year, index) => {
    const containerWidth = imageContainerRef.current.offsetWidth;
    const buttonWidth = imageContainerRef.current.children[0].offsetWidth;
    let totalWidthBeforeClickedButton = 0;
    for (let i = 0; i < index; i++) {
      totalWidthBeforeClickedButton += imageContainerRef.current.children[i].offsetWidth;
    }
    const scrollX = totalWidthBeforeClickedButton - (containerWidth / 2) + (buttonWidth / 2);
    imageContainerRef.current.scroll({ left: scrollX, behavior: 'smooth' });
    setSelectedYear(year);
    const selectedDetails = thesisData[0].filter(item => item.year === year);
    setSelectedThesisDetails(selectedDetails);
   
  };

  const handlePlaceholderClick = (direction) => {
    if (!selectedYear) return;
    const currentIndex = years.findIndex(year => year === selectedYear);
    let newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < years.length) {
      const newYear = years[newIndex];
      handleClick(newYear, newIndex);
     
    } else {
     
    }

  };

  const isPrevDisabled = selectedYear === years[0];
  const isNextDisabled = selectedYear === years[years.length - 1];
  const resetActiveStates = () => {
    setIsLeftActive(false);
    setIsRightActive(false);
  };
  const handleMouseDown = (direction) => {
    if (direction === 'prev' && !isPrevDisabled) {
      setIsLeftActive(true);
    } else if (direction === 'next' && !isNextDisabled) {
      setIsRightActive(true);
    }
  };

  return (
    <div id="thesis">
      <div className="images-row">
        <img
          src={isPrevDisabled ? ArrowL_D : (isLeftActive ? ArrowL_A : ArrowL)}
          alt="Left Placeholder"
          className="arrow-left"
          onMouseDown={() => handleMouseDown('prev')}
          onMouseUp={resetActiveStates}
          onMouseLeave={resetActiveStates}
          onClick={!isPrevDisabled ? () => handlePlaceholderClick('prev') : undefined}
        />
        <div ref={imageContainerRef} className="image-container">
          {years.map((year, index) => (
            <div
              key={index}
              className={`year-container ${selectedYear === year ? 'selected' : ''}`}
              onClick={() => handleClick(year, index)}
            >
              <img
                src={selectedYear === year ? PlanetB : PlanetW}
                alt={`Year ${year}`}
                className="image"
              />
              <div
                className="year-text"
                style={{ color: selectedYear === year ? '#FFFFFF' : "#7EC0FC" }}
              >
                {year}
              </div>
            </div>
          ))}
        </div>
        <img
          src={isNextDisabled ? ArrowR_D : (isRightActive ? ArrowR_A : ArrowR)}
          alt="Right Placeholder"
          className="arrow-right"
          onMouseDown={() => handleMouseDown('next')}
          onMouseUp={resetActiveStates}
          onMouseLeave={resetActiveStates}
          onClick={!isNextDisabled ? () => handlePlaceholderClick('next') : undefined}
        />
      </div>
      <div ref={detailsContainerRef} className="text-display-area">
        {selectedThesisDetails.map((detail, index) => (
          <div
            key={index}
            className="detail-block"
            onClick={() => window.open(detail.url, '_blank')}
            role="button"
            tabIndex="0"
            style={{ cursor: 'pointer' }}
          >
            <div className='block-top'>
              <p className="block-text1" style={{ textAlign: 'left', margin: 0 }}>{detail.author}</p>
              <div className='block-pacman'></div>
            </div>
            <p className="block-text2"style={{ textAlign: 'left', margin: 0 }}>{detail.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Thesis;