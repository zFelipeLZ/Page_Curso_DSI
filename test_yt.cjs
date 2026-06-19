const fs = require('fs');

async function process() {
  const file = './src/data/lessonsData.js';
  let content = fs.readFileSync(file, 'utf8');

  const regex = /url:\s*"https:\/\/www\.youtube\.com\/results\?search_query=([^"]+)"/g;
  
  const matches = [...content.matchAll(regex)];
  console.log(`Found ${matches.length} search queries to process.`);
  
  for (const match of matches) {
    const fullMatch = match[0];
    const encodedQuery = match[1];
    const url = `https://www.youtube.com/results?search_query=${encodedQuery}`;
    
    try {
      console.log(`Fetching query: ${decodeURIComponent(encodedQuery)}`);
      const res = await fetch(url);
      const text = await res.text();
      const videoMatch = text.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
      
      if (videoMatch) {
        const videoId = videoMatch[1];
        const newUrl = `url: "https://www.youtube.com/watch?v=${videoId}"`;
        content = content.replace(fullMatch, newUrl);
        console.log(`-> Replaced with: ${videoId}`);
      } else {
        console.log(`-> No video found for query.`);
      }
    } catch (e) {
      console.error(`-> Error fetching query:`, e.message);
    }
  }

  fs.writeFileSync(file, content);
  console.log('All replacements done!');
}

process();
