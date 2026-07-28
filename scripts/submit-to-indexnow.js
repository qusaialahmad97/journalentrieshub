// scripts/submit-to-indexnow.js
const fs = require('fs');
const path = require('path');

async function submitAll() {
  const entriesPath = path.join(__dirname, '../data/entries.json');
  const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
  
  const baseUrl = "https://www.journalentrieshub.com";
  const urlList = entries.map(entry => `${baseUrl}/entries/${entry.slug}`);
  urlList.push(baseUrl);

  // Batch size: 1000 URLs per request to stay well under the 10,000 limit
  const CHUNK_SIZE = 1000;
  
  console.log(`Starting submission of ${urlList.length} URLs in batches of ${CHUNK_SIZE}...`);

  for (let i = 0; i < urlList.length; i += CHUNK_SIZE) {
    const batch = urlList.slice(i, i + CHUNK_SIZE);
    
    try {
      const response = await fetch("https://api.indexnow.org/indexnow", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': 'Mozilla/5.0 (compatible; IndexNow-Bot/1.0)' 
        },
        body: JSON.stringify({
          host: "www.journalentrieshub.com",
          key: "4d8f744578304d62ad522c880425bfb3",
          urlList: batch
        }),
      });

      if (response.status === 200 || response.status === 202) {
        console.log(`Successfully submitted batch ${i / CHUNK_SIZE + 1} (${batch.length} URLs)`);
      } else {
        console.error(`Batch ${i / CHUNK_SIZE + 1} failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error submitting batch ${i / CHUNK_SIZE + 1}:`, error);
    }
  }
}

submitAll();
