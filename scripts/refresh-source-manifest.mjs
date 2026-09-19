import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(__dirname, '../public/source');
const output = path.resolve(__dirname, '../src/sourceManifest.js');

const image = /\.(png|jpe?g|gif|webp|svg)$/i;
const video = /\.(mp4|mov|m4v|webm)$/i;
const doc = /\.(pdf|docx)$/i;

// 1. Admin files (4)
const adminFiles = new Set([
  '[LINE]AI for PACC+ASD+CXTSP 2026.txt',
  'รายชื่อกลุ่มเรียน ASD+CXTSP+PACC.xlsx',
  'idp-builder-vejthani-hospital (1).zip',
  'vejthani-ebook-builder (13).zip',
]);

// 2. Day 2 Live photos (5)
const day2LivePhotos = new Set([
  '285626.jpg',
  '651300.jpg',
  'S__205054107.jpg',
  'S__50372619.jpg',
  'S__6078685.jpg',
]);

// 3. Presentation slides & skill badges (14)
const slidesBadges = new Set([
  '1AI ANALYSIS _ DECISION INTELLIGENCE.png',
  '1AI Backlog Killer.png',
  '1AI FUTURE RADAR.png',
  '1AI Transformation + Zero-Based Redesign.png',
  '1International Patient ต้องใส่ในทุก Workshop และ OUTPUT.png',
  '1Marketing ไม่ใช่ “วิชาเพิ่ม.png',
  'ChatGPT Image Sep 14, 2026, 10_30_19 AM_0.png',
  'ChatGPT Image Sep 14, 2026, 10_30_29 AM (1)_0.png',
  'idp skill น้องอินทร์.png',
  'ครอสเช็ค.png',
  'skill vejthani Ebook.png',
  'ความเสี่ยงและเทคนิคปลอดภัย.png',
  'ดับเบิ้ลเช็ค.png',
  'ทรานฟอรม.png',
]);

// 4. Widescreen participant prototypes (25)
const prototypes = new Set([
  '648249.jpg',
  '7e6c3671-2624-43f4-8da0-7d8cf0df36c5.png',
  'S__33620022_0.jpg',
  'S__33620023_0.jpg',
  'S__33620024_0.jpg',
  'S__33620025_0.jpg',
  'S__33620026_0.jpg',
  'S__33620029_0.jpg',
  'S__33620030_0.jpg',
  'S__33620031_0.jpg',
  'S__33620032_0.jpg',
  'S__33620036_0.jpg',
  'S__33620037_0.jpg',
  'S__33620039.jpg',
  '285675.jpg',
  '303704.jpg',
  '651355.jpg',
  '824950.jpg',
  '904EF9FE-A70A-4D8E-8075-E29695572474.png',
  '9B95C59A-864F-4186-8DA1-40C1F44A6949.jpg',
  'S__148717674.jpg',
  'S__50372670.jpg',
  'S__6078751.jpg',
  'S__74850309.jpg',
  'S__74850341.jpg',
]);

// 5. Text & Chat screenshots (35)
const textScreenshots = new Set([
  '283234_0.jpg',
  '283649_0.jpg',
  '2CB384D6-CAC7-410A-BEF3-820285F7775B.png',
  '302819.jpg',
  '302820.jpg',
  '71ECA356-EF5C-4619-ACDE-46E34AC07920.png',
  'C3E3A925-34F3-4408-ABB3-F6799AAA9144.png',
  'E2FE182E-D486-4ABD-AF03-28C42A85E420.png',
  'S__6054371.jpg',
  'S__85663746.jpg',
  '062340BF-06D4-4E62-BE62-498A530AB2D2.jpg',
  '282973_0.jpg',
  '282974_0.jpg',
  '302489_0.jpg',
  '302490_0.jpg',
  '3F51A4B8-9275-4F13-B183-6F8A811664D0.png',
  '648465.jpg',
  '821356.jpg',
  '9F39181E-FFAC-4E2B-A470-CC7592102E3D.jpg',
  'BE9DD4F2-D697-474D-87C2-0D4A807AAACD.png',
  'S__37658644_0.jpg',
  'S__37658645_0.jpg',
  'S__46931993.jpg',
  'S__6054067.jpg',
  'S__6054072.jpg',
  'S__85475355_0.jpg',
  'S__85475356_0.jpg',
  '201182704.jpg',
  '303740.jpg',
  '825048_0.jpg',
  '825049_0.jpg',
  '825050_0.jpg',
  '825053.jpg',
  'S__205054146.jpg',
  'S__47054855.jpg',
]);

