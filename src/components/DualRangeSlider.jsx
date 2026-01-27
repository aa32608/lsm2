"use client";
import React, { useState, useEffect, useRef } from "react";

const DualRangeSlider = ({ min, max, value, onChange, currency = "EUR" }) => {
  const [minInput, setMinInput] = useState(value.min);
  const [maxInput, setMaxInput] = useState(value.max);

  const minValRef = useRef(value.min);
  const maxValRef = useRef(value.max);
  const range = useRef(null);
  const sliderContainer = useRef(null);

  useEffect(() => {
    setMinInput(value.min);
    setMaxInput(value.max);
    minValRef.current = value.min;
    maxValRef.current = value.max;
  }, [value.min, value.max]);

  const getPercent = (val) => Math.round(((val - min) / (max - min)) * 100);

  useEffect(() => {
    const minPercent = getPercent(value.min);
    const maxPercent = getPercent(value.max);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [value.min, value.max, min, max]);

  const handleMinInputChange = (e) => {
    setMinInput(e.target.value);
  };

  const handleMaxInputChange = (e) => {
    setMaxInput(e.target.value);
  };

  const commitMinInput = () => {
    let val = Number(minInput);
    if (isNaN(val) || minInput === "" || val < min) val = min;
    val = Math.max(min, Math.min(val, Math.max(min, value.max - 1)));
    setMinInput(val);
    minValRef.current = val;
    onChange({ min: val, max: value.max });
  };

  const commitMaxInput = () => {
    let val = Number(maxInput);
    if (isNaN(val) || maxInput === "" || val > max) val = max;
    val = Math.min(max, Math.max(val, Math.min(max, value.min + 1)));
    setMaxInput(val);
    maxValRef.current = val;
    onChange({ min: value.min, max: val });
  };

  const handleKeyDown = (e, type) => {
    if (e.key === "Enter") {
      if (type === "min") commitMinInput();
      else commitMaxInput();
      e.target.blur();
    }
  };

  return (
    <div className="price-slider-new">
      {/* Input Fields */}
      <div className="price-slider-inputs">
        <div className="price-slider-field">
          <label className="price-slider-label">Minimum</label>
          <div className="price-slider-input-wrapper">
            <span className="price-slider-currency">{currency}</span>
            <input
              type="number"
              min={min}
              max={max}
              value={minInput}
              onChange={handleMinInputChange}
              onBlur={commitMinInput}
              onKeyDown={(e) => handleKeyDown(e, "min")}
              className="price-slider-number-input"
              aria-label="Minimum price"
            />
          </div>
        </div>
        
        <div className="price-slider-divider">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 12h8M12 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="price-slider-field">
          <label className="price-slider-label">Maximum</label>
          <div className="price-slider-input-wrapper">
            <span className="price-slider-currency">{currency}</span>
            <input
              type="number"
              min={min}
              max={max}
              value={maxInput}
              onChange={handleMaxInputChange}
              onBlur={commitMaxInput}
              onKeyDown={(e) => handleKeyDown(e, "max")}
              className="price-slider-number-input"
              aria-label="Maximum price"
            />
          </div>
        </div>
      </div>

      {/* Slider Track */}
      <div className="price-slider-track-container" ref={sliderContainer}>
        <input
          type="range"
          min={min}
          max={max}
          value={Math.max(min, Math.min(value.min, value.max - 1))}
          onChange={(event) => {
            const newMin = Math.max(min, Math.min(Number(event.target.value), value.max - 1));
            minValRef.current = newMin;
            onChange({ min: newMin, max: value.max });
          }}
          className="price-slider-thumb price-slider-thumb-left"
          style={{ zIndex: value.min > max - 100 ? 5 : 3 }}
          aria-label="Minimum price slider"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={Math.min(max, Math.max(value.max, value.min + 1))}
          onChange={(event) => {
            const newMax = Math.min(max, Math.max(Number(event.target.value), value.min + 1));
            maxValRef.current = newMax;
            onChange({ min: value.min, max: newMax });
          }}
          className="price-slider-thumb price-slider-thumb-right"
          style={{ zIndex: 4 }}
          aria-label="Maximum price slider"
        />

        <div className="price-slider-track-wrapper">
          <div className="price-slider-track" />
          <div ref={range} className="price-slider-range" />
        </div>
      </div>
    </div>
  );
};

export default DualRangeSlider;
