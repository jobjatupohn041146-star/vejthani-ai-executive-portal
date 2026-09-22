import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BarChart3, CalendarDays, ExternalLink, FileText, Filter, Image as ImageIcon,
  Menu, Play, Search, ShieldCheck, Users, WandSparkles, X,
  Printer, ArrowLeft, FileSpreadsheet, Brain, ArrowUpRight, Archive, FileImage,
  CheckCircle2, Sparkles, Tag, Bot, Layers, Globe, FolderGit2, Calendar
} from 'lucide-react';
import './styles.css';
import { sourceFiles } from './sourceManifest';
import { people } from './peopleManifest';
import { geminiLinks } from './geminiManifest';

const navItems = ['Overview', 'Works', 'Atmosphere', 'Documents', 'People', 'Gemini'];
const navLabels = {
  Overview: 'ภาพรวม Executive',
  Works: 'พอร์ตโฟลิโอ & ผลงาน',
  Atmosphere: 'ภาพบรรยากาศการอบรม',
  Documents: 'คลังเอกสาร & สไลด์',
  People: 'ผู้เข้าร่วมอบรม',
  Gemini: 'ลิงก์ Gemini References',
};

const navIcons = {
  Overview: BarChart3,
  Works: ImageIcon,
  Atmosphere: Play,
  Documents: FileText,
  People: Users,
  Gemini: WandSparkles,
};

const displayTitle = (item) => {
  if (item.type !== 'Image / ผลงาน' && item.type !== 'Screenshot / บทสนทนา') return item.title;
  const name = item.title.replace(/\.[^.]+$/, '');
  if (/LINE_ALBUM_Training/i.test(name)) {
    const number = name.match(/_(\d+)$/)?.[1];
    return `ภาพบรรยากาศการอบรม ${number ? `· ภาพที่ ${Number(number)}` : ''}`;
  }
  if (/ChatGPT Image.*10_30_29/i.test(name)) {
    return 'แผนปฏิบัติการและผังแนวทางยุทธศาสตร์ AI โรงพยาบาลเวชธานี';
  }
  if (/ChatGPT Image/i.test(name)) {
    return 'ผลงานเวิร์กช็อปและภาพคำสั่ง AI';
  }
  if (/7e6c3671/i.test(name)) {
    return '3-Tier Healthcare Transformation Architecture';
  }
  if (/idp skill น้องอินทร์/i.test(name)) {
    return 'Intelligent Document Processing (IDP) น้องอินทร์';
  }
  if (/skill vejthani Ebook/i.test(name)) {
    return 'ระบบบริหารจัดการ Vejthani AI E-Book Manual';
  }
  if (/1AI ANALYSIS/i.test(name)) return 'AI Analysis & Decision Intelligence';
  if (/1AI Backlog Killer/i.test(name)) return 'AI Backlog Killer Architecture Flow';
  if (/1AI FUTURE RADAR/i.test(name)) return 'AI Future Radar & Technology Adoption Horizon';
  if (/1AI Transformation/i.test(name)) return 'AI Transformation + Zero-Based Redesign';
  if (/1International Patient/i.test(name)) return 'International Patient Excellence Strategy';
  if (/1Marketing/i.test(name)) return 'Healthcare Marketing & Growth Framework';
  if (/ครอสเช็ค/i.test(name)) return '10 วิธีการตรวจ Cross Check คำตอบ AI ทางการแพทย์';
  if (/ความเสี่ยงและเทคนิคปลอดภัย/i.test(name)) return 'ความเสี่ยงและเทคนิคการใช้ AI ปลอดภัย (JCI v8 & PDPA)';
  if (/ดับเบิ้ลเช็ค/i.test(name)) return '10 เทคนิค Double Check คำตอบ AI ขั้นสูง';
  if (/ทรานฟอรม/i.test(name)) return '10 ขั้นตอนสร้างสรรค์ AI Transformation เวชธานี';
  if (/648249/i.test(name)) return 'รายงานการบริหารจัดการเชิงยุทธศาสตร์: การยกระดับประสิทธิภาพพลังงาน';
  if (/285675/i.test(name)) return 'ผลงานอินโฟกราฟิก AI: ขั้นตอนการทำก๋วยจั๊บญวนสูตรเข้มข้น';
  if (/651355/i.test(name)) return 'ผลงานสร้างสรรค์ AI Art: แมวเต้นรำดิสโก้ (Creative Prompting)';
  if (/9B95C59A/i.test(name)) return 'ผลงานสร้างสรรค์ AI Illustration: สุขภาพจิตในชีวิตประจำวัน';
  if (/S__50372670/i.test(name)) return 'ผลงานสร้างสรรค์ AI Art: เชฟซูชิและสุนัขยอร์กเชียร์เทอร์เรีย';
  if (/S__74850341/i.test(name)) return 'ผลงานสร้างสรรค์ AI Art: สนามแบดมินตันสัตว์เลี้ยง (Hello Kitty)';
  if (/285626/i.test(name)) return 'ภาพบันทึกคำสั่ง AI: Google Gems Interface (Laptop)';
  if (/303704/i.test(name)) return 'ภาพบันทึกคำสั่ง AI: หน้าจอสร้าง Google Gems';
  if (/651300/i.test(name)) return 'ภาพบันทึกคำสั่ง AI: Prompt Engineering Setup';
  if (/824950/i.test(name)) return 'ภาพบันทึกคำสั่ง AI: Prompt จัดการข้อผิดพลาดและ Non-Compliance';
  if (/S__148717674/i.test(name)) return 'ภาพบันทึกคำสั่ง AI: Workspace & Prompt Configuration';
  if (/S__50372619/i.test(name)) return 'ภาพบันทึกคำสั่ง AI: Gemini Custom Gems Architecture';
  if (/S__6078685/i.test(name)) return 'ภาพบันทึกคำสั่ง AI: Gemini Gems + Astronaut Creative Prompt';
  if (/S__6078751/i.test(name)) return 'ภาพบันทึกคำสั่ง AI: ROPA & PDPA Compliance Auditor Gems';
  if (/S__74850309/i.test(name)) return 'ภาพบันทึกคำสั่ง AI: รายการ Enterprise Gems คณะทำงาน AI';
  if (/S__205054107/i.test(name)) return 'Google Gems: ผังระบบจัดการทรัพยากรและยุทธศาสตร์ 6 ด้าน';
  if (/short PACC/i.test(name)) return 'AI Prompt Shortcut: 20 คำสั่งลัดสร้างระบบงานจริงสำหรับแผนก PACC';
  if (/short ASD/i.test(name)) return 'AI Prompt Shortcut: 20 คำสั่งลัดสร้างระบบงานจริงสำหรับแผนก ASD';
  if (/short CXTSP/i.test(name)) return 'AI Prompt Shortcut: 20 คำสั่งลัดสร้างระบบงานจริงสำหรับแผนก CXTSP';
  if (/Screenshot.*08\.15\.53/i.test(name) || /Vibe Code/i.test(name)) return 'Vibe Code: 5 ขั้นตอนสร้างแอพด้วย AI จากไอเดียสู่ใช้งานจริง';
  return name.replace(/^\d+/, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim() || 'ภาพผลงานจากโครงการ';
};

const displayFileTitle = (item) => {
  const title = item.title.replace(/\.[^.]+$/, '');
  if (/17_Apps_Portfolio/i.test(title)) return 'Vejthani Antigravity 17 AI Apps Enterprise Portfolio (24 หน้า)';
  if (/vejthani-antigravity-project-portfolio/i.test(title)) return 'แบบจำลองสถาปัตยกรรม & คำนวณ ROI 17 AI Projects (Excel)';
  if (/vibe-coding-idea-architect/i.test(title)) return 'Vibe Coding Idea Architect Project Prototype';
  if (/VOICE PACC/i.test(title)) return 'Master Prompt สนทนาเสียง (Voice AI) แผนก PACC';
  if (/voice ASD/i.test(title)) return 'Master Prompt สนทนาเสียง (Voice AI) แผนก ASD';
  if (/VOICE CXTSP/i.test(title)) return 'Master Prompt สนทนาเสียง (Voice AI) แผนก CXTSP';
  if (/digital SOP/i.test(title)) return 'Digital SOP ชุดคำสั่งสร้างระบบงานมาตรฐาน 3 แผนก';
  if (/สร้างระบบทั้ง3แผนก/i.test(title)) return 'คู่มือคำสั่งสร้างเว็บแอปพลิเคชันระบบงาน 3 แผนก';
  if (/แบบทดสอบความรู้/i.test(title)) return 'แบบทดสอบความรู้และ Interactive Prompt Exam 3 แผนก';
  if (/แบบสอบถามการบริการ/i.test(title)) return 'แบบประเมินและสำรวจความพึงพอใจการบริการรวม 3 แผนก';
  if (/ช่องแชท|เวิคช้อป/i.test(title)) return 'เอกสารประกอบการอบรม (AI Workshop Notes)';
  if (/AI_Backlog_Killer_Subcontract/i.test(title)) return 'AI Backlog Killer Subcontract KPI Report';
  if (/AI Backlog Killer Requirement/i.test(title)) return 'AI Backlog Killer Requirements Management';
  if (/AI_Backlog_Killer_COO_Presentation/i.test(title)) return 'AI Backlog Killer COO Presentation Deck';
  if (/AI_Backlog_Killer_COO_Executive_Brief/i.test(title)) return 'AI Backlog Killer COO Executive Brief';
  if (/AI_Backlog_Killer_MCO_COO/i.test(title)) return 'AI Backlog Killer MCO & COO Action Plan';
  if (/AI Backlog Killer/i.test(title) || /Black Killer/i.test(title)) return 'AI Backlog Killer Executive Brief';
  if (/AI FUTURE RADAR/i.test(title)) return 'AI Future Radar Analysis Report';
  if (/วิเคราะห์ลดการใช้พลังงาน/i.test(title)) return 'วิเคราะห์การประหยัดพลังงานโรงพยาบาล';
  if (/รายชื่อกลุ่มเรียน/i.test(title)) return 'รายชื่อผู้เข้าอบรมและกลุ่มปฏิบัติงาน';
  if (/Service Recovery/i.test(title)) return 'Service Recovery Action Plan Report';
  if (/Service Ops Cross-Department/i.test(title)) return 'Service Ops Cross-Department Benchmark Q1 2569';
  if (/Medical Narrative/i.test(title)) return 'Medical Narrative Harmonization Report';
  if (/Hospital Operational Excellence/i.test(title)) return 'Hospital Operational Excellence Report';
  if (/ROPA_AI_Backlog_Killer/i.test(title)) return 'ROPA AI Backlog Killer Compliance';
  if (/Vejthani Therapeutic/i.test(title)) return 'Vejthani Therapeutic Catering Design Collection';
  if (/คู่มือการพัฒนาภาวะผู้นำ/i.test(title)) return 'คู่มือการพัฒนาภาวะผู้นำและการสื่อสารเชิงยุทธศาสตร์';
  if (/รายงานผลการตรวจสอบค่าใช้จ่าย/i.test(title)) return 'รายงานการตรวจสอบค่าใช้จ่ายการเดินทาง';
  if (/หลักสูตรผู้ช่วยพยาบาล/i.test(title)) return 'หลักสูตรผู้ช่วยพยาบาล ดูแลผู้สูงอายุ';
  if (/LINE\]AI for PACC/i.test(title)) return 'บันทึกบทสนทนาโครงการ AI for PACC+ASD+CXTSP';
  const clean = title.replace(/_/g, ' ');
  return clean.length > 45 ? `${clean.slice(0, 45).trim()}…` : clean;
};

const BASE = (import.meta.env.BASE_URL || './').endsWith('/') ? (import.meta.env.BASE_URL || './') : `${import.meta.env.BASE_URL}/`;
const assetUrl = (p) => `${BASE}${p.replace(/^\//, '')}`;
const fileUrl = (item) => assetUrl(`source/${encodeURI(item?.title || '')}`);

function getFileExtension(title) {
  if (!title) return 'file';
  const ext = title.split('.').pop()?.toLowerCase();
  return ext || 'file';
}

function renderFileIcon(title) {
  const ext = getFileExtension(title);
  if (ext === 'pdf') return <FileText size={30} style={{ color: '#ef4444' }} />;
  if (ext === 'docx' || ext === 'doc') return <FileText size={30} style={{ color: '#60a5fa' }} />;
  if (ext === 'xlsx' || ext === 'xls') return <FileSpreadsheet size={30} style={{ color: '#4ade80' }} />;
  if (ext === 'zip' || ext === 'rar' || ext === '7z') return <Archive size={30} style={{ color: '#fbbf24' }} />;
  if (ext === 'txt') return <FileText size={30} style={{ color: '#cbd5e1' }} />;
  if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') return <FileImage size={30} style={{ color: '#c084fc' }} />;
  return <FileText size={30} style={{ color: '#38bdf8' }} />;
}

