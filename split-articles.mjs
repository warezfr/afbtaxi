import fs from 'fs';
import { BLOG_POSTS } from './temp-data.mjs';

const chunk1 = BLOG_POSTS.slice(0, 10);
const chunk2 = BLOG_POSTS.slice(10, 20);
const chunk3 = BLOG_POSTS.slice(20, 30);

fs.writeFileSync('chunk1.json', JSON.stringify(chunk1, null, 2));
fs.writeFileSync('chunk2.json', JSON.stringify(chunk2, null, 2));
fs.writeFileSync('chunk3.json', JSON.stringify(chunk3, null, 2));
