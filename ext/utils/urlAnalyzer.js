import {
  SUSPICIOUS_TLDS,
  SAFE_TLDS,
  URGENCY_KEYWORDS,
  TRUST_WORDS,
  POPULAR_BRANDS
} from "./constants.js";

export function analyzeURL(url) {
  const flags = [];
  let riskScore = 0;

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    /* ---------- 1. Lookalike Brand Detection ---------- */
    POPULAR_BRANDS.forEach(brand => {
      if (
        hostname.includes(brand) &&
        !hostname.endsWith(`${brand}.com`) &&
        !hostname.endsWith(`${brand}.in`)
      ) {
        flags.push(
          `Mentions "${brand}" in the domain but is not the official website`
        );
        riskScore += 2;
      }
    });

    /* ---------- 2. Character Substitution (rn → m, 0 → o) ---------- */
    if (/[01]/.test(hostname) || hostname.includes("rn")) {
      flags.push(
        "Uses lookalike characters that can visually mimic trusted websites"
      );
      riskScore += 1;
    }

    /* ---------- 3. Suspicious TLD Check ---------- */
    if (SUSPICIOUS_TLDS.some(tld => hostname.endsWith(tld))) {
      flags.push(
        "Uses a domain extension frequently associated with scam websites"
      );
      riskScore += 1;
    }

    /* ---------- 4. Excessive Subdomains ---------- */
    const subdomainCount = hostname.split(".").length - 2;
    if (subdomainCount >= 3) {
      flags.push(
        "Uses many subdomains to appear more legitimate than it is"
      );
      riskScore += 1;
    }

    /* ---------- 5. Keyword Stuffing (Context-Aware) ---------- */
    const trustWordHits = TRUST_WORDS.filter(word =>
      hostname.includes(word)
    );

    if (trustWordHits.length >= 2) {
      flags.push(
        "Uses multiple trust-related words to create a false sense of security"
      );
      riskScore += 1;
    }

    /* ---------- 6. Urgency Keywords in URL ---------- */
    if (URGENCY_KEYWORDS.some(word => hostname.includes(word))) {
      flags.push(
        "Uses urgency-related words to pressure users into quick action"
      );
      riskScore += 1;
    }

    /* ---------- 7. Excessively Long URL ---------- */
    if (url.length > 90) {
      flags.push(
        "Unusually long URL, which can be used to hide malicious content"
      );
      riskScore += 1;
    }

  } catch {
    flags.push("Invalid or malformed URL");
    riskScore += 2;
  }

  /* ---------- Risk Level Mapping ---------- */
  const riskLevel =
    riskScore >= 5 ? "High" :
    riskScore >= 3 ? "Medium" :
    "Low";

  return { riskLevel, flags };
}
