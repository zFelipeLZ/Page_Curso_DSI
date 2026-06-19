import fs from 'fs';
let content = fs.readFileSync('src/data/lessonsData.js', 'utf8');

const techVideos = {
  'HTML': 'https://www.youtube.com/watch?v=Ejkb_YpuHWs',
  'CSS': 'https://www.youtube.com/watch?v=Ejkb_YpuHWs',
  'JS': 'https://www.youtube.com/watch?v=BXqUH86F-kA',
  'PHP': 'https://www.youtube.com/watch?v=Ejkb_YpuHWs',
  'MySQL': 'https://www.youtube.com/watch?v=Ofktsne-utM',
  'Laravel': 'https://www.youtube.com/watch?v=BXqUH86F-kA'
};

const stages = content.match(/id: 'stage-[^]+?(?=\n  },|\n\])/g);
if(stages) {
  stages.forEach(stageBlock => {
     let techMatch = stageBlock.match(/tech:\s*'([^']+)'/);
     if(techMatch) {
        let tech = techMatch[1];
        let videoUrl = techVideos[tech] || techVideos['HTML'];
        // Replace all urls in this block
        let newBlock = stageBlock.replace(/url:\s*'https:\/\/www\.youtube\.com\/watch\?v=[^']+'/g, 'url: \'' + videoUrl + '\'');
        newBlock = newBlock.replace(/url:\s*\"https:\/\/www\.youtube\.com\/watch\?v=[^\"]+\"/g, 'url: \"' + videoUrl + '\"');
        content = content.replace(stageBlock, newBlock);
     }
  });
  fs.writeFileSync('src/data/lessonsData.js', content);
  console.log('Videos updated successfully!');
} else {
  console.log('Regex failed');
}
