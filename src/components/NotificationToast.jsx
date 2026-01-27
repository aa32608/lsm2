"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationToast({ message, type = "info", onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300); // Wait for animation
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  const colors = {
    success: {
      bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      border: "#10b981",
    },
    error: {
      bg: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      border: "#ef4444",
    },
    warning: {
      bg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      border: "#f59e0b",
    },
    info: {
      bg: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      border: "#3b82f6",
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="notification-toast"
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10000,
            minWidth: "320px",
            maxWidth: "90vw",
            background: colors[type]?.bg || colors.info.bg,
            color: "white",
            padding: "1rem 1.5rem",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            border: `2px solid ${colors[type]?.border || colors.info.border}`,
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontWeight: 600,
            fontSize: "0.9375rem",
            backdropFilter: "blur(10px)",
          }}
        >
          <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>
            {icons[type] || icons.info}
          </span>
          <span style={{ flex: 1, lineHeight: 1.5 }}>{message}</span>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose?.(), 300);
            }}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer",
              padding: "0.25rem 0.5rem",
              fontSize: "1.125rem",
              lineHeight: 1,
              flexShrink: 0,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.3)")}
            onMouseLeave={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.2)")}
            aria-label="Close notification"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