// 6. Day 2 files (55 items)
const day2Files = new Set([
  '201182704.jpg',
  '285626.jpg',
  '285675.jpg',
  '303704.jpg',
  '303740.jpg',
  '651300.jpg',
  '651355.jpg',
  '811396472.643776.mp4',
  '811396472.803780.mp4',
  '811396472.844394.mp4',
  '811396472.928398.mp4',
  '811401027.522916.mp4',
  '824950.jpg',
  '825048_0.jpg',
  '825049_0.jpg',
  '825050_0.jpg',
  '825053.jpg',
  '904EF9FE-A70A-4D8E-8075-E29695572474.png',
  '9B95C59A-864F-4186-8DA1-40C1F44A6949.jpg',
  'Gemแบบวิเคราะห์เพื่อสร้างGem Enterprise.docx',
  'Hospital Operational Excellence Report.pdf',
  'Medical Narrative Harmonization Report.pdf',
  'S__148717674.jpg',
  'S__205054107.jpg',
  'S__205054146.jpg',
  'S__33620022_0.jpg',
  'S__33620023_0.jpg',
  'S__33620024_0.jpg',
  'S__33620025_0.jpg',
  'S__33620026_0.jpg',
  'S__33620029_0.jpg',
  'S__33620030_0.jpg',
  'S__33620031_0.jpg',
  'S__33620032_0.jpg',
  'S__33620036_0.jpg',
  'S__33620037_0.jpg',
  'S__33620039.jpg',
  'S__47054855.jpg',
  'S__50372619.jpg',
  'S__50372670.jpg',
  'S__6078685.jpg',
  'S__6078751.jpg',
  'S__74850309.jpg',
  'S__74850341.jpg',
  'Service Ops Cross-Department Benchmark Q1_2569.pdf',
  'Service Recovery Action Plan - Overnight AC Malfunction.pdf',
  'Vejthani Therapeutic Catering Design Collection (2).pdf',
  'idp skill น้องอินทร์.png',
  'idp-builder-vejthani-hospital (1).zip',
  'skill vejthani Ebook.png',
  'vejthani-ebook-builder (13).zip',
  'คู่มือการพัฒนาภาวะผู้นำและการสื่อสารเชิ.pdf',
  'รายงานผลการตรวจสอบค่าใช้จ่ายการเดินทาง_2609.pdf',
  'วิเคราะห์คัดเลือกplugin chatGPT.docx',
  'รายชื่อกลุ่มเรียน ASD+CXTSP+PACC.xlsx',
]);

const files = fs
  .readdirSync(sourceDir)
  .filter((file) => file !== '.DS_Store')
  .sort((a, b) => a.localeCompare(b, 'th'));

const records = files.map((title) => {
  const isVid = video.test(title);
  const isDoc = doc.test(title);
  const isAdmin = adminFiles.has(title);
  const isDay2 = day2Files.has(title);

  let category = 'Portfolio';
  let isAtmosphere = false;
  let type = 'Image / ผลงาน';

  if (isAdmin) {
    category = 'Admin';
    type = 'Admin / ระบบ';
  } else if (isDoc) {
    category = 'Documents';
    type = 'Document / ไฟล์';
  } else if (isVid) {
    category = 'Atmosphere';
    isAtmosphere = true;
    type = 'Video / สื่อ';
  } else if (title.startsWith('LINE_ALBUM_Training 140926_260914_') || day2LivePhotos.has(title)) {
    category = 'Atmosphere';
    isAtmosphere = true;
    type = 'Image / บรรยากาศ';
  } else if (textScreenshots.has(title)) {
    category = 'TextScreenshots';
    type = 'Screenshot / บทสนทนา';
  } else if (slidesBadges.has(title) || prototypes.has(title)) {
    category = 'Portfolio';
    type = 'Image / ผลงาน';
  }

  const day = isDay2 ? 'Day 2' : 'Day 1';
  const date = isDay2 ? '18 ก.ย. 2569 (DAY 2)' : '14 ก.ย. 2569 (DAY 1)';

  return {
    file: `/source/${title}`,
    title,
    type,
    day,
    category,
    isAtmosphere,
    date,
  };
});

fs.writeFileSync(output, `export const sourceFiles = ${JSON.stringify(records, null, 2)};\n`);
console.log(`Refreshed ${records.length} source files.`);

// Category and day stats verification
const catStats = records.reduce((acc, r) => { acc[r.category] = (acc[r.category] || 0) + 1; return acc; }, {});
const dayStats = records.reduce((acc, r) => { acc[r.day] = (acc[r.day] || 0) + 1; return acc; }, {});
console.log('Categories:', catStats);
console.log('Days:', dayStats);
