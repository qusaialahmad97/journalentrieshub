// scripts/submit-to-indexnow.js
const fs = require('fs');
const path = require('path');

async function submitAll() {
  const entriesPath = path.join(__dirname, '../data/entries.json');
  const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
  
  const baseUrl = "https://www.journalentrieshub.com";
  const urlList = entries.map(entry => `${baseUrl}/entries/${entry.slug}`);
  
  // Also include the homepage
  urlList.push(baseUrl);

  console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: "www.journalentrieshub.com",
        key: "4d8f744578304d62ad522c880425bfb3", // Replace with your key
        urlList: urlList
      }),
    });

    if (response.status === 200) {
      console.log("Successfully submitted URLs to IndexNow!");
    } else {
      console.error(`IndexNow submission failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error submitting to IndexNow:", error);
  }
}

submitAll();