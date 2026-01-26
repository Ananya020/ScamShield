import { analyzeURL } from "../utils/urlAnalyzer.js";
import { analyzeScamMessage, analyzeJobOffer } from "../utils/promptTemplates.js";

let currentURL = "";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.type === "CHECK_URL") {
    // Dynamically get the active tab instead of relying on a variable
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      const result = analyzeURL(activeTab.url);
      sendResponse(result);
    });
    return true; // Required for async sendResponse
  }

  if (message.type === "ANALYZE_TEXT") {
    analyzeScamMessage(message.text)
      .then(sendResponse)
      .catch(err => sendResponse({ error: err.message }));
    return true;
  }

  if (message.type === "ANALYZE_JOB") {
    analyzeJobOffer(message.payload)
      .then(sendResponse)
      .catch(err => sendResponse({ error: err.message }));
    return true;
  }
});