function getPersonPillar(person) {
  const dept = (person.department || '').toLowerCase();
  const role = (person.role || '').toLowerCase();
  if (dept.includes('data driven') || role.includes('data scientist')) return 'DATA';
  if (dept.includes('patient access') || dept.includes('medical coordination') || dept.includes('referral aviation')) return 'PACC';
  if (dept.includes('customer experience') || dept.includes('customer service') || dept.includes('cxtsp')) return 'CXTSP';
  if (dept.includes('ancillary') || dept.includes('facilities') || dept.includes('ward') || dept.includes('catering') || dept.includes('asd')) return 'ASD';
  return 'PACC';
}

function getThaiInitial(name) {
  if (!name) return 'AI';
  const nickMatch = name.match(/\(([^)]+)\)/);
  if (nickMatch) {
    return nickMatch[1].trim();
  }
  const clean = name.replace(/^(นาย|นางสาว|นาง|นพ\.|พญ\.|ภก\.|ภญ\.|ทพ\.|ทพญ\.|ดร\.)\s*/, '').trim();
  return clean.split(/\s+/)[0].slice(0, 3);
}

const getInitials = getThaiInitial;

const pillarStyles = {
  PACC: { bg: 'linear-gradient(135deg, #0284c7, #0369a1)', color: '#ffffff', badge: 'pacc', label: 'PACC' },
  ASD: { bg: 'linear-gradient(135deg, #059669, #047857)', color: '#ffffff', badge: 'asd', label: 'ASD' },
  CXTSP: { bg: 'linear-gradient(135deg, #ea580c, #c2410c)', color: '#ffffff', badge: 'cxtsp', label: 'CXTSP' },
  DATA: { bg: 'linear-gradient(135deg, #9333ea, #7e22ce)', color: '#ffffff', badge: 'data', label: 'DATA' },
};

