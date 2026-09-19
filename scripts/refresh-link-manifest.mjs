import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceName = '[LINE]AI for PACC+ASD+CXTSP 2026.txt';
const sourcePath = path.resolve(__dirname, '../public/source', sourceName);
const outputPath = path.resolve(__dirname, '../src/geminiManifest.js');
const text = fs.readFileSync(sourcePath, 'utf8');
const lines = text.split(/\r?\n/);
const records = [];

for (const line of lines) {
  const urls = [...line.matchAll(/https?:\/\/[^\s<>"')]+/g)]
    .map((match) => match[0].replace(/[.,，。]+$/, ''))
    .filter((url) => /gemini\.google|docs\.google/i.test(url));
  if (!urls.length) continue;
  const author = line.match(/^\d{2}:\d{2}\s+(.+?)\s+https?:\/\//)?.[1]?.trim() || 'ผู้เข้าอบรม';
  for (const url of urls) records.push({ url, author, source: sourceName });
}

const unique = new Map(records.map((record) => [record.url, record]));
fs.writeFileSync(outputPath, `export const geminiLinks = ${JSON.stringify([...unique.values()], null, 2)};\n`);
console.log(`Refreshed ${unique.size} chat links.`);
