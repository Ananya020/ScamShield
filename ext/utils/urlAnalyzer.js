import { SUSPICIOUS_TLDS, TRUST_KEYWORDS } from "./constants.js";

export function analyzeURL(url) {
  const flags = [];
  let riskScore = 0;

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname;

    // Lookalike characters
    if (hostname.match(/[01]/) || hostname.includes("rn")) {
      flags.push("Domain uses lookalike characters to mimic trusted brands");
      riskScore++;
    }

    // Suspicious TLDs
    if (SUSPICIOUS_TLDS.some(tld => hostname.endsWith(tld))) {
      flags.push("Uses a top-level domain commonly abused by scam sites");
      riskScore++;
    }

    // Excessive subdomains
    if (hostname.split(".").length > 4) {
      flags.push("Uses multiple subdomains to appear legitimate");
      riskScore++;
    }

    // Keyword stuffing
    if (TRUST_KEYWORDS.some(word => hostname.includes(word))) {
      flags.push("Uses trust-related words to create a false sense of security");
      riskScore++;
    }

    // URL length
    if (url.length > 75) {
      flags.push("Unusually long URL, often used to hide malicious intent");
      riskScore++;
    }

  } catch {
    flags.push("Invalid or malformed URL");
    riskScore++;
  }

  return {
    riskLevel:
      riskScore >= 4 ? "High" :
      riskScore >= 2 ? "Medium" : "Low",
    flags
  };
}
