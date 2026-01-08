export const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export const validatePhone = (s) => 
  !!s && s.replace(/\D/g, "").length >= 8 && s.replace(/\D/g, "").length <= 16;
