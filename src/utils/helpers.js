export const stripDangerous = (v = "") => v.replace(/[<>]/g, "");

export const formatOfferPrice = (min, max, currency) => {
  const cleanMin = (min || "").trim();
  const cleanMax = (max || "").trim();
  const cur = currency || "EUR";

  if (!cleanMin && !cleanMax) return "";
  if (cleanMin && cleanMax) return `${cleanMin} - ${cleanMax} ${cur}`;
  if (cleanMin) return `from ${cleanMin} ${cur}`;
  if (cleanMax) return `up to ${cleanMax} ${cur}`;
  return "";
};

export const buildLocationString = (city, extra) => {
  const c = (city || "").trim();
  const e = (extra || "").trim();
  if (!c && !e) return "";
  if (c && e) return `${c} - ${e}`;
  return c || e;
};

export const getDescriptionPreview = (text = "", limit = 160) => {
  const clean = stripDangerous(text || "").trim();
  if (!clean) return "";
  return clean.length > limit ? `${clean.slice(0, limit).trim()}…` : clean;
};

export const normalizePhoneForStorage = (raw, countryCodes) => {
  if (!raw) return raw;
  const trimmed = raw.trim();
  if (trimmed.startsWith("+")) return trimmed.replace(/\s+/g, "");
  const cleaned = trimmed.replace(/\D/g, "");
  if (cleaned === "") return trimmed;
  if (cleaned.length > 8 && cleaned.startsWith("00")) 
    return "+" + cleaned.replace(/^0{2}/, "");
  const known = countryCodes.map((c) => c.code.replace("+", ""));
  for (const pre of known) if (cleaned.startsWith(pre)) return "+" + cleaned;
  return "+389" + cleaned;
};

export const getDaysUntilExpiry = (expiresAt) => {
  if (!expiresAt) return null;
  const now = Date.now();
  const diff = expiresAt - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days;
};
