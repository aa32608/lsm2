"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";

const Toast = () => {
  const { message } = useApp();

  return (
    <AnimatePresence>
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`message-toast ${message.type}`}
        >
          {message.type === "success" && "✅ "}
          {message.type === "error" && "⚠️ "}
          {message.text}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
