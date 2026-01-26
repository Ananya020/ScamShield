const panel = document.getElementById("panel");

document.querySelectorAll(".tabs button").forEach(btn => {
  btn.onclick = () => loadTab(btn.dataset.tab);
});

loadTab("url");

function loadTab(tab) {
  if (tab === "url") {
    panel.innerHTML = `<button id="checkUrl">Check Current Website</button><div id="result"></div>`;
    document.getElementById("checkUrl").onclick = checkURL;
  }

  if (tab === "text") {
    panel.innerHTML = `
      <textarea id="text" rows="6" placeholder="Paste message here"></textarea>
      <button id="analyze">Analyze</button>
      <div id="result"></div>`;
    document.getElementById("analyze").onclick = analyzeText;
  }

  if (tab === "job") {
    panel.innerHTML = `
      <textarea id="job" placeholder="Job description"></textarea>
      <textarea id="msg" placeholder="Recruiter message"></textarea>
      <input id="email" placeholder="Company email/domain" />
      <button id="analyzeJob">Analyze Job Offer</button>
      <div id="result"></div>`;
    document.getElementById("analyzeJob").onclick = analyzeJob;
  }
}

function checkURL() {
  chrome.runtime.sendMessage({ type: "CHECK_URL" }, renderURLResult);
}

function analyzeText() {
  const resultDiv = document.getElementById("result");
  const textInput = document.getElementById("text").value;
  
  if (!textInput) return alert("Please paste a message first!");

  resultDiv.innerHTML = `<div class="loading">🔍 Analyzing for scams...</div>`;

  chrome.runtime.sendMessage(
    { type: "ANALYZE_TEXT", text: textInput },
    (res) => {
      if (res.error) {
        resultDiv.innerHTML = `<p style="color:red">Error: ${res.error}</p>`;
      } else {
        renderTextResult(res);
      }
    }
  );
}

function analyzeJob() {
  chrome.runtime.sendMessage(
    {
      type: "ANALYZE_JOB",
      payload: {
        job: document.getElementById("job").value,
        message: document.getElementById("msg").value,
        email: document.getElementById("email").value
      }
    },
    renderJobResult
  );
}

function renderURLResult(res) {
    // If res is null or riskLevel is missing, default to "Unknown"
    const risk = res?.riskLevel || "Unknown"; 
    const icon = risk === "High" ? "⚠️" : risk === "Medium" ? "ℹ️" : "✅";
  
    panel.querySelector("#result").innerHTML = `
      <div class="badge ${(risk).toLowerCase()}">
        ${icon} ${risk} Risk Website
      </div>
      <p>This website shows the following signs:</p>
      <ul>${(res?.flags || []).map(f => `<li>${f}</li>`).join("")}</ul>
    `;
}
  

  function renderTextResult(res) {
    const risk = res?.risk || "Unknown";
    const icon = risk === "High" ? "⚠️" : risk === "Medium" ? "ℹ️" : "✅";
  
    panel.querySelector("#result").innerHTML = `
      <div class="badge ${(risk).toLowerCase()}">
        ${icon} ${risk} Risk Message
      </div>
  
      <p>Parts of the message that may be risky:</p>
      <ul>
        ${(res?.highlights || [])
          .map(h => `<li><b>${h?.text || 'Indicator'}</b> — ${h?.reason || 'Suspicious'}</li>`)
          .join("")}
      </ul>
  
      <h4>Safer next steps</h4>
      <ul>
        ${(res?.nextSteps || []).map(s => `<li>${s}</li>`).join("")}
      </ul>
    `;
}
  

  function renderJobResult(res) {
    const icon =
      res.risk === "High" ? "⚠️" :
      res.risk === "Medium" ? "ℹ️" : "✅";
  
    panel.querySelector("#result").innerHTML = `
      <div class="badge ${res.risk.toLowerCase()}">
        ${icon} ${res.risk} Risk Job Offer
      </div>
  
      <p>Things to be careful about:</p>
      <ul>${res.redFlags.map(f => `<li>${f}</li>`).join("")}</ul>
  
      <p style="margin-top:8px;">
        <b>What legitimate recruiters usually do:</b><br/>
        ${res.education}
      </p>
    `;
  }
  
