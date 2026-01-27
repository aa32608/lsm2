"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";

export default function NotificationToast({ message, type = "info", onClose }) {
  const { t } = useApp();
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
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className={`notification-toast notification-toast-${type}`}
        >
          <div className="notification-toast-content">
            <span className="notification-toast-icon">
              {icons[type] || icons.info}
            </span>
            <span className="notification-toast-message">{message}</span>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose?.(), 300);
              }}
              className="notification-toast-close"
              aria-label={t("closeNotification")}
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

