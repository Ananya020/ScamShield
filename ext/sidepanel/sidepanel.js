const panel = document.getElementById("panel");
const tabs = document.querySelectorAll(".tabs button");

/* ---------- Tab Handling ---------- */
tabs.forEach(btn => {
  btn.onclick = () => {
    tabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    loadTab(btn.dataset.tab);
  };
});

// Default tab
tabs[0].classList.add("active");
loadTab("url");

/* ---------- Load Tabs ---------- */
function loadTab(tab) {
  if (tab === "url") {
    panel.innerHTML = `
      <button class="main-btn" id="checkUrl">Check Current Website</button>
      <div id="result"></div>
    `;
    document.getElementById("checkUrl").onclick = checkURL;
  }

  if (tab === "text") {
    panel.innerHTML = `
      <textarea id="text" rows="6" placeholder="Paste a suspicious message (SMS, email, DM)"></textarea>
      <button class="main-btn" id="analyze">Analyze Message</button>
      <div id="result"></div>
    `;
    document.getElementById("analyze").onclick = analyzeText;
  }

  if (tab === "job") {
    panel.innerHTML = `
      <textarea id="job" placeholder="Job description"></textarea>
      <textarea id="msg" placeholder="Recruiter message"></textarea>
      <input id="email" placeholder="Company email or domain" />
      <button class="main-btn" id="analyzeJob">Analyze Job Offer</button>
      <div id="result"></div>
    `;
    document.getElementById("analyzeJob").onclick = analyzeJob;
  }
}

/* ---------- URL Check ---------- */
function checkURL() {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<div class="loading">🔍 Checking website safety…</div>`;

  chrome.runtime.sendMessage({ type: "CHECK_URL" }, renderURLResult);
}

/* ---------- Scam Message ---------- */
function analyzeText() {
  const text = document.getElementById("text").value.trim();
  if (!text) return alert("Please paste a message first.");

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<div class="loading">🔍 Analyzing message…</div>`;

  chrome.runtime.sendMessage(
    { type: "ANALYZE_TEXT", text },
    res => res?.error
      ? showError(res.error)
      : renderTextResult(res)
  );
}

/* ---------- Job Offer ---------- */
function analyzeJob() {
  const payload = {
    job: document.getElementById("job").value,
    message: document.getElementById("msg").value,
    email: document.getElementById("email").value
  };

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<div class="loading">🔍 Reviewing job offer…</div>`;

  chrome.runtime.sendMessage(
    { type: "ANALYZE_JOB", payload },
    res => res?.error
      ? showError(res.error)
      : renderJobResult(res)
  );
}

/* ---------- Renderers ---------- */
function renderURLResult(res) {
  const risk = res?.riskLevel || "Unknown";
  const icon = risk === "High" ? "⚠️" : risk === "Medium" ? "ℹ️" : "✅";

  panel.querySelector("#result").innerHTML = `
    <div class="badge ${risk.toLowerCase()}">
      ${icon} ${risk} Risk Website
    </div>

    <p class="section-title">What ScamShield noticed</p>
    <ul>
      ${(res.flags || []).map(f => `<li>${f}</li>`).join("")}
    </ul>

    ${
      res.aiExplanation
        ? `
          <p class="section-title">What this means</p>
          <div class="ai-box">
            ${res.aiExplanation.summary || ""}
          </div>

          <p class="section-title">Recommended next steps</p>
          <ul>
            ${(res.aiExplanation.nextSteps || []).map(s => `<li>${s}</li>`).join("")}
          </ul>
        `
        : `<p class="calm-note">No additional concerns detected.</p>`
    }
  `;
}

function renderTextResult(res) {
  const risk = res.risk || "Unknown";
  const icon = risk === "High" ? "⚠️" : risk === "Medium" ? "ℹ️" : "✅";

  panel.querySelector("#result").innerHTML = `
    <div class="badge ${risk.toLowerCase()}">
      ${icon} ${risk} Risk Message
    </div>

    <p class="section-title">Potential red flags</p>
    <ul>
      ${(res.highlights || []).map(h =>
        `<li><b>${h.text}</b> — ${h.reason}</li>`
      ).join("")}
    </ul>

    <p class="section-title">Safer next steps</p>
    <ul>
      ${(res.nextSteps || []).map(s => `<li>${s}</li>`).join("")}
    </ul>
  `;
}

function renderJobResult(res) {
  const icon = res.risk === "High" ? "⚠️" : res.risk === "Medium" ? "ℹ️" : "✅";

  panel.querySelector("#result").innerHTML = `
    <div class="badge ${res.risk.toLowerCase()}">
      ${icon} ${res.risk} Risk Job Offer
    </div>

    <p class="section-title">Things to be careful about</p>
    <ul>${res.redFlags.map(f => `<li>${f}</li>`).join("")}</ul>

    <p class="section-title">What legitimate recruiters usually do</p>
    <div class="ai-box">${res.education}</div>
  `;
}

/* ---------- Error ---------- */
function showError(msg) {
  panel.querySelector("#result").innerHTML =
    `<p style="color:#b91c1c;">⚠️ ${msg}</p>`;
}
