import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(__dirname, '../public/source');
const output = path.resolve(__dirname, '../src/imageManifest.js');
const image = /\.(png|jpe?g|gif|webp|svg)$/i;
const seen = new Map();
const duplicates = [];
const unique = [];

for (const title of fs.readdirSync(sourceDir).filter((file) => image.test(file)).sort((a, b) => a.localeCompare(b, 'th'))) {
  const file = path.join(sourceDir, title);
  const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  if (seen.has(hash)) duplicates.push({ file: `/source/${title}`, duplicateOf: seen.get(hash) });
  else { seen.set(hash, `/source/${title}`); unique.push(`/source/${title}`); }
}

fs.writeFileSync(output, `export const uniqueImageFiles = new Set(${JSON.stringify(unique)});\nexport const duplicateImages = ${JSON.stringify(duplicates, null, 2)};\n`);
console.log(`Unique images: ${unique.length}; duplicates omitted from galleries: ${duplicates.length}`);
