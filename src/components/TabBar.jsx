import React from 'react';

const TabBar = ({ 
  items = [], 
  value, 
  onChange, 
  className = "", 
  size = "default", 
  fullWidth = false 
}) => (
  <div
    className={[
      "tabs",
      size === "compact" ? "tabs-compact" : "",
      fullWidth ? "tabs-full" : "",
      className,
    ].filter(Boolean).join(" ")}
  >
    {items.map((item) => (
      <button
        key={item.id}
        type="button"
        className={`tab ${value === item.id ? "active" : ""}`}
        onClick={() => onChange?.(item.id)}
      >
        {item.icon && <span className="tab-icon">{item.icon}</span>}
        <span className="tab-label">{item.label}</span>
        {item.badge !== undefined && (
          <span className="tab-badge">{item.badge}</span>
        )}
      </button>
    ))}
  </div>
);

export default TabBar;
