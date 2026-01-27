// constants.js

export const SUSPICIOUS_TLDS = [
  ".xyz",
  ".top",
  ".tk",
  ".club",
  ".online",
  ".site",
  ".shop",
  ".info",
  ".live",
  ".icu"
];

export const SAFE_TLDS = [
  ".com",
  ".org",
  ".edu",
  ".gov",
  ".in",
  ".net"
];

// Words scammers use to create urgency or fear
export const URGENCY_KEYWORDS = [
  "urgent",
  "immediately",
  "suspended",
  "verify",
  "limited",
  "action-required",
  "confirm"
];

// Words scammers use to appear trustworthy
export const TRUST_WORDS = [
  "secure",
  "official",
  "support",
  "login",
  "account",
  "help",
  "service"
];

// Brands commonly impersonated
export const POPULAR_BRANDS = [
  "amazon",
  "google",
  "paypal",
  "microsoft",
  "apple",
  "netflix",
  "instagram",
  "facebook",
  "whatsapp"
];

// Common free email domains (used later for job scams)
export const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "protonmail.com"
];
