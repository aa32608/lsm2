import React, { useState, useEffect, useRef } from "react";
import "./DualRangeSlider.css";

const DualRangeSlider = ({ min, max, value, onChange, currency = "EUR" }) => {
  const [minVal, setMinVal] = useState(value.min);
  const [maxVal, setMaxVal] = useState(value.max);
  const minValRef = useRef(value.min);
  const maxValRef = useRef(value.max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = (value) => Math.round(((value - min) / (max - min)) * 100);

  useEffect(() => {
    setMinVal(value.min);
    setMaxVal(value.max);
  }, [value]);

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="dual-slider-container">
      <div className="slider-inputs">
        <div className="slider-field">
            <span className="currency-prefix">{currency}</span>
            <input
            type="number"
            value={minVal}
            onChange={(event) => {
                const value = Math.min(Number(event.target.value), maxVal - 1);
                setMinVal(value);
                minValRef.current = value;
                onChange({ min: value, max: maxVal });
            }}
            className="slider-number-input"
            />
        </div>
        <span className="slider-separator">-</span>
        <div className="slider-field">
            <span className="currency-prefix">{currency}</span>
            <input
            type="number"
            value={maxVal}
            onChange={(event) => {
                const value = Math.max(Number(event.target.value), minVal + 1);
                setMaxVal(value);
                maxValRef.current = value;
                onChange({ min: minVal, max: value });
            }}
            className="slider-number-input"
            />
        </div>
      </div>

      <div className="slider-track-container">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
            onChange({ min: value, max: maxVal });
          }}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 && "5" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
            onChange({ min: minVal, max: value });
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
