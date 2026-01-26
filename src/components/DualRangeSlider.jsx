"use client";
import React, { useState, useEffect, useRef } from "react";

const DualRangeSlider = ({ min, max, value, onChange, currency = "EUR" }) => {
  // Local state for inputs to allow free typing
  const [minInput, setMinInput] = useState(value.min);
  const [maxInput, setMaxInput] = useState(value.max);

  // Refs for slider values to avoid dependency loops or stale closures
  const minValRef = useRef(value.min);
  const maxValRef = useRef(value.max);
  const range = useRef(null);

  // Sync props to state when props change (e.g. parent reset)
  useEffect(() => {
    setMinInput(value.min);
    setMaxInput(value.max);
    minValRef.current = value.min;
    maxValRef.current = value.max;
  }, [value.min, value.max]);

  // Convert to percentage
  const getPercent = (val) => Math.round(((val - min) / (max - min)) * 100);

  // Update range track width/position
  useEffect(() => {
    const minPercent = getPercent(value.min);
    const maxPercent = getPercent(value.max);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [value.min, value.max, min, max]);

  // Handle Input Changes (Typing)
  const handleMinInputChange = (e) => {
    setMinInput(e.target.value);
  };

  const handleMaxInputChange = (e) => {
    setMaxInput(e.target.value);
  };

  // Commit Input Changes (Blur/Enter)
  const commitMinInput = () => {
    let val = Number(minInput);
    if (isNaN(val) || minInput === "") val = min;
    // Clamp
    val = Math.max(min, Math.min(val, value.max - 1));
    setMinInput(val);
    onChange({ min: val, max: value.max });
  };

  const commitMaxInput = () => {
    let val = Number(maxInput);
    if (isNaN(val) || maxInput === "") val = max;
    // Clamp
    val = Math.min(max, Math.max(val, value.min + 1));
    setMaxInput(val);
    onChange({ min: value.min, max: val });
  };

  const handleKeyDown = (e, type) => {
    if (e.key === "Enter") {
      if (type === "min") commitMinInput();
      else commitMaxInput();
      e.target.blur(); // Remove focus
    }
  };

  return (
    <div className="dual-slider-container">
      <div className="slider-inputs">
        <div className="slider-field">
            <span className="input-label">Min</span>
            <div className="input-wrapper">
                <span className="currency-prefix">{currency}</span>
                <input
                type="number"
                value={minInput}
                onChange={handleMinInputChange}
                onBlur={commitMinInput}
                onKeyDown={(e) => handleKeyDown(e, "min")}
                className="slider-number-input"
                />
            </div>
        </div>
        <span className="slider-separator">-</span>
        <div className="slider-field">
            <span className="input-label">Max</span>
            <div className="input-wrapper">
                <span className="currency-prefix">{currency}</span>
                <input
                type="number"
                value={maxInput}
                onChange={handleMaxInputChange}
                onBlur={commitMaxInput}
                onKeyDown={(e) => handleKeyDown(e, "max")}
                className="slider-number-input"
                />
            </div>
        </div>
      </div>

      <div className="slider-track-container">
        <input
          type="range"
          min={min}
          max={max}
          value={value.min}
          onChange={(event) => {
            const val = Math.min(Number(event.target.value), value.max - 1);
            onChange({ min: val, max: value.max });
          }}
          className="thumb thumb--left"
          style={{ zIndex: value.min > max - 100 && "5" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value.max}
          onChange={(event) => {
            const val = Math.max(Number(event.target.value), value.min + 1);
            onChange({ min: value.min, max: val });
          }}
          className="thumb thumb--right"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
        </div>
      </div>
    </div>
  );
};

export default DualRangeSlider;
