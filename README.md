# 🛡 ScamShield

**ScamShield** is a browser extension that helps users identify online scams, understand *why* something is risky, and decide safer next steps — calmly and without blame.

Online scams increasingly rely on social engineering rather than technical exploits. Fake ecommerce websites, urgent messages, and job/internship scams target everyday users, especially students and first-time internet users. ScamShield addresses this by combining **rule-based safety checks** with **AI-powered explanations**, directly inside the browser.

---

## 🚩 Problem

Most people are not tricked by scams because they are careless — they are rushed, stressed, or misled by realistic-looking content.

Common challenges:

* Fake ecommerce websites that closely imitate real brands
* Urgent messages that pressure users into quick actions
* Job and internship scams targeting students with unrealistic offers
* Existing tools often say *"this is unsafe"* without explaining *why*

This lack of understanding leads to fear, confusion, and repeated victimization.

---

## 💡 Solution

ScamShield acts as a **browser-side safety co-pilot**. Instead of blocking content or issuing alarms, it:

* Highlights **specific red flags**
* Explains risks in **plain, non-technical language**
* Suggests **safe, practical next steps**
* Respects user privacy and control

The extension works entirely on-demand and is designed to support users in moments of uncertainty.

---

## 👥 Who It’s For

* Students evaluating job or internship offers
* Users shopping on unfamiliar ecommerce websites
* Anyone who receives suspicious SMS, emails, or DMs
* First-time or non-technical internet users

---

## 🧩 Features

### 1️⃣ URL Safety Check (Fake Website Detection)

When visiting a website, ScamShield analyzes the URL for common scam indicators such as:

* Lookalike domains (e.g., `amaz0n`, `rn` vs `m`)
* Suspicious top-level domains (`.xyz`, `.top`, `.tk`)
* Excessive subdomains
* Trust-word stuffing ("secure", "verify", "official")
* Unusually long URLs

**Output:**

* Risk level (Low / Medium / High)
* Clear explanation of detected red flags

---

### 2️⃣ ScamLens – Message Analyzer

Users can paste suspicious messages (SMS, email, WhatsApp, LinkedIn DM) into the ScamLens panel.

ScamShield:

* Highlights risky phrases inline
* Explains *why* each phrase may be suspicious
* Suggests safer next steps (verify, ignore, report, block)

This feature is powered by the **Gemini API**, tuned for calm, educational explanations.

---

### 3️⃣ Job & Internship Scam Checker

Designed specifically for students, this tool analyzes:

* Job descriptions
* Recruiter messages
* Company email domains

It checks for:

* Unrealistic salary claims
* Requests for registration or processing fees
* Free or non-corporate email addresses
* Generic HR language or pressure tactics

**Output:**

* Overall risk level
* Red flag explanations
* Guidance on what legitimate recruiters usually do

---

## DEMO LINK: https://youtu.be/32pbic4tSyM?si=Pwi0gHmLqwgwO8Mm

## 🛠 How It Works (Technical Overview)

* **Browser Extension:** Chrome Extension (Manifest v3)
* **UI:** Side Panel (persistent, accessible layout)
* **Rule-Based Logic:** URL and heuristic checks
* **AI Assistance:** Gemini 2.5 Flash API for text analysis
* **Privacy:** No data storage, no background tracking

All analysis is user-initiated.

---

## ♿ Design & Accessibility

ScamShield follows inclusive design principles:

* Large, readable fonts
* Icons + text (not color-only indicators)
* Plain language explanations
* Calm, non-alarming tone
* Short, actionable guidance

The goal is to inform — not intimidate.

---

## 🔐 Safety & Responsibility

* ScamShield provides **guidance, not certainty**
* It does not block websites or messages automatically
* No user data is stored or transmitted unnecessarily
* Users remain in full control of decisions

For this prototype, the Gemini API key is stored locally. In production, a secure backend proxy would be used.

---

## 🚀 Running the Project Locally

1. Clone or download this repository
2. Add your Gemini API key in `utils/promptTemplates.js`
3. Open Chrome and navigate to `chrome://extensions`
4. Enable **Developer Mode**
5. Click **Load Unpacked** and select the project folder
6. Open the ScamShield side panel from the extension icon

---

## 🎥 Demo

The demo showcases:

1. Detection of a fake ecommerce website
2. Analysis of a scam message with highlighted red flags
3. Identification of a job/internship scam

---

## 🔮 Future Improvements

With more time, ScamShield could include:

* Multi-language support
* Elder-friendly mode
* Crowdsourced scam reporting
* Secure backend for API handling
* Real-time message detection (opt-in)

---

## 📌 Hackathon Context

This project was built as a solo submission for the **TechElevate ScamShield Hackathon**, focusing on:

* Impact & empathy
* Explainable security
* Responsible AI use

---

## 📄 License

This project is for educational and demonstration purposes.
