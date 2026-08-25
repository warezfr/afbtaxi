import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('src/lib/blog-data.ts', 'utf8');
const data2 = JSON.parse(fs.readFileSync('src/lib/blog-data-2.json', 'utf8'));

const stringifiedData2 = JSON.stringify(data2, null, 2);
const innerObjects = stringifiedData2.slice(1, -1).trim(); 

const replacement = "  },\n  " + innerObjects + "\n];";
const newContent = content.replace(/\s*\}\s*\];\s*$/, replacement);

fs.writeFileSync('src/lib/blog-data.ts', newContent);