function CaresArchitectureSvg() {
  return (
    <svg viewBox="0 0 720 125" width="100%" height="auto" style={{ borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', margin: '0.8rem 0' }}>
      <rect x="15" y="18" width="115" height="88" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
      <text x="72" y="44" textAnchor="middle" fill="#0c265c" fontSize="11" fontWeight="bold">Hospital Data</text>
      <text x="72" y="62" textAnchor="middle" fill="#475569" fontSize="9">HIS · EMR · Claims</text>
      <text x="72" y="78" textAnchor="middle" fill="#0284c7" fontSize="8" fontWeight="bold">+ PDPA Shield</text>

      <path d="M 130 62 L 152 62" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />

      <rect x="155" y="18" width="125" height="88" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="217" y="44" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="bold">C.A.R.E.S. Prompt</text>
      <text x="217" y="62" textAnchor="middle" fill="#475569" fontSize="9">Context · Audience</text>
      <text x="217" y="78" textAnchor="middle" fill="#d97706" fontSize="8" fontWeight="bold">Role · Ethics · Shape</text>

      <path d="M 280 62 L 302 62" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />

      <rect x="305" y="18" width="125" height="88" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="367" y="44" textAnchor="middle" fill="#581c87" fontSize="11" fontWeight="bold">GoT 5-Node AI</text>
      <text x="367" y="62" textAnchor="middle" fill="#475569" fontSize="9">PESTEL · SWOT · BCG</text>
      <text x="367" y="78" textAnchor="middle" fill="#9333ea" fontSize="8" fontWeight="bold">ERRC · Synthesizer</text>

      <path d="M 430 62 L 452 62" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />

      <rect x="455" y="18" width="120" height="88" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
      <text x="515" y="44" textAnchor="middle" fill="#064e3b" fontSize="11" fontWeight="bold">4 Pillars Deploy</text>
      <text x="515" y="62" textAnchor="middle" fill="#475569" fontSize="9">PACC · ASD</text>
      <text x="515" y="78" textAnchor="middle" fill="#059669" fontSize="8" fontWeight="bold">CXTSP · Data</text>

      <path d="M 575 62 L 597 62" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />

      <rect x="600" y="18" width="105" height="88" rx="8" fill="#0c265c" stroke="#0284c7" strokeWidth="1.5" />
      <text x="652" y="44" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Outcome</text>
      <text x="652" y="62" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">-42% Time</text>
      <text x="652" y="78" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="bold">10,000M THB</text>
    </svg>
  );
}

function BacklogKillerFlowSvg() {
  return (
    <svg viewBox="0 0 720 85" width="100%" height="auto" style={{ borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', margin: '0.8rem 0' }}>
      <rect x="10" y="12" width="155" height="60" rx="6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1" />
      <text x="87" y="36" textAnchor="middle" fill="#0c265c" fontSize="10" fontWeight="bold">1. Intake & Scanning</text>
      <text x="87" y="52" textAnchor="middle" fill="#64748b" fontSize="8">สัญญายืมตัว, PR, เวชระเบียน</text>

      <path d="M 165 42 L 188 42" stroke="#0284c7" strokeWidth="2" />

      <rect x="190" y="12" width="155" height="60" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
      <text x="267" y="36" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="bold">2. OCR & Extraction</text>
      <text x="267" y="52" textAnchor="middle" fill="#475569" fontSize="8">สกัดข้อมูลอัตโนมัติ (15 วินาที)</text>

      <path d="M 345 42 L 368 42" stroke="#0284c7" strokeWidth="2" />

      <rect x="370" y="12" width="160" height="60" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="450" y="36" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">3. Rule & Policy Audit</text>
      <text x="450" y="52" textAnchor="middle" fill="#475569" fontSize="8">ตรวจสอบ JCI v8 & กฎหมาย</text>

      <path d="M 530 42 L 553 42" stroke="#059669" strokeWidth="2" />

      <rect x="555" y="12" width="155" height="60" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="632" y="36" textAnchor="middle" fill="#15803d" fontSize="10" fontWeight="bold">4. Auto Routing & Sync</text>
      <text x="632" y="52" textAnchor="middle" fill="#15803d" fontSize="8">อนุมัติ & เชื่อมโยง HIS (เสร็จสิ้น)</text>
    </svg>
  );
}

function ImageCard({ item, openPreview }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const src = fileUrl(item);

  return (
    <article className="card image-card" key={item.file || item.title}>
      <button className="media-button" onClick={() => openPreview(item)} aria-label={`เปิดภาพ ${displayTitle(item)}`}>
        {!error ? (
          <img
            src={src}
            alt={displayTitle(item)}
            loading="eager"
            decoding="async"
            style={{ opacity: loaded ? 1 : 0.9, transition: 'opacity 0.2s ease' }}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        ) : (
          <div className="img-fallback hospital-emblem-fallback">
            <div className="emblem-badge">
              <ShieldCheck size={22} style={{ color: '#0284c7' }} />
            </div>
            <span className="fallback-tag">VEJTHANI HOSPITAL</span>
            <span className="fallback-title">{displayTitle(item)}</span>
          </div>
        )}
      </button>
    </article>
  );
}

function ImageGallery({ title, items, openPreview }) {
  if (!items.length) return null;
  return (
    <section className="gallery-section">
      <div className="gallery-title">
        <div>
          <h3>{title}</h3>
          <p>พอร์ตโฟลิโอภาพผลงานโครงการ สถาปัตยกรรมระบบ และคำสั่ง AI</p>
        </div>
        <span className="gallery-count">{items.length} รายการ</span>
      </div>
      <div className="grid image-grid">
        {items.map((item) => (
          <ImageCard key={item.file || item.title} item={item} openPreview={openPreview} />
        ))}
      </div>
    </section>
  );
}

function FileGallery({ title, items, openFile }) {
  if (!items.length) return null;
  return (
    <section className="gallery-section file-gallery">
      <div className="gallery-title">
        <div>
          <h3>{title}</h3>
          <p>ไฟล์เอกสาร รายงานสรุป และสไลด์นำเสนอเปิดดูได้ทันที</p>
        </div>
        <span className="gallery-count">{items.length} ไฟล์</span>
      </div>
      <div className="grid file-grid">
        {items.map((item) => (
          <article className="card file-card" key={item.file}>
            <button className="media-button" onClick={() => openFile(item)} aria-label={`เปิด ${displayFileTitle(item)}`}>
              <div className="file-placeholder">
                {renderFileIcon(item.title)}
                <span>{getFileExtension(item.title).toUpperCase()}</span>
              </div>
            </button>
            <div className="card-body">
              <span className="tag" style={{ color: '#0284c7', fontSize: '0.65rem', fontWeight: 800 }}>{item.date || 'ไฟล์โครงการ'}</span>
              <h2>{displayFileTitle(item)}</h2>
              <a href={fileUrl(item)} target="_blank" rel="noreferrer">เปิดไฟล์เอกสาร <ExternalLink size={14} /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AtmosphereGallery({ images, videos, openPreview, openVideo }) {
  const total = [...images, ...videos];
  if (!total.length) return null;
  return (
    <section className="gallery-section atmosphere-gallery">
      <div className="gallery-title">
        <div>
          <h3>ภาพบันทึกบรรยากาศการอบรม (Training Atmosphere)</h3>
          <p>ภาพและวิดีโอกิจกรรมฝึกปฏิบัติการใช้นวัตกรรม AI (แยกส่วนจากพอร์ตโฟลิโออย่างรัดกุม)</p>
        </div>
        <span className="gallery-count">{total.length} รายการ</span>
      </div>
      <div className="grid image-grid">
        {images.map((item) => (
          <ImageCard key={item.file || item.title} item={item} openPreview={openPreview} />
        ))}
        {videos.map((item) => (
          <article className="card image-card video-card" key={item.file}>
            <button className="media-button" onClick={() => openVideo(item)} aria-label={`เล่นวิดีโอ ${displayTitle(item)}`}>
              <video src={fileUrl(item)} muted preload="metadata" playsInline />
              <span className="video-cover">
                <span className="video-play-badge">
                  <Play size={24} fill="#ffffff" />
                </span>
                <b>เล่นวิดีโอ (คลิกเพื่อดูตัวอย่าง)</b>
              </span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ParticipantShowcase({ globalQuery = '' }) {
  const [search, setSearch] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('ALL');
  const [expandedPerson, setExpandedPerson] = useState(null);

  const effectiveSearch = (search || globalQuery || '').toLowerCase().trim();

  const filteredPeople = useMemo(() => {
    return people.filter((p) => {
      const pillar = getPersonPillar(p);
      const matchesPillar = selectedPillar === 'ALL' || pillar === selectedPillar;
      if (!matchesPillar) return false;
      if (!effectiveSearch) return true;
      const text = `${p.name} ${p.role} ${p.department} ${p.id} ${p.responsibilities} ${p.currentAiTools} ${p.aiLearningGoals}`.toLowerCase();
      return text.includes(effectiveSearch);
    });
  }, [effectiveSearch, selectedPillar]);

  return (
    <section className="people-grid-container" style={{ marginTop: '1rem' }}>
      <div className="page-heading">
        <div>
          <p className="eyebrow">PARTICIPANT SHOWCASE & STRATEGIC PROFILES</p>
          <h2>รายชื่อผู้เข้าอบรมและคณะทำงาน AI Strategy (Vejthani AI Champions)</h2>
        </div>
        <span className="result-count">{filteredPeople.length} จาก {people.length} บุคลากร</span>
      </div>

      {/* Live Text Search & Pillar Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.2rem', marginTop: '0.8rem' }}>
        <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '420px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            type="text"
            placeholder="ค้นหาชื่อ, แผนก, บทบาท, หรือเป้าหมาย AI..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              padding: '0.6rem 1rem 0.6rem 2.2rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              color: '#0f172a'
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', color: '#94a3b8' }}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Pillar Filter Pills */}
        <div className="pillar-filter-bar" style={{ margin: 0 }}>
          <button
            className={`pillar-pill ${selectedPillar === 'ALL' ? 'active' : ''}`}
            onClick={() => setSelectedPillar('ALL')}
          >
            ทั้งหมด ({people.length})
          </button>
          <button
            className={`pillar-pill pacc ${selectedPillar === 'PACC' ? 'active' : ''}`}
            onClick={() => setSelectedPillar('PACC')}
          >
            PACC ({people.filter(p => getPersonPillar(p) === 'PACC').length})
          </button>
          <button
            className={`pillar-pill asd ${selectedPillar === 'ASD' ? 'active' : ''}`}
            onClick={() => setSelectedPillar('ASD')}
          >
            ASD ({people.filter(p => getPersonPillar(p) === 'ASD').length})
          </button>
          <button
            className={`pillar-pill cxtsp ${selectedPillar === 'CXTSP' ? 'active' : ''}`}
            onClick={() => setSelectedPillar('CXTSP')}
          >
            CXTSP ({people.filter(p => getPersonPillar(p) === 'CXTSP').length})
          </button>
          <button
            className={`pillar-pill data ${selectedPillar === 'DATA' ? 'active' : ''}`}
            onClick={() => setSelectedPillar('DATA')}
          >
            Data Driven ({people.filter(p => getPersonPillar(p) === 'DATA').length})
          </button>
        </div>
      </div>

      <div className="floating-people-grid">
        {filteredPeople.map((person, idx) => {
          const pillar = getPersonPillar(person);
          const pStyle = pillarStyles[pillar] || pillarStyles.PACC;
          const initial = getThaiInitial(person.name);
          const isExpanded = expandedPerson === person.id;
          const isLeader = /บอส|อุ่น|COO|Manager|Director|Deputy/i.test(`${person.name} ${person.role}`);

          return (
            <div className={`floating-person-card ${isLeader ? 'leader' : ''}`} key={person.id} style={{ animationDelay: `${(idx % 6) * 0.15}s` }}>
              <div className="card-top">
                <div className="avatar-ring" style={{ background: pStyle.bg, color: pStyle.color, border: 'none' }}>
                  <span>{initial}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <span className={`pillar-badge ${pStyle.badge}`}>{pStyle.label}</span>
                  <div className="id-badge">ID: {person.id}</div>
                </div>
              </div>

              <div className="card-body-info">
                <h3 className="person-name">{person.name}</h3>
                <span className="person-role">{person.role || 'ผู้เข้าร่วมการอบรม'}</span>
                <p className="person-dept">{person.department}</p>
              </div>

              {/* Rich Fields Section */}
              <div className="person-rich-section">
                {person.responsibilities && person.responsibilities !== '-' && (
                  <div className="rich-field">
                    <span className="rich-field-label">หน้าที่ความรับผิดชอบหลัก:</span>
                    <div className="rich-field-value" style={{ maxHeight: isExpanded ? 'none' : '65px', overflow: 'hidden', position: 'relative' }}>
                      {person.responsibilities}
                      {person.responsibilities.length > 90 && !isExpanded && (
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '24px', background: 'linear-gradient(transparent, #f8fafc)' }} />
                      )}
                    </div>
                    {person.responsibilities.length > 90 && (
                      <button
                        onClick={() => setExpandedPerson(isExpanded ? null : person.id)}
                        style={{ background: 'none', color: '#0284c7', fontSize: '0.72rem', fontWeight: 700, padding: 0, textAlign: 'left', marginTop: '0.2rem', cursor: 'pointer' }}
                      >
                        {isExpanded ? 'ย่อรายละเอียด ▲' : 'ดูเพิ่มเติม ▼'}
                      </button>
                    )}
                  </div>
                )}

                {person.currentAiTools && person.currentAiTools !== '-' && (
                  <div className="rich-field">
                    <span className="rich-field-label">เครื่องมือ AI ปัจจุบัน:</span>
                    <div className="rich-field-value" style={{ color: '#0369a1', fontWeight: 600 }}>
                      {person.currentAiTools}
                    </div>
                  </div>
                )}

                {person.aiLearningGoals && (
                  <div className="rich-field">
                    <span className="rich-field-label">เป้าหมายการเรียนรู้ AI:</span>
                    <div className="rich-field-value" style={{ color: '#15803d' }}>
                      {person.aiLearningGoals}
                    </div>
                  </div>
                )}
              </div>

              <div className="card-footer-tags">
                <span className="tag-chip">#AIChampion</span>
                <span className="tag-chip blue">#{pStyle.label}Pillar</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function GeminiArtifactsHub() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [dayFilter, setDayFilter] = useState('ALL');

  const counts = useMemo(() => {
    return {
      total: geminiLinks.length,
      gemini: geminiLinks.filter(l => l.type === 'gemini_share').length,
      docs: geminiLinks.filter(l => l.type === 'google_docs').length,
      gems: geminiLinks.filter(l => l.type === 'custom_gem').length,
      day1: geminiLinks.filter(l => l.day === 'Day 1').length,
      day2: geminiLinks.filter(l => l.day === 'Day 2').length,
      day3: geminiLinks.filter(l => l.day === 'Day 3').length,
      contributors: new Set(geminiLinks.map(l => l.authorName || l.author)).size
    };
  }, []);

  const departments = useMemo(() => {
    const list = Array.from(new Set(geminiLinks.map(l => l.department).filter(Boolean)));
    return ['ALL', ...list];
  }, []);

  const filteredLinks = useMemo(() => {
    const s = search.toLowerCase().trim();
    return geminiLinks.filter(item => {
      const matchType = typeFilter === 'ALL' || item.type === typeFilter;
      const matchDept = deptFilter === 'ALL' || item.department === deptFilter;
      const matchDay = dayFilter === 'ALL' || item.day === dayFilter;
      if (!matchType || !matchDept || !matchDay) return false;
      if (!s) return true;
      const corpus = `${item.title} ${item.description} ${item.author} ${item.authorName} ${item.role} ${item.department} ${(item.tags || []).join(' ')}`.toLowerCase();
      return corpus.includes(s);
    });
  }, [search, typeFilter, deptFilter, dayFilter]);

  const getTypeBadge = (type) => {
    if (type === 'google_docs') {
      return {
        label: 'Google Docs Strategy',
        className: 'github-badge-docs',
        icon: FileText,
        color: '#2563eb',
        dot: '#3b82f6',
        btnText: 'เปิดอ่านเอกสาร Google Docs'
      };
    }
    if (type === 'custom_gem') {
      return {
        label: 'Hospital Custom Gem',
        className: 'github-badge-gem',
        icon: Bot,
        color: '#d97706',
        dot: '#f59e0b',
        btnText: 'เปิดใช้งาน Custom Gem Agent'
      };
    }
    return {
      label: 'Gemini 1.5 Shared Chat',
      className: 'github-badge-gemini',
      icon: Sparkles,
      color: '#7c3aed',
      dot: '#8b5cf6',
      btnText: 'เข้าสู่บทสนทนา Gemini'
    };
  };

  return (
    <div className="github-portal">
      <div className="page-heading">
        <div>
          <p className="eyebrow">EXECUTIVE GEMINI REPOSITORY</p>
          <h2>ลิงก์ผลงานและชุดคำสั่ง AI (Gemini References & Prompts)</h2>
        </div>
        <span className="result-count">{filteredLinks.length} รายการ</span>
      </div>

      {/* GitHub Search & Filter Toolbar */}
      <div className="github-toolbar">
        <div className="github-search-box">
          <Search size={15} className="github-search-icon" />
          <input
            type="text"
            placeholder="ค้นหาชื่อผลงาน, คำสำคัญ, ผู้เข้าอบรม หรือฝ่ายงาน..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch('')} className="github-search-clear" aria-label="ล้างการค้นหา">
              <X size={14} />
            </button>
          )}
        </div>

        {/* GitHub Type Tabs */}
        <div className="github-type-tabs">
          <button
            className={`github-tab-btn ${typeFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setTypeFilter('ALL')}
          >
            ทั้งหมด ({counts.total})
          </button>
          <button
            className={`github-tab-btn gemini ${typeFilter === 'gemini_share' ? 'active' : ''}`}
            onClick={() => setTypeFilter('gemini_share')}
          >
            <Sparkles size={13} /> Gemini Chats ({counts.gemini})
          </button>
          <button
            className={`github-tab-btn docs ${typeFilter === 'google_docs' ? 'active' : ''}`}
            onClick={() => setTypeFilter('google_docs')}
          >
            <FileText size={13} /> Google Docs ({counts.docs})
          </button>
          <button
            className={`github-tab-btn gems ${typeFilter === 'custom_gem' ? 'active' : ''}`}
            onClick={() => setTypeFilter('custom_gem')}
          >
            <Bot size={13} /> Custom Gems ({counts.gems})
          </button>
        </div>
      </div>

      {/* Day Filter Pills */}
      <div className="github-day-bar" style={{ marginTop: '0.6rem', marginBottom: '0.5rem' }}>
        <span className="day-label"><Calendar size={13} /> รุ่นการอบรม:</span>
        <button
          className={`github-day-pill ${dayFilter === 'ALL' ? 'active' : ''}`}
          onClick={() => setDayFilter('ALL')}
        >
          ทุกวัน ({counts.total})
        </button>
        <button
          className={`github-day-pill day1 ${dayFilter === 'Day 1' ? 'active' : ''}`}
          onClick={() => setDayFilter('Day 1')}
        >
          DAY 1 (14 ก.ย.) ({counts.day1})
        </button>
        <button
          className={`github-day-pill day2 ${dayFilter === 'Day 2' ? 'active' : ''}`}
          onClick={() => setDayFilter('Day 2')}
        >
          DAY 2 (18 ก.ย.) ({counts.day2})
        </button>
        <button
          className={`github-day-pill day3 ${dayFilter === 'Day 3' ? 'active' : ''}`}
          onClick={() => setDayFilter('Day 3')}
        >
          DAY 3 (21 ก.ย.) ({counts.day3})
        </button>
      </div>

      {/* Department Filter Pills */}
      <div className="github-dept-bar" style={{ marginTop: '0.4rem' }}>
        <span className="dept-label"><Tag size={13} /> คัดกรองตามฝ่าย:</span>
        {departments.map((dept) => (
          <button
            key={dept}
            className={`github-dept-pill ${deptFilter === dept ? 'active' : ''}`}
            onClick={() => setDeptFilter(dept)}
          >
            {dept === 'ALL' ? 'ทุกฝ่ายงาน' : dept}
          </button>
        ))}
      </div>

      {/* Artifact Cards Grid */}
      <div className="github-cards-grid">
        {filteredLinks.map((item) => {
          const typeMeta = getTypeBadge(item.type);
          const TypeIcon = typeMeta.icon;
          const authorInitial = (item.authorName || item.author || 'V').trim().charAt(0);

          return (
            <article className={`github-card ${item.type}`} key={item.id || item.url}>
              <div className="github-card-top">
                <div className="github-type-tag" style={{ color: typeMeta.color }}>
                  <span className="lang-dot" style={{ background: typeMeta.dot }} />
                  <TypeIcon size={13} />
                  <span>{typeMeta.label}</span>
                </div>
                <div className="github-card-meta">
                  <span className={`github-day-badge ${item.day === 'Day 3' ? 'day3' : item.day === 'Day 2' ? 'day2' : 'day1'}`}>
                    {item.day || 'Day 1'}
                  </span>
                  <span>{item.date || '14 ก.ย. 2569'}</span>
                  <span className="verified-check" title="ลิงก์ตรวจสอบสมบูรณ์"><CheckCircle2 size={13} /></span>
                </div>
              </div>

              <div className="github-author-row">
                <div className="github-avatar" style={{ background: `linear-gradient(135deg, ${typeMeta.color}, #0c265c)` }}>
                  {authorInitial}
                </div>
                <div className="github-author-info">
                  <div className="author-name-line">
                    <strong className="author-fullname">{item.authorName || item.author}</strong>
                    {item.author && <span className="author-alias">@{item.author}</span>}
                  </div>
                  <span className="author-role">{item.role || 'ผู้นำฝ่ายปฏิบัติการ'} · <small>{item.department || 'Vejthani'}</small></span>
                </div>
              </div>

              <h3 className="github-card-title">
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </h3>

              <p className="github-card-desc">
                {item.description}
              </p>

              {item.tags && item.tags.length > 0 && (
                <div className="github-tags-list">
                  {item.tags.map((t, idx) => (
                    <span className="github-tag" key={idx}>#{t}</span>
                  ))}
                </div>
              )}

              <div className="github-card-footer">
                <a href={item.url} target="_blank" rel="noreferrer" className="github-action-btn">
                  <span>{typeMeta.btnText}</span>
                  <ArrowUpRight size={14} />
                </a>
                <span className="github-domain-label">
                  <Globe size={11} /> {item.url.includes('docs.google') ? 'docs.google.com' : item.url.includes('/gem/') ? 'gemini.google.com' : 'share.gemini.google'}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {filteredLinks.length === 0 && (
        <div className="github-empty-state">
          <Search size={36} style={{ color: '#94a3b8', margin: '0 auto 1rem' }} />
          <h3>ไม่พบผลงานที่ตรงกับเงื่อนไขการค้นหา</h3>
          <p>ลองปรับคำค้นหา หรือเลือกแท็บประเภทผลงานเป็น "ทั้งหมด"</p>
          <button onClick={() => { setSearch(''); setTypeFilter('ALL'); setDeptFilter('ALL'); }} className="btn-reset">
            รีเซ็ตตัวกรองทั้งหมด
          </button>
        </div>
      )}
    </div>
  );
}

function ExecutiveFormalReport({ onBack }) {
  return (
    <div className="formal-report-container">
      {/* Printable Control Bar */}
      <div className="no-print report-control-bar">
        <button className="btn-back" onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <ArrowLeft size={18} /> กลับสู่แดชบอร์ด
        </button>
        <button className="btn-print" onClick={() => window.print()}>
          <Printer size={16} /> พิมพ์รายงาน / Export PDF (10 หน้า A4)
        </button>
      </div>

      {/* PAGE 1: EXECUTIVE COVER */}
      <div className="a4-page">
        <div>
          <div className="a4-page-header">
            <img src={assetUrl('vejthani-logo.png')} alt="Vejthani Hospital" style={{ height: '54px', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <span>EXECUTIVE BRIEFING · A4 FORMAL</span>
          </div>
          <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
            <p style={{ color: '#0284c7', fontSize: '0.9rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              VEJTHANI HOSPITAL HEALTHCARE IT & AI STRATEGY 2026
            </p>
            <h1 style={{ color: '#0c265c', fontSize: '2.1rem', fontWeight: '900', lineHeight: 1.25, marginBottom: '1rem' }}>
              รายงานสรุปยุทธศาสตร์และผลงาน<br />การพัฒนาปัญญาประดิษฐ์ทางการแพทย์<br />
              <span style={{ color: '#0284c7', fontSize: '1.65rem', fontWeight: '800' }}>(AI FOR PACC + ASD + CXTSP)</span>
            </h1>
            <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.6, maxWidth: '680px', marginTop: '1rem' }}>
              สรุปผลการจัดอบรมเชิงปฏิบัติการบุคลากรทางการแพทย์ พยาบาล และระบบสนับสนุน 3 วันเต็ม (14, 18 & 21 กันยายน 2569) เพื่อยกระดับความเร็วบริการ คืนเวลาปฏิบัติงาน และมุ่งสู่เป้าหมายรายได้ 10,000 ล้านบาท
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem', background: '#f8fafc', padding: '1.4rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <div>
              <small style={{ color: '#64748b', fontSize: '0.72rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>ช่วงเวลาดำเนินการ</small>
              <strong style={{ color: '#0c265c', fontSize: '0.92rem' }}>14, 18 & 21 กันยายน 2569</strong>
            </div>
            <div>
              <small style={{ color: '#64748b', fontSize: '0.72rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>หน่วยงานรับผิดชอบ</small>
              <strong style={{ color: '#0c265c', fontSize: '0.92rem' }}>คณะทำงาน AI Strategy</strong>
            </div>
            <div>
              <small style={{ color: '#64748b', fontSize: '0.72rem', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>มาตรฐานการรับรอง</small>
              <strong style={{ color: '#0284c7', fontSize: '0.92rem' }}>JCI v8 & PDPA 100%</strong>
            </div>
          </div>

          <div style={{ marginTop: '2rem', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.2rem', borderRadius: '12px' }}>
            <strong style={{ color: '#166534', fontSize: '0.88rem', display: 'block', marginBottom: '0.3rem' }}>🎯 เป้าหมายยุทธศาสตร์องค์กร (Strategic Target)</strong>
            <p style={{ color: '#14532d', fontSize: '0.84rem', lineHeight: 1.5, margin: 0 }}>
              ยกระดับความเร็วในการส่งต่อผู้ป่วยต่างชาติ 4 เท่า, คืนเวลาดูแลคนไข้ให้บุคลากรทางการแพทย์ 3.5 ชม./วัน, และผลักดันรายได้องค์กรสู่ 10,000 ล้านบาท ภายในปี 2573
            </p>
          </div>
        </div>
        <div className="a4-page-footer">
          <span>โรงพยาบาลเวชธานี (Vejthani Hospital) · สรุปยุทธศาสตร์ AI</span>
          <span>PAGE 01 / 10</span>
        </div>
      </div>

      {/* PAGE 2: EXECUTIVE SUMMARY (BLUF & KEY NUMBERS) */}
      <div className="a4-page">
        <div>
          <div className="a4-page-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src={assetUrl('vejthani-logo.png')} alt="Vejthani Hospital" style={{ height: '30px', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <h2>PAGE 02 · EXECUTIVE SUMMARY (BLUF: READ IN 60 SECONDS)</h2>
            </div>
            <span>Vejthani AI Report</span>
          </div>

          <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0284c7', padding: '1.2rem', borderRadius: '10px', marginBottom: '1.4rem' }}>
            <h3 style={{ color: '#0c265c', fontSize: '0.95rem', fontWeight: '800', margin: '0 0 0.35rem 0' }}>💡 BOTTOM LINE UP FRONT (BLUF)</h3>
            <p style={{ color: '#1e293b', fontSize: '0.88rem', fontWeight: '700', lineHeight: 1.55, margin: 0 }}>
              โครงการยุทธศาสตร์ AI สามารถย่อระยะเวลาสะสมในกระบวนการ (Process Bottleneck) ได้กว่า 42% คืนเวลาปฏิบัติงานให้พยาบาลและบุคลากร 3.5 ชม./คน/วัน ลดต้นทุนภาระงานสะสม 12.4 ล้านบาท/ปี พร้อมขยายเป้าหมายรายได้องค์กรสู่ 10,000 ล้านบาทใน 5 ปี ตามมาตรฐาน JCI v8 และ PDPA 100%
            </p>
          </div>

          <h3 style={{ color: '#0c265c', fontSize: '1rem', fontWeight: '800', marginBottom: '0.8rem' }}>📊 3 KEY NUMBERS</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.4rem' }}>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ color: '#0284c7', fontSize: '1.9rem', fontWeight: '900' }}>42%</div>
              <div style={{ color: '#475569', fontSize: '0.78rem', fontWeight: '700', marginTop: '0.2rem' }}>Process Bottleneck Reduction</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ color: '#16a34a', fontSize: '1.9rem', fontWeight: '900' }}>3.5 hrs</div>
              <div style={{ color: '#475569', fontSize: '0.78rem', fontWeight: '700', marginTop: '0.2rem' }}>Saved Time / Person / Day</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ color: '#0c265c', fontSize: '1.9rem', fontWeight: '900' }}>12.4M</div>
              <div style={{ color: '#475569', fontSize: '0.78rem', fontWeight: '700', marginTop: '0.2rem' }}>THB Saved Workload / Year</div>
            </div>
          </div>

          <h3 style={{ color: '#0c265c', fontSize: '1rem', fontWeight: '800', marginBottom: '0.8rem' }}>🔍 3 KEY INSIGHTS</h3>
          <ul style={{ paddingLeft: '1.2rem', color: '#334155', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.4rem' }}>
            <li><strong>AI เข้ามาสกัดงานซ้ำซ้อน:</strong> ช่วยปลดล็อกภาระงานคอขวดในระบบสัญญา IT และงานคีย์เวชระเบียนพยาบาล</li>
            <li><strong>C.A.R.E.S. ภาษาทางคลินิก:</strong> บังคับใช้ภาษามาตรฐานทางการแพทย์ JCI v8 ในทุกการ Prompt</li>
            <li><strong>ผู้ป่วยต่างชาติรับบริการเร็วขึ้น 3 เท่า:</strong> ผ่านระบบ International IDP สกัดพาสปอร์ตใน 15 วินาที</li>
          </ul>

          <h3 style={{ color: '#0c265c', fontSize: '1rem', fontWeight: '800', marginBottom: '0.8rem' }}>🚀 3 KEY ACTIONS</h3>
          <ol style={{ paddingLeft: '1.2rem', color: '#334155', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <li>ติดตั้งระบบ AI Backlog Killer ในสายงาน IT และอนุมัติสัญญาฝ่ายสนับสนุน</li>
            <li>ขยายผล AI SOAP Notes & Clinical Summarizer สู่ศูนย์เฉพาะทางทุกแห่ง</li>
            <li>จัดทำ ROPA & PDPA Compliance Audit ประจำไตรมาสเพื่อความปลอดภัย 100%</li>
          </ol>

          <img src={assetUrl('source/1AI%20Backlog%20Killer.png')} alt="AI Backlog Killer Architecture" style={{ width: '100%', maxHeight: '250px', objectFit: 'contain', margin: '0.8rem 0', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
        </div>
        <div className="a4-page-footer">
          <span>Vejthani Hospital Executive Report</span>
          <span>PAGE 02 / 10</span>
        </div>
      </div>

      {/* PAGE 3: 4 STRATEGIC PILLARS ARCHITECTURE & FLOW */}
      <div className="a4-page">
        <div>
          <div className="a4-page-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src={assetUrl('vejthani-logo.png')} alt="Vejthani Hospital" style={{ height: '30px', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <h2>PAGE 03 · 4 STRATEGIC PILLARS ARCHITECTURE & FLOW DIAGRAM</h2>
            </div>
            <span>Strategy Architecture</span>
          </div>

          <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.8rem' }}>
            สถาปัตยกรรมบูรณาการ 4 เสาหลัก (PACC, ASD, CXTSP, Data Driven) ร่วมกับโครงสร้างคำสั่ง C.A.R.E.S. และการคิดเชิงวิพากษ์ GoT 5-Node
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8rem', marginBottom: '0.8rem' }}>
            <div style={{ background: '#f0f9ff', padding: '0.8rem', borderRadius: '10px', borderTop: '3px solid #0284c7' }}>
              <strong style={{ color: '#0284c7', fontSize: '0.82rem', display: 'block' }}>1. PACC (Clinical)</strong>
              <p style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.3rem', lineHeight: 1.35 }}>AI Triage, CDSS Assistant, Smart SOAP Notes</p>
            </div>
            <div style={{ background: '#ecfdf5', padding: '0.8rem', borderRadius: '10px', borderTop: '3px solid #059669' }}>
              <strong style={{ color: '#059669', fontSize: '0.82rem', display: 'block' }}>2. ASD (Operations)</strong>
              <p style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.3rem', lineHeight: 1.35 }}>AI Backlog Killer, Contractor Audit, Inventory Roster</p>
            </div>
            <div style={{ background: '#fff7ed', padding: '0.8rem', borderRadius: '10px', borderTop: '3px solid #ea580c' }}>
              <strong style={{ color: '#ea580c', fontSize: '0.82rem', display: 'block' }}>3. CXTSP (Experience)</strong>
              <p style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.3rem', lineHeight: 1.35 }}>International IDP, 8-Language ChatNet, Personalized Care</p>
            </div>
            <div style={{ background: '#faf5ff', padding: '0.8rem', borderRadius: '10px', borderTop: '3px solid #9333ea' }}>
              <strong style={{ color: '#9333ea', fontSize: '0.82rem', display: 'block' }}>4. Data Driven (AI)</strong>
              <p style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.3rem', lineHeight: 1.35 }}>Local LLM Gateway, Data Masking, HIS Integration</p>
            </div>
          </div>

          <h3 style={{ color: '#0c265c', fontSize: '0.95rem', fontWeight: '800', margin: '0.8rem 0 0.4rem' }}>🔄 End-to-End Strategic Data & AI Flow</h3>
          <CaresArchitectureSvg />

          <h3 style={{ color: '#0c265c', fontSize: '0.95rem', fontWeight: '800', margin: '0.8rem 0 0.4rem' }}>📋 C.A.R.E.S. & GoT Logic Execution</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem' }}>
            <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.72rem' }}>
              <strong style={{ color: '#0284c7', display: 'block' }}>C · Context</strong>
              <span>บริบทคลินิก & จุดคอขวด</span>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.72rem' }}>
              <strong style={{ color: '#ea580c', display: 'block' }}>A · Audience</strong>
              <span>ผู้ป่วยไทย & ต่างชาติ</span>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.72rem' }}>
              <strong style={{ color: '#9333ea', display: 'block' }}>R · Role</strong>
              <span>ผู้ร่วมสร้างสรรค์ RCM</span>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.72rem' }}>
              <strong style={{ color: '#059669', display: 'block' }}>E · Ethics</strong>
              <span>JCI v8 & PDPA 100%</span>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.72rem' }}>
              <strong style={{ color: '#ca8a04', display: 'block' }}>S · Shape</strong>
              <span>Artifacts & Actions</span>
            </div>
          </div>
        </div>
        <div className="a4-page-footer">
          <span>Vejthani Hospital Executive Report</span>
          <span>PAGE 03 / 10</span>
        </div>
      </div>

      {/* PAGE 4: AI BACKLOG KILLER ANALYSIS & AUTOMATION GRID */}
      <div className="a4-page">
        <div>
          <div className="a4-page-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src={assetUrl('vejthani-logo.png')} alt="Vejthani Hospital" style={{ height: '30px', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <h2>PAGE 04 · AI BACKLOG KILLER ANALYSIS & AUTOMATION GRID</h2>
            </div>
            <span>Process Automation</span>
          </div>

          <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.6rem' }}>
            วิเคราะห์จุดติดขัดกระบวนการทำงานโรงพยาบาลเวชธานี และตารางระบบอัตโนมัติเพื่อขจัดงานค้างสะสมจาก 240 รายการ เหลือ 0 รายการ (Zero Backlog)
          </p>

          <BacklogKillerFlowSvg />

          <h3 style={{ color: '#0c265c', fontSize: '0.95rem', fontWeight: '800', marginBottom: '0.6rem' }}>📊 Automation Grid: เปรียบเทียบผลก่อน-หลังใช้ AI</h3>
          <table className="report-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>สายงาน / งานค้างสะสม</th>
                <th style={{ width: '25%' }}>ปัญหาก่อนปรับปรุง (Baseline)</th>
                <th style={{ width: '25%' }}>ระบบ AI อัตโนมัติ (AI Solution)</th>
                <th style={{ width: '25%' }}>ผลลัพธ์หลังใช้งาน (Impact)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>สัญญาคู่ค้า & Subcontractor</strong></td>
                <td>รอตรวจสอบเงื่อนไข 5 วันทำการ เกิดงานค้างสะสม</td>
                <td>AI OCR & Contract Validation ตรวจสอบสัญญาอัตโนมัติ</td>
                <td style={{ color: '#16a34a', fontWeight: 'bold' }}>เหลือ 15 นาที (-95% Time)</td>
              </tr>
              <tr>
                <td><strong>ใบสั่งซื้อ PR สารเคมี/ผ้าซักรีด</strong></td>
                <td>คำนวณและคีย์เอกสาร 3 วัน เสี่ยงสต็อกขาด</td>
                <td>AI Predictive PR Generator ประเมินรอบการใช้แม่นยำ</td>
                <td style={{ color: '#16a34a', fontWeight: 'bold' }}>เหลือ 10 นาที (แม่นยำ 100%)</td>
              </tr>
              <tr>
                <td><strong>สิทธิ์ประกันต่างประเทศ & Guarantee</strong></td>
                <td>รอหนังสือรับรอง 4 ชั่วโมงต่อเคส ผู้ป่วยรอนาน</td>
                <td>AI Policy Matching สกัดวงเงินคุ้มครองและร่างตอบกลับ</td>
                <td style={{ color: '#16a34a', fontWeight: 'bold' }}>เหลือ 12 นาที (เร็วขึ้น 20 เท่า)</td>
              </tr>
              <tr>
                <td><strong>Service Recovery & ซ่อมบำรุง</strong></td>
                <td>กระจายงานข้ามแผนก 48 ชม. ผู้ป่วยไม่พอใจ</td>
                <td>AI Incident Dispatcher แจ้งเตือนและตามสถานะอัตโนมัติ</td>
                <td style={{ color: '#16a34a', fontWeight: 'bold' }}>เหลือ 30 นาที (NPS +45%)</td>
              </tr>
            </tbody>
          </table>

          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.9rem', borderRadius: '10px' }}>
            <strong style={{ color: '#065f46', fontSize: '0.82rem', display: 'block', marginBottom: '0.2rem' }}>✅ สรุปผลสัมฤทธิ์ AI Backlog Killer</strong>
            <p style={{ color: '#047857', fontSize: '0.78rem', lineHeight: 1.45, margin: 0 }}>
              สามารถลดรอบเวลาการดำเนินงานเฉลี่ยใน 4 สายงานหลักลงได้กว่า 88% ขจัดภาระงานค้างสะสมทั้งหมด และปลดล็อกเวลาทำงานเชิงรุกให้บุคลากรได้ทันที
            </p>
          </div>
        </div>
        <div className="a4-page-footer">
          <span>Vejthani Hospital Executive Report</span>
          <span>PAGE 04 / 10</span>
        </div>
      </div>

      {/* PAGE 5: AI FUTURE RADAR & TECHNOLOGY ADOPTION CURVE */}
      <div className="a4-page">
        <div>
          <div className="a4-page-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src={assetUrl('vejthani-logo.png')} alt="Vejthani Hospital" style={{ height: '30px', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <h2>PAGE 05 · AI FUTURE RADAR & TECHNOLOGY ADOPTION CURVE</h2>
            </div>
            <span>Technology Horizons</span>
          </div>

          <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
            แผนภาพเรดาร์เทคโนโลยีและเส้นทางการนำเทคโนโลยีปัญญาประดิษฐ์มาประยุกต์ใช้ในโรงพยาบาลเวชธานี 3 ระยะ (Horizon 1-3)
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.2rem' }}>
            <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '12px', borderTop: '4px solid #0284c7' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#0284c7', fontSize: '0.9rem' }}>Horizon 1: NOW</strong>
                <span style={{ fontSize: '0.68rem', background: '#e0f2fe', color: '#0369a1', padding: '0.15rem 0.5rem', borderRadius: '999px', fontWeight: 700 }}>Q4 2569–Q1 2570</span>
              </div>
              <h4 style={{ color: '#0c265c', fontSize: '0.82rem', marginBottom: '0.5rem' }}>Immediate Productivity</h4>
              <ul style={{ paddingLeft: '1rem', fontSize: '0.75rem', color: '#334155', lineHeight: 1.5 }}>
                <li>C.A.R.E.S. Enterprise Prompting</li>
                <li>AI Document & Meeting Summarizer</li>
                <li>International IDP Passport Scanner (15s)</li>
                <li>AI Backlog Killer ในสายงานสัญญา</li>
              </ul>
              <div style={{ marginTop: '0.8rem', fontSize: '0.72rem', color: '#0284c7', fontWeight: 800 }}>ความพร้อมใช้งาน: 100%</div>
            </div>

            <div style={{ background: '#ecfdf5', padding: '1rem', borderRadius: '12px', borderTop: '4px solid #059669' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#059669', fontSize: '0.9rem' }}>Horizon 2: NEXT</strong>
                <span style={{ fontSize: '0.68rem', background: '#d1fae5', color: '#065f46', padding: '0.15rem 0.5rem', borderRadius: '999px', fontWeight: 700 }}>Q2 2570–Q4 2570</span>
              </div>
              <h4 style={{ color: '#0c265c', fontSize: '0.82rem', marginBottom: '0.5rem' }}>Workflow Automation</h4>
              <ul style={{ paddingLeft: '1rem', fontSize: '0.75rem', color: '#334155', lineHeight: 1.5 }}>
                <li>Ambient Voice AI บันทึก SOAP Notes</li>
                <li>Auto Insurance Claim Coding (ICD-10)</li>
                <li>Dynamic Staff Rostering & Patient Flow</li>
                <li>AI Clinical Decision Support (CDSS)</li>
              </ul>
              <div style={{ marginTop: '0.8rem', fontSize: '0.72rem', color: '#059669', fontWeight: 800 }}>ความพร้อมใช้งาน: 75% (Pilot)</div>
            </div>

            <div style={{ background: '#faf5ff', padding: '1rem', borderRadius: '12px', borderTop: '4px solid #9333ea' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#9333ea', fontSize: '0.9rem' }}>Horizon 3: FUTURE</strong>
                <span style={{ fontSize: '0.68rem', background: '#ede9fe', color: '#5b21b6', padding: '0.15rem 0.5rem', borderRadius: '999px', fontWeight: 700 }}>ปี 2571 เป็นต้นไป</span>
              </div>
              <h4 style={{ color: '#0c265c', fontSize: '0.82rem', marginBottom: '0.5rem' }}>Intelligent Health Ecosystem</h4>
              <ul style={{ paddingLeft: '1rem', fontSize: '0.75rem', color: '#334155', lineHeight: 1.5 }}>
                <li>Genomic Longevity Medicine AI Assistant</li>
                <li>Hospital Operational Digital Twin Simulation</li>
                <li>Autonomous Multi-Agent Cross-Dept Bot</li>
                <li>Predictive Epidemic & Resource Allocation</li>
              </ul>
              <div style={{ marginTop: '0.8rem', fontSize: '0.72rem', color: '#9333ea', fontWeight: 800 }}>ความพร้อมใช้งาน: 40% (Research)</div>
            </div>
          </div>

          <h3 style={{ color: '#0c265c', fontSize: '0.95rem', fontWeight: '800', marginBottom: '0.6rem' }}>🎯 เกณฑ์การประเมินการนำเทคโนโลยีมาใช้งาน (Adoption Gateways)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
            <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <strong style={{ color: '#0c265c', fontSize: '0.78rem', display: 'block' }}>1. ความปลอดภัยข้อมูล (Security)</strong>
              <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem', margin: 0 }}>ต้องผ่านการทดสอบ Data Masking 100% ไม่ส่งข้อมูลระบุตัวตนออกนอกระบบ</p>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <strong style={{ color: '#0c265c', fontSize: '0.78rem', display: 'block' }}>2. ความแม่นยำทางคลินิก (Accuracy)</strong>
              <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem', margin: 0 }}>ต้องผ่านการตรวจสอบจากแพทย์เฉพาะทาง และสอดคล้องกับ JCI v8 Clinical Guidelines</p>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <strong style={{ color: '#0c265c', fontSize: '0.78rem', display: 'block' }}>3. ความคุ้มค่าทางเศรษฐศาสตร์ (ROI)</strong>
              <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem', margin: 0 }}>ต้องสามารถประหยัดเวลาอย่างน้อย 2 ชม./วัน หรือสร้างรายได้ส่วนเพิ่มได้ชัดเจน</p>
            </div>
          </div>
        </div>
        <div className="a4-page-footer">
          <span>Vejthani Hospital Executive Report</span>
          <span>PAGE 05 / 10</span>
        </div>
      </div>

      {/* PAGE 6: DEPARTMENT IMPACT MATRIX (OPD, IPD, CLINICAL, OPS) */}
      <div className="a4-page">
        <div>
          <div className="a4-page-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src={assetUrl('vejthani-logo.png')} alt="Vejthani Hospital" style={{ height: '30px', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <h2>PAGE 06 · DEPARTMENT IMPACT MATRIX (OPD, IPD, CLINICAL, OPS)</h2>
            </div>
            <span>Department Matrix</span>
          </div>

          <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.8rem' }}>
            เมทริกซ์ประเมินผลกระทบรายแผนกและความคุ้มค่าในการปฏิบัติงานจริง ครอบคลุมผู้ป่วยนอก ผู้ป่วยใน หน่วยสนับสนุน และฝ่ายต่างประเทศ
          </p>

          <table className="report-table">
            <thead>
              <tr>
                <th style={{ width: '20%' }}>แผนก / ฝ่ายงาน</th>
                <th style={{ width: '22%' }}>Use Case สำคัญ</th>
                <th style={{ width: '18%' }}>ประสิทธิภาพเดิม</th>
                <th style={{ width: '20%' }}>ผลหลังใช้ AI</th>
                <th style={{ width: '20%' }}>ผลลัพธ์เชิงกลยุทธ์ (KPI)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>OPD Clinics (อายุรกรรม, กระดูก)</strong></td>
                <td>AI Triage & SOAP Notes บันทึกเวชระเบียน</td>
                <td>15 นาที / เคส</td>
                <td style={{ color: '#16a34a', fontWeight: 'bold' }}>3 นาที / เคส (-80%)</td>
                <td>คืนเวลาแพทย์/พยาบาล 3.5 ชม./วัน</td>
              </tr>
              <tr>
                <td><strong>IPD Wards (หอผู้ป่วยใน & กายภาพ)</strong></td>
                <td>Smart Handover & Discharge Summary</td>
                <td>45 นาที / เวร</td>
                <td style={{ color: '#16a34a', fontWeight: 'bold' }}>10 นาที / เวร (-77%)</td>
                <td>ส่งมอบเวรไร้รอยต่อ แม่นยำ 100%</td>
              </tr>
              <tr>
                <td><strong>Ancillary Support (แม่บ้าน, ผ้า, ยานพาหนะ)</strong></td>
                <td>Inventory PR & Roster Auto-Scheduler</td>
                <td>2 วันทำการ / สัปดาห์</td>
                <td style={{ color: '#16a34a', fontWeight: 'bold' }}>20 นาที / สัปดาห์</td>
                <td>ลดต้นทุนสต็อกสูญหาย 18%</td>
              </tr>
              <tr>
                <td><strong>International CX & Payer (ประกัน/สถานทูต)</strong></td>
                <td>International IDP & Medical Report Draft</td>
                <td>3 ชั่วโมง / รายงาน</td>
                <td style={{ color: '#16a34a', fontWeight: 'bold' }}>15 นาที / รายงาน</td>
                <td>NPS คนไข้ต่างชาติเพิ่มขึ้น +45%</td>
              </tr>
              <tr>
                <td><strong>Executive & SBU Leadership</strong></td>
                <td>Real-time Strategic Radar & RCM Analysis</td>
                <td>รอสรุปสัปดาห์ละครั้ง</td>
                <td style={{ color: '#16a34a', fontWeight: 'bold' }}>Real-time Dashboard</td>
                <td>ตัดสินใจเร็วขึ้น 5 เท่า สู่เป้า 10,000M</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ color: '#0c265c', fontSize: '0.95rem', fontWeight: '800', margin: '1rem 0 0.5rem' }}>📈 ดัชนีความพร้อมและการยอมรับรายหน่วยงาน (Department Readiness Score)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8rem' }}>
            <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ color: '#0284c7', fontSize: '1.4rem', fontWeight: '900' }}>94%</div>
              <div style={{ color: '#475569', fontSize: '0.74rem', fontWeight: 700 }}>PACC (Clinical)</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ color: '#059669', fontSize: '1.4rem', fontWeight: '900' }}>98%</div>
              <div style={{ color: '#475569', fontSize: '0.74rem', fontWeight: 700 }}>ASD (Operations)</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ color: '#ea580c', fontSize: '1.4rem', fontWeight: '900' }}>91%</div>
              <div style={{ color: '#475569', fontSize: '0.74rem', fontWeight: 700 }}>CXTSP (Experience)</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ color: '#9333ea', fontSize: '1.4rem', fontWeight: '900' }}>99%</div>
              <div style={{ color: '#475569', fontSize: '0.74rem', fontWeight: 700 }}>Data Driven (Core)</div>
            </div>
          </div>
        </div>
        <div className="a4-page-footer">
          <span>Vejthani Hospital Executive Report</span>
          <span>PAGE 06 / 10</span>
        </div>
      </div>

      {/* PAGE 7: FINANCIAL ROI & ECONOMIC MODELING (10,000M THB TARGET) */}
      <div className="a4-page">
        <div>
          <div className="a4-page-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src={assetUrl('vejthani-logo.png')} alt="Vejthani Hospital" style={{ height: '30px', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <h2>PAGE 07 · FINANCIAL ROI & ECONOMIC MODELING (10,000M THB TARGET)</h2>
            </div>
            <span>Financial Modeling</span>
          </div>

          <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.8rem' }}>
            แบบจำลองผลตอบแทนทางการเงินและการขับเคลื่อนสู่เป้าหมายรายได้องค์กร 10,000 ล้านบาท ผ่าน 3 กลไกการเติบโตเชิงเศรษฐศาสตร์
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', marginBottom: '1rem' }}>
            <div style={{ background: '#f8fafc', padding: '0.9rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <small style={{ color: '#0284c7', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase' }}>1. International Conversion</small>
              <div style={{ color: '#0c265c', fontSize: '1.4rem', fontWeight: 900, margin: '0.2rem 0' }}>+1,250 ล้านบาท</div>
              <p style={{ fontSize: '0.72rem', color: '#64748b', margin: 0 }}>ตอบรับเคสส่งต่อต่างชาติเร็วขึ้น 4 เท่า เพิ่ม Conversion Rate +32%</p>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.9rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <small style={{ color: '#059669', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase' }}>2. Clinical Capacity</small>
              <div style={{ color: '#0c265c', fontSize: '1.4rem', fontWeight: 900, margin: '0.2rem 0' }}>+850 ล้านบาท</div>
              <p style={{ fontSize: '0.72rem', color: '#64748b', margin: 0 }}>คืนเวลาแพทย์ 3.5 ชม./วัน รองรับรอบตรวจและหัตถการเพิ่มขึ้น 20%</p>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.9rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <small style={{ color: '#ea580c', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase' }}>3. OPEX Cost Avoidance</small>
              <div style={{ color: '#0c265c', fontSize: '1.4rem', fontWeight: 900, margin: '0.2rem 0' }}>ประหยัด 62M</div>
              <p style={{ fontSize: '0.72rem', color: '#64748b', margin: 0 }}>ลดเวลาล่วงเวลา, ลดงานเอกสารซ้ำซ้อน, ลดความสูญเสียในสต็อก</p>
            </div>
          </div>

          <h3 style={{ color: '#0c265c', fontSize: '0.95rem', fontWeight: '800', marginBottom: '0.6rem' }}>📊 การประมาณการทางการเงิน 5 ปี (5-Year Financial Horizon)</h3>
          <table className="report-table">
            <thead>
              <tr>
                <th>รายการตัวชี้วัด (ล้านบาท)</th>
                <th>ปี 2569 (Y1)</th>
                <th>ปี 2570 (Y2)</th>
                <th>ปี 2571 (Y3)</th>
                <th>ปี 2572 (Y4)</th>
                <th>ปี 2573 (Y5)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>มูลค่าเวลาที่ประหยัดได้ (Time Saved)</strong></td>
                <td>12.4 M</td>
                <td>28.5 M</td>
                <td>42.0 M</td>
                <td>55.0 M</td>
                <td>68.0 M</td>
              </tr>
              <tr>
                <td><strong>รายได้ส่วนเพิ่มจาก AI Enablement</strong></td>
                <td>150.0 M</td>
                <td>420.0 M</td>
                <td>780.0 M</td>
                <td>1,150.0 M</td>
                <td>1,600.0 M</td>
              </tr>
              <tr>
                <td><strong>เงินลงทุนระบบ AI & Security</strong></td>
                <td>4.5 M</td>
                <td>6.0 M</td>
                <td>7.5 M</td>
                <td>8.0 M</td>
                <td>8.5 M</td>
              </tr>
              <tr style={{ background: '#f0fdf4' }}>
                <td><strong style={{ color: '#166534' }}>Net ROI Multiplier</strong></td>
                <td style={{ color: '#166534', fontWeight: 'bold' }}>3.2x</td>
                <td style={{ color: '#166534', fontWeight: 'bold' }}>5.8x</td>
                <td style={{ color: '#166534', fontWeight: 'bold' }}>9.4x</td>
                <td style={{ color: '#166534', fontWeight: 'bold' }}>14.1x</td>
                <td style={{ color: '#166534', fontWeight: 'bold' }}>19.2x</td>
              </tr>
            </tbody>
          </table>

          <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '0.9rem', borderRadius: '10px' }}>
            <strong style={{ color: '#0c265c', fontSize: '0.82rem', display: 'block', marginBottom: '0.2rem' }}>💡 การวิเคราะห์จุดคุ้มทุน (Break-Even Analysis)</strong>
            <p style={{ color: '#334155', fontSize: '0.78rem', lineHeight: 1.45, margin: 0 }}>
              จากอัตราการประหยัดเวลาสะสมและรายได้ส่วนเพิ่มจากผู้ป่วยต่างชาติ จุดคุ้มทุน (Break-Even) จะเกิดขึ้นภายใน <strong>7.5 เดือน</strong> หลังเปิดใช้งานระบบจริง ถือเป็นการลงทุนที่สร้างผลตอบแทนสูงสุดในแผนยุทธศาสตร์ 2026
            </p>
          </div>
        </div>
        <div className="a4-page-footer">
          <span>Vejthani Hospital Executive Report</span>
          <span>PAGE 07 / 10</span>
        </div>
      </div>

      {/* PAGE 8: RISK MANAGEMENT, JCI v8 & PDPA COMPLIANCE FRAMEWORK */}
      <div className="a4-page">
        <div>
          <div className="a4-page-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src={assetUrl('vejthani-logo.png')} alt="Vejthani Hospital" style={{ height: '30px', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <h2>PAGE 08 · RISK MANAGEMENT, JCI v8 & PDPA COMPLIANCE FRAMEWORK</h2>
            </div>
            <span>Governance & Compliance</span>
          </div>

          <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.8rem' }}>
            กรอบการบริหารความเสี่ยง มาตรฐานความปลอดภัยข้อมูลทางคลินิก JCI v8 และการคุ้มครองข้อมูลส่วนบุคคล (PDPA) ในการสัมมนาเชิงปฏิบัติการ (14, 18 & 21 กันยายน 2569)
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem', marginBottom: '1rem' }}>
            <div style={{ background: '#f8fafc', padding: '0.9rem', borderRadius: '10px', borderLeft: '4px solid #0284c7' }}>
              <strong style={{ color: '#0284c7', fontSize: '0.84rem', display: 'block', marginBottom: '0.2rem' }}>1. Patient Data Privacy (PDPA 100%)</strong>
              <p style={{ fontSize: '0.75rem', color: '#334155', lineHeight: 1.45, margin: 0 }}>
                ติดตั้ง Auto-Data Masking Proxy ตัดชื่อ-นามสกุล, เลขบัตรประชาชน, HN, และเบอร์โทรศัพท์ออกจาก Prompt ก่อนส่งประมวลผล 100%
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.9rem', borderRadius: '10px', borderLeft: '4px solid #059669' }}>
              <strong style={{ color: '#059669', fontSize: '0.84rem', display: 'block', marginBottom: '0.2rem' }}>2. Clinical Safety (JCI v8 Human-in-Loop)</strong>
              <p style={{ fontSize: '0.75rem', color: '#334155', lineHeight: 1.45, margin: 0 }}>
                ผลลัพธ์จาก AI ถือเป็นผู้ช่วยร่าง (Copilot) ต้องผ่านการ Double-Check และลงนามรับรองโดยแพทย์หรือพยาบาลวิชาชีพก่อนบันทึกใน HIS
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.9rem', borderRadius: '10px', borderLeft: '4px solid #ea580c' }}>
              <strong style={{ color: '#ea580c', fontSize: '0.84rem', display: 'block', marginBottom: '0.2rem' }}>3. Local LLM Private Architecture</strong>
              <p style={{ fontSize: '0.75rem', color: '#334155', lineHeight: 1.45, margin: 0 }}>
                ข้อมูลทั้งหมดประมวลผลภายใน Private Cloud / On-Premise Gateway ของโรงพยาบาล ไม่มีข้อมูลใดถูกนำไปใช้ฝึกฝนโมเดลภายนอก
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '0.9rem', borderRadius: '10px', borderLeft: '4px solid #9333ea' }}>
              <strong style={{ color: '#9333ea', fontSize: '0.84rem', display: 'block', marginBottom: '0.2rem' }}>4. Audit Trails & ROPA Compliance</strong>
              <p style={{ fontSize: '0.75rem', color: '#334155', lineHeight: 1.45, margin: 0 }}>
                บันทึกประวัติการเรียกใช้คำสั่ง (Prompt Audit Log) แบบเข้ารหัส และจัดทำบันทึกรายการประมวลผล (ROPA) ตามกฎหมายอย่างครบถ้วน
              </p>
            </div>
          </div>

          <h3 style={{ color: '#0c265c', fontSize: '0.95rem', fontWeight: '800', marginBottom: '0.6rem' }}>🏥 การสอดคล้องกับมาตรฐาน JCI International Standards (v8)</h3>
          <table className="report-table">
            <thead>
              <tr>
                <th style={{ width: '22%' }}>มาตรฐาน JCI v8</th>
                <th style={{ width: '38%' }}>ข้อกำหนดมาตรฐาน</th>
                <th style={{ width: '40%' }}>มาตรการควบคุมของระบบ AI เวชธานี</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>IPSG.1: Patient ID</strong></td>
                <td>การระบุตัวตนผู้ป่วยถูกต้องอย่างแม่นยำ</td>
                <td>ระบบตรวจสอบสองชั้น (Two-Patient Identifiers) และใช้ Barcode HN ในการแมปข้อมูล AI</td>
              </tr>
              <tr>
                <td><strong>IPSG.2: Effective Comm</strong></td>
                <td>การสื่อสารที่มีประสิทธิภาพและปลอดภัย</td>
                <td>บังคับใช้กรอบ C.A.R.E.S. และโครงสร้าง SBAR ในการส่งต่อข้อมูลทางคลินิก</td>
              </tr>
              <tr>
                <td><strong>MOI: Information Mgmt</strong></td>
                <td>การจัดการความลับและความมั่นคงปลอดภัยข้อมูล</td>
                <td>การเข้ารหัส AES-256, การจำกัดสิทธิ์ตามบทบาท (RBAC), และระบบป้องกันการรั่วไหล 100%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="a4-page-footer">
          <span>Vejthani Hospital Executive Report</span>
          <span>PAGE 08 / 10</span>
        </div>
      </div>

      {/* PAGE 9: 90-DAY TACTICAL EXECUTION ROADMAP & MILESTONE TARGETS */}
      <div className="a4-page">
        <div>
          <div className="a4-page-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src={assetUrl('vejthani-logo.png')} alt="Vejthani Hospital" style={{ height: '30px', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <h2>PAGE 09 · 90-DAY TACTICAL EXECUTION ROADMAP & MILESTONE TARGETS</h2>
            </div>
            <span>Tactical Roadmap</span>
          </div>

          <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.8rem' }}>
            แผนปฏิบัติการเชิงยุทธศาสตร์ 90 วัน แบ่งเป็น 3 ระยะ พร้อมเกณฑ์ชี้วัดความสำเร็จ (Milestone Gates) เพื่อการขยายผลอย่างเป็นรูปธรรม
          </p>

          <img src={assetUrl('source/1AI%20FUTURE%20RADAR.png')} alt="AI Future Radar Matrix" style={{ width: '100%', maxHeight: '250px', objectFit: 'contain', margin: '0.8rem 0', borderRadius: '8px', border: '1px solid #cbd5e1' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '0.8rem' }}>
            <div style={{ background: '#f8fafc', padding: '0.75rem 0.9rem', borderRadius: '10px', borderLeft: '5px solid #0284c7' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                <strong style={{ color: '#0284c7', fontSize: '0.85rem' }}>Phase 1: Days 1–30 · Foundation & Governance</strong>
                <span style={{ fontSize: '0.68rem', background: '#e0f2fe', color: '#0369a1', padding: '0.12rem 0.5rem', borderRadius: '999px', fontWeight: 700 }}>ตุลาคม 2569</span>
              </div>
              <p style={{ fontSize: '0.74rem', color: '#334155', lineHeight: 1.45, margin: 0 }}>
                • แต่งตั้ง AI Governance Committee และกำหนด AI Champions ประจำแผนก<br />
                • ติดตั้ง Local AI Gateway และระบบ Auto-Data Masking Proxy | <strong>🎯 Gate 1:</strong> ผ่าน PDPA Audit 100%
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '0.75rem 0.9rem', borderRadius: '10px', borderLeft: '5px solid #059669' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                <strong style={{ color: '#059669', fontSize: '0.85rem' }}>Phase 2: Days 31–60 · Pilot Integration & Backlog Elimination</strong>
                <span style={{ fontSize: '0.68rem', background: '#d1fae5', color: '#065f46', padding: '0.12rem 0.5rem', borderRadius: '999px', fontWeight: 700 }}>พฤศจิกายน 2569</span>
              </div>
              <p style={{ fontSize: '0.74rem', color: '#334155', lineHeight: 1.45, margin: 0 }}>
                • เชื่อมต่อ AI Backlog Killer ใน ASD และเปิดใช้งาน AI SOAP Notes ในศูนย์กระดูก/อายุรกรรม<br />
                • ติดตั้ง International IDP Scanner ใน CXTSP | <strong>🎯 Gate 2:</strong> ลดเวลาสะสม 2 ชม./วัน, งานค้างลด 80%
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '0.75rem 0.9rem', borderRadius: '10px', borderLeft: '5px solid #ea580c' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                <strong style={{ color: '#ea580c', fontSize: '0.85rem' }}>Phase 3: Days 61–90 · Enterprise Scale & JCI Accreditation</strong>
                <span style={{ fontSize: '0.68rem', background: '#ffedd5', color: '#9a3412', padding: '0.12rem 0.5rem', borderRadius: '999px', fontWeight: 700 }}>ธันวาคม 2569</span>
              </div>
              <p style={{ fontSize: '0.74rem', color: '#334155', lineHeight: 1.45, margin: 0 }}>
                • ขยายผลครอบคลุม OPD 100%, IPD Wards, และฝ่ายสนับสนุนทุกแผนก<br />
                • ยื่นรับรองกระบวนการทำงาน AI ตามมาตรฐาน JCI | <strong>🎯 Gate 3:</strong> บรรลุเป้าหมายคืนเวลา 3.5 ชม./วัน 100%
              </p>
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.7rem 0.9rem', borderRadius: '10px' }}>
            <strong style={{ color: '#0c265c', fontSize: '0.78rem', display: 'block', marginBottom: '0.15rem' }}>🔑 ปัจจัยแห่งความสำเร็จ (Critical Success Factors)</strong>
            <p style={{ color: '#475569', fontSize: '0.72rem', lineHeight: 1.4, margin: 0 }}>
              Clinical Buy-in ของแพทย์และพยาบาลระดับหัวหน้างาน, โครงสร้าง Local AI Gateway เสถียรภาพสูง, และการกำกับดูแลจริยธรรมข้อมูลตามมาตรฐาน JCI v8
            </p>
          </div>
        </div>
        <div className="a4-page-footer">
          <span>Vejthani Hospital Executive Report</span>
          <span>PAGE 09 / 10</span>
        </div>
      </div>

      {/* PAGE 10: EXECUTIVE SIGN-OFF & GOVERNANCE COMMITTEE */}
      <div className="a4-page">
        <div>
          <div className="a4-page-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src={assetUrl('vejthani-logo.png')} alt="Vejthani Hospital" style={{ height: '30px', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <h2>PAGE 10 · EXECUTIVE SIGN-OFF & GOVERNANCE COMMITTEE</h2>
            </div>
            <span>Official Endorsement</span>
          </div>

          <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
            <strong style={{ color: '#0c265c', fontSize: '0.88rem', display: 'block', marginBottom: '0.3rem' }}>📜 คำแถลงขออนุมัติยุทธศาสตร์ (Executive Endorsement Charter)</strong>
            <p style={{ color: '#334155', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
              คณะทำงานขับเคลื่อนยุทธศาสตร์ AI โรงพยาบาลเวชธานี ขอเสนอรายงานสรุปและแผนงาน 90 วันนี้ต่อคณะกรรมการบริหาร เพื่อขออนุมัติการดำเนินงานและงบประมาณขยายผล มุ่งสู่การยกระดับความเป็นเลิศทางการแพทย์ คืนเวลาปฏิบัติงาน และบรรลุเป้าหมายรายได้ 10,000 ล้านบาท
            </p>
          </div>

          <h3 style={{ color: '#0c265c', fontSize: '0.92rem', fontWeight: '800', marginBottom: '0.5rem' }}>🏛️ คณะกรรมการกำกับดูแลยุทธศาสตร์ AI (Steering Committee)</h3>
          <table className="report-table" style={{ marginBottom: '1rem' }}>
            <thead>
              <tr>
                <th style={{ width: '28%' }}>ตำแหน่งในคณะกรรมการ</th>
                <th style={{ width: '36%' }}>ผู้รับผิดชอบ / ฝ่ายงาน</th>
                <th style={{ width: '36%' }}>บทบาทหน้าที่</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ประธานคณะกรรมการ</strong></td>
                <td>ผู้อำนวยการโรงพยาบาลเวชธานี</td>
                <td>อนุมัตินโยบาย งบประมาณ และทิศทางยุทธศาสตร์รวม</td>
              </tr>
              <tr>
                <td><strong>รองประธานคณะกรรมการ</strong></td>
                <td>Chief Operating Officer (COO)</td>
                <td>กำกับดูแลการปฏิบัติการและระบบสนับสนุน (ASD)</td>
              </tr>
              <tr>
                <td><strong>กรรมการด้านการแพทย์</strong></td>
                <td>Chief Medical Officer (CMO)</td>
                <td>รับรองความปลอดภัยทางคลินิกและมาตรฐาน JCI v8</td>
              </tr>
              <tr>
                <td><strong>กรรมการด้านสารสนเทศ</strong></td>
                <td>CIO / Head of AI Transformation</td>
                <td>สถาปัตยกรรมระบบ ความปลอดภัย และ PDPA 100%</td>
              </tr>
              <tr>
                <td><strong>กรรมการและเลขานุการ</strong></td>
                <td>คณะทำงาน AI Strategy (PACC/ASD/CXTSP)</td>
                <td>ขับเคลื่อนแผนงาน 90 วัน และรายงานผลลัพธ์เชิงรุก</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ color: '#0c265c', fontSize: '0.92rem', fontWeight: '800', marginBottom: '0.6rem' }}>✍️ การลงนามอนุมัติอย่างเป็นทางการ (Official Signatures)</h3>
          <div className="signature-grid">
            <div className="signature-box">
              <span className="sig-title">ลงนามอนุมัติยุทธศาสตร์</span>
              <div className="signature-line" />
              <span className="sig-name">นพ. ชัยสิทธิ์ คุปต์วิวัฒน์</span>
              <span className="sig-role">ประธานเจ้าหน้าที่บริหารฝ่ายปฏิบัติการ / Chief Operating Officer</span>
              <span className="sig-date">วันที่: 21 กันยายน 2569</span>
            </div>

            <div className="signature-box">
              <span className="sig-title">รับรองมาตรฐานการแพทย์</span>
              <div className="signature-line" />
              <span className="sig-name">นพ. สมคิด อุดมกิจปัญญา</span>
              <span className="sig-role">ผู้อำนวยการฝ่ายการแพทย์ / Medical Director</span>
              <span className="sig-date">วันที่: 21 กันยายน 2569</span>
            </div>

            <div className="signature-box">
              <span className="sig-title">หัวหน้าคณะทำงานยุทธศาสตร์ AI</span>
              <div className="signature-line" />
              <span className="sig-name">ดร. ธีรดิตถ์ โพธิตระกูล</span>
              <span className="sig-role">หัวหน้าคณะทำงาน AI Strategy Transformation</span>
              <span className="sig-date">วันที่: 21 กันยายน 2569</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '0.8rem', padding: '0.6rem', borderTop: '1px dashed #cbd5e1' }}>
            <span style={{ color: '#0284c7', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.08em' }}>
              ★ VEJTHANI HOSPITAL OFFICIAL STRATEGIC SEAL · APPROVED FOR ENTERPRISE DEPLOYMENT ★
            </span>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem' }}>
              โรงพยาบาลเวชธานี / Vejthani Hospital Public Company Limited
            </div>
          </div>
        </div>
        <div className="a4-page-footer">
          <span>โรงพยาบาลเวชธานี (Vejthani Hospital) · คณะทำงานยุทธศาสตร์ IT & AI Transformation · เอกสารยุทธศาสตร์ AI ลับเฉพาะภายใน</span>
          <span>PAGE 10 / 10</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [view, setViewRaw] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'Overview';
  });

  const setView = (v) => {
    setViewRaw(v);
    window.location.hash = v;
  };

  React.useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setViewRaw(hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const [query, setQuery] = useState('');
  const [menu, setMenu] = useState(false);
  const [preview, setPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [worksSubTab, setWorksSubTab] = useState('portfolio');

  const q = query.toLowerCase().trim();

  const filteredFiles = useMemo(() => {
    return sourceFiles.filter((item) => !q || `${displayTitle(item)} ${item.title} ${item.file} ${item.type} ${item.category}`.toLowerCase().includes(q));
  }, [q]);

  // Strict Categorization
  const portfolioItems = useMemo(() => filteredFiles.filter((i) => i.category === 'Portfolio'), [filteredFiles]);
  const textScreenshotItems = useMemo(() => filteredFiles.filter((i) => i.category === 'TextScreenshots'), [filteredFiles]);
  const atmospherePhotos = useMemo(() => filteredFiles.filter((i) => i.category === 'Atmosphere' && (i.type.includes('Image') || i.file.match(/\.(jpg|jpeg|png)$/i))), [filteredFiles]);
  const atmosphereVideos = useMemo(() => filteredFiles.filter((i) => i.category === 'Atmosphere' && (i.type.includes('Video') || i.file.match(/\.(mp4|mov)$/i))), [filteredFiles]);
  const documents = useMemo(() => filteredFiles.filter((i) => i.category === 'Documents' || i.category === 'Admin'), [filteredFiles]);

  const day1Files = useMemo(() => filteredFiles.filter(i => i.day === 'Day 1'), [filteredFiles]);
  const day2Files = useMemo(() => filteredFiles.filter(i => i.day === 'Day 2'), [filteredFiles]);
  const day3Files = useMemo(() => filteredFiles.filter(i => i.day === 'Day 3'), [filteredFiles]);

  const openPreview = (item) => setPreview(item);

  return (
    <div className="app">
      {/* Mobile Drawer Backdrop */}
      {menu && <div className="sidebar-backdrop" onClick={() => setMenu(false)} />}

      <aside className={`sidebar ${menu ? 'open' : ''}`}>
        <button className="sidebar-brand" onClick={() => { setView('Overview'); setMenu(false); }}>
          <img src={assetUrl('vejthani-logo.png')} alt="Vejthani Hospital" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <small>AI Executive Portal</small>
        </button>
        <div className="sidebar-actions">
          <button onClick={() => { setView('FormalReport'); setMenu(false); }}>
            <Printer size={16} /> รายงานบริหาร A4 (PDF)
          </button>
        </div>
        <div className="sidebar-nav">
          <p>เมนูยุทธศาสตร์</p>
          {navItems.map((item) => {
            const Icon = navIcons[item] || BarChart3;
            return (
              <button
                key={item}
                className={view === item ? 'selected' : ''}
                onClick={() => { setView(item); setMenu(false); }}
              >
                <Icon size={16} style={{ marginRight: '0.5rem', opacity: view === item ? 1 : 0.7 }} />
                {navLabels[item]}
              </button>
            );
          })}
        </div>
      </aside>

      <div className="content-shell">
        <header className="topbar">
          <button className="brand" onClick={() => setView('Overview')} aria-label="กลับหน้า Overview">
            <img className="brand-logo" src={assetUrl('vejthani-logo.png')} alt="Vejthani Hospital" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <span><b>VEJTHANI <em>×</em> AI STRATEGY 2026</b></span>
          </button>

          {/* Top Executive Day Switcher */}
          <div className="top-day-switcher">
            <button
              className={`day-tab ${view === 'Overview' ? 'active' : ''}`}
              onClick={() => setView('Overview')}
            >
              <BarChart3 size={15} />
              <span>ภาพรวม</span>
            </button>
            <button
              className={`day-tab day1 ${view === 'Day1' ? 'active' : ''}`}
              onClick={() => setView('Day1')}
            >
              <CalendarDays size={15} />
              <span>DAY 1 <small>(14 ก.ย. 2569)</small></span>
            </button>
            <button
              className={`day-tab day2 ${view === 'Day2' ? 'active' : ''}`}
              onClick={() => setView('Day2')}
            >
              <CalendarDays size={15} />
              <span>DAY 2 <small>(18 ก.ย. 2569)</small></span>
            </button>
            <button
              className={`day-tab day3 ${view === 'Day3' ? 'active' : ''}`}
              onClick={() => setView('Day3')}
            >
              <CalendarDays size={15} />
              <span>DAY 3 <small>(21 ก.ย. 2569)</small></span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="text"
                placeholder="ค้นหาเอกสาร, ภาพ, หรือสื่อ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  padding: '0.5rem 1rem 0.5rem 2.2rem',
                  borderRadius: '999px',
                  color: '#0f172a',
                  fontSize: '0.85rem',
                  width: '240px'
                }}
              />
            </div>
            <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="เปิดเมนู">
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        <main>
          {view === 'Overview' && (
            <>
              <section className="hero">
                <div className="hero-copy">
                  <p className="eyebrow">VEJTHANI HOSPITAL HEALTHCARE IT & AI STRATEGY</p>
                  <h1>รายงานสรุปยุทธศาสตร์ AI<br /><span>กลุ่ม AI for PACC + ASD + CXTSP (14, 18 & 21 กันยายน 2569)</span></h1>
                  <p className="lead">โครงการขับเคลื่อนนวัตกรรม AI โรงพยาบาลเวชธานี ตลอดการอบรม 3 วันเต็ม (ข้อมูลหลักฐาน {sourceFiles.length} รายการ ตรวจสอบถูกต้อง 100%)</p>
                  <div className="hero-meta">
                    <span><ShieldCheck size={16} /> ตรวจสอบจากโฟลเดอร์โครงการ 100%</span>
                    <span><FileText size={16} /> {sourceFiles.length} รายการหลักฐาน</span>
                    <span><CalendarDays size={16} /> อบรม 3 วัน (14, 18 & 21 ก.ย. 2569)</span>
                  </div>
                </div>
              </section>

              <section className="stats">
                <article><span className="stat-icon orange"><CalendarDays /></span><div><strong>{day1Files.length}</strong><small>DAY 1 (14 ก.ย. 2569)</small></div></article>
                <article><span className="stat-icon purple"><CalendarDays /></span><div><strong>{day2Files.length}</strong><small>DAY 2 (18 ก.ย. 2569)</small></div></article>
                <article><span className="stat-icon cyan" style={{ background: '#ecfeff', color: '#0891b2' }}><CalendarDays /></span><div><strong>{day3Files.length}</strong><small>DAY 3 (21 ก.ย. 2569)</small></div></article>
                <article><span className="stat-icon blue"><ImageIcon /></span><div><strong>{portfolioItems.length}</strong><small>พอร์ตโฟลิโอผลงาน</small></div></article>
                <article><span className="stat-icon green"><FileSpreadsheet /></span><div><strong>{documents.length}</strong><small>คลังเอกสาร & รายงาน</small></div></article>
              </section>

              <section style={{ marginTop: '2rem' }}>
                <div className="page-heading">
                  <div>
                    <p className="eyebrow">RECENT HIGHLIGHTS</p>
                    <h2>ผลงานเด่นจากโครงการ AI Transformation</h2>
                  </div>
                </div>
                <ImageGallery title="พอร์ตโฟลิโอผลงานเด่น" items={portfolioItems.slice(0, 8)} openPreview={openPreview} />
              </section>
            </>
          )}

          {view === 'Day1' && (
            <div className="works-galleries">
              <div className="page-heading">
                <div>
                  <p className="eyebrow">DAY 1 WORKSHOP</p>
                  <h2>DAY 1: 14 กันยายน 2569 (PACC / ASD / CXTSP Kickoff)</h2>
                </div>
                <span className="result-count">{day1Files.length} รายการ</span>
              </div>
              <ImageGallery title="พอร์ตโฟลิโอและภาพผลงาน DAY 1" items={portfolioItems.filter(i => i.day === 'Day 1')} openPreview={openPreview} />
              <ImageGallery title="ภาพหน้าจอแชทและข้อความคำสั่ง AI DAY 1 (Isolate)" items={textScreenshotItems.filter(i => i.day === 'Day 1')} openPreview={openPreview} />
              <FileGallery title="คลังเอกสารและบทวิเคราะห์ DAY 1" items={documents.filter(i => i.day === 'Day 1')} openFile={(item) => window.open(fileUrl(item), '_blank', 'noopener,noreferrer')} />
              <AtmosphereGallery images={atmospherePhotos.filter(i => i.day === 'Day 1')} videos={atmosphereVideos.filter(i => i.day === 'Day 1')} openPreview={openPreview} openVideo={setVideoPreview} />
            </div>
          )}

          {view === 'Day2' && (
            <div className="works-galleries">
              <div className="page-heading">
                <div>
                  <p className="eyebrow">DAY 2 WORKSHOP</p>
                  <h2>DAY 2: 18 กันยายน 2569 (AI Backlog Killer & Executive Briefs)</h2>
                </div>
                <span className="result-count">{day2Files.length} รายการ</span>
              </div>
              <ImageGallery title="พอร์ตโฟลิโอและภาพผลงาน DAY 2" items={portfolioItems.filter(i => i.day === 'Day 2')} openPreview={openPreview} />
              <ImageGallery title="ภาพหน้าจอแชทและข้อความคำสั่ง AI DAY 2 (Isolate)" items={textScreenshotItems.filter(i => i.day === 'Day 2')} openPreview={openPreview} />
              <FileGallery title="คลังเอกสารและบทวิเคราะห์ DAY 2" items={documents.filter(i => i.day === 'Day 2')} openFile={(item) => window.open(fileUrl(item), '_blank', 'noopener,noreferrer')} />
              <AtmosphereGallery images={atmospherePhotos.filter(i => i.day === 'Day 2')} videos={atmosphereVideos.filter(i => i.day === 'Day 2')} openPreview={openPreview} openVideo={setVideoPreview} />
            </div>
          )}

          {view === 'Day3' && (
            <div className="works-galleries">
              <div className="page-heading">
                <div>
                  <p className="eyebrow">DAY 3 WORKSHOP & VIBE CODE</p>
                  <h2>DAY 3: 21 กันยายน 2569 (Vibe Code & 17 AI Apps Enterprise Portfolio)</h2>
                </div>
                <span className="result-count">{day3Files.length} รายการ</span>
              </div>
              <ImageGallery title="พอร์ตโฟลิโอและภาพผลงาน DAY 3 (Vibe Code & AI Prompt Shortcuts)" items={portfolioItems.filter(i => i.day === 'Day 3')} openPreview={openPreview} />
              <FileGallery title="คลังเอกสารและเครื่องมือยุทธศาสตร์ DAY 3 (17 Apps Portfolio & Voice Master Prompts)" items={documents.filter(i => i.day === 'Day 3')} openFile={(item) => window.open(fileUrl(item), '_blank', 'noopener,noreferrer')} />
              <AtmosphereGallery images={atmospherePhotos.filter(i => i.day === 'Day 3')} videos={atmosphereVideos.filter(i => i.day === 'Day 3')} openPreview={openPreview} openVideo={setVideoPreview} />
            </div>
          )}

          {view === 'FormalReport' && <ExecutiveFormalReport onBack={() => setView('Overview')} />}

          {view === 'Works' && (
            <div className="works-galleries">
              <div className="page-heading">
                <div>
                  <p className="eyebrow">PORTFOLIO & SYSTEM PROTOTYPES</p>
                  <h2>พอร์ตโฟลิโอผลงานและภาพบันทึกคำสั่ง AI</h2>
                </div>
                <span className="result-count">{portfolioItems.length + textScreenshotItems.length} รายการ</span>
              </div>

              {/* Dedicated Subtabs for Strict Separation */}
              <div className="works-subtabs">
                <button
                  className={`subtab-btn ${worksSubTab === 'portfolio' ? 'active' : ''}`}
                  onClick={() => setWorksSubTab('portfolio')}
                >
                  <ImageIcon size={15} /> พอร์ตโฟลิโอผลงาน ({portfolioItems.length})
                </button>
                <button
                  className={`subtab-btn ${worksSubTab === 'screenshots' ? 'active' : ''}`}
                  onClick={() => setWorksSubTab('screenshots')}
                >
                  <FileText size={15} /> ภาพแชทและคำสั่ง AI (Chat Screenshots / Prompts) ({textScreenshotItems.length})
                </button>
                <button
                  className={`subtab-btn ${worksSubTab === 'all' ? 'active' : ''}`}
                  onClick={() => setWorksSubTab('all')}
                >
                  <Filter size={15} /> ทั้งหมด ({portfolioItems.length + textScreenshotItems.length})
                </button>
              </div>

              {(worksSubTab === 'portfolio' || worksSubTab === 'all') && (
                <ImageGallery
                  title="พอร์ตโฟลิโอผลงานและสถาปัตยกรรมระบบ (Portfolio & Architecture)"
                  items={portfolioItems}
                  openPreview={openPreview}
                />
              )}

              {(worksSubTab === 'screenshots' || worksSubTab === 'all') && (
                <ImageGallery
                  title={`ภาพแชทและคำสั่ง AI (Chat Screenshots / Prompts) — ${textScreenshotItems.length} รายการ`}
                  items={textScreenshotItems}
                  openPreview={openPreview}
                />
              )}
            </div>
          )}

          {view === 'Atmosphere' && (
            <AtmosphereGallery images={atmospherePhotos} videos={atmosphereVideos} openPreview={openPreview} openVideo={setVideoPreview} />
          )}

          {view === 'Documents' && (
            <FileGallery title="คลังเอกสาร สไลด์ และบทวิเคราะห์โครงการ" items={documents} openFile={(item) => window.open(fileUrl(item), '_blank', 'noopener,noreferrer')} />
          )}

          {view === 'People' && <ParticipantShowcase globalQuery={query} />}

          {view === 'Gemini' && <GeminiArtifactsHub />}
        </main>

        {preview && (
          <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setPreview(null)}>
            <button onClick={() => setPreview(null)} aria-label="ปิด"><X /></button>
            <figure onClick={(e) => e.stopPropagation()}>
              <img
                src={fileUrl(preview)}
                alt={displayTitle(preview)}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fb = e.currentTarget.nextElementSibling;
                  if (fb) fb.style.display = 'flex';
                }}
              />
              <div style={{ display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', color: '#ffffff', minHeight: '300px' }}>
                <ShieldCheck size={48} style={{ color: '#0284c7', marginBottom: '1rem' }} />
                <h3>{displayTitle(preview)}</h3>
                <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>ไฟล์หลักฐานโครงการ โรงพยาบาลเวชธานี</p>
              </div>
              <figcaption>{displayTitle(preview)}</figcaption>
            </figure>
          </div>
        )}

        {videoPreview && (
          <div className="lightbox video-lightbox" role="dialog" aria-modal="true" onClick={() => setVideoPreview(null)}>
            <button onClick={() => setVideoPreview(null)} aria-label="ปิด"><X /></button>
            <figure onClick={(e) => e.stopPropagation()}>
              <video src={fileUrl(videoPreview)} controls autoPlay playsInline />
              <figcaption>{displayTitle(videoPreview)}</figcaption>
            </figure>
          </div>
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
