import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const doc = new PDFDocument({ margin: 50 });
const pdfPath = path.join(process.cwd(), 'README.pdf');
const writeStream = fs.createWriteStream(pdfPath);

doc.pipe(writeStream);

// Colors
const primaryColor = '#2563EB';
const secondaryColor = '#7C3AED';
const darkBg = '#0F172A';
const textColor = '#1E293B';
const accentColor = '#06B6D4';

// Header / Title
doc.rect(0, 0, 612, 140).fill(darkBg);

doc.fillColor('#FFFFFF')
   .fontSize(28)
   .font('Helvetica-Bold')
   .text('NeuraFlow AI', 50, 40);

doc.fillColor(accentColor)
   .fontSize(14)
   .font('Helvetica')
   .text('Transforming Businesses with Artificial Intelligence', 50, 75);

doc.fillColor('#94A3B8')
   .fontSize(10)
   .text('Official Platform Documentation & Architecture Guide | 2026 Edition', 50, 98);

doc.moveDown(4);

// Executive Summary
doc.fillColor(primaryColor).fontSize(16).font('Helvetica-Bold').text('1. Executive Summary', 50, 160);
doc.font('Helvetica').fontSize(10).fillColor(textColor).text(
  'NeuraFlow AI is an award-winning, production-grade enterprise platform designed to showcase cutting-edge artificial intelligence solutions for modern businesses. Built with a futuristic SaaS aesthetic inspired by Linear, Stripe, Apple, and OpenAI, NeuraFlow AI combines high performance, zero-trust security, and deep interactivity.',
  50, 185, { width: 512, align: 'justify' }
);

// Links Box
doc.rect(50, 240, 512, 55).fillAndStroke('#F1F5F9', '#CBD5E1');
doc.fillColor('#0F172A').fontSize(10).font('Helvetica-Bold').text('Live Production URL:', 65, 252);
doc.fillColor(primaryColor).font('Helvetica').text('https://neuraflow-ai-rho.vercel.app', 185, 252);

doc.fillColor('#0F172A').font('Helvetica-Bold').text('GitHub Repository:', 65, 272);
doc.fillColor(primaryColor).font('Helvetica').text('https://github.com/anweshagartia13/anweshagartia13.github.io', 185, 272);

// Tech Stack
doc.fillColor(primaryColor).fontSize(16).font('Helvetica-Bold').text('2. Technology Stack & Frameworks', 50, 315);

const stackItems = [
  ['Framework:', 'React 18 + Vite 5 (Fast HMR & Optimized Production Bundling)'],
  ['Styling:', 'Tailwind CSS v3 + Custom CSS Glassmorphism & Radial Gradients'],
  ['Animations:', 'Framer Motion + Canvas Particle Engine + Canvas Confetti'],
  ['Icons:', 'Lucide React Icons (Modern SVG Iconography)'],
  ['Deployment:', 'Vercel Global Edge Network (99.99% Uptime SLA)']
];

let yPos = 340;
stackItems.forEach(([label, value]) => {
  doc.fillColor(textColor).font('Helvetica-Bold').fontSize(10).text(label, 60, yPos);
  doc.font('Helvetica').text(value, 150, yPos);
  yPos += 20;
});

// Complete Pages Breakdown
doc.fillColor(primaryColor).fontSize(16).font('Helvetica-Bold').text('3. Detailed Pages & Architecture Breakdown', 50, yPos + 15);
yPos += 40;

const pagesList = [
  { name: '1. Home Page (/home)', desc: 'Hero section with live typing effect, interactive neural node animation, partner logos ribbon, live counters ($140M+ client cost saved), features grid, service preview, and case study video demo modal.' },
  { name: '2. About Page (/about)', desc: 'Company story, mission, vision, 4 core values, interactive company timeline (2020-2026), executive leadership cards with bios/socials, and industry awards.' },
  { name: '3. Services Page (/services)', desc: '8 interactive service cards (AI Chatbots, ML Models, Computer Vision, NLP, Predictive Analytics, Automation, Consulting, Cloud AI) with technical blueprint modals.' },
  { name: '4. Portfolio Page (/portfolio)', desc: 'Filterable commercial case studies across Healthcare, FinTech, Retail, AgriTech, and Enterprise with quantified ROI impact metrics.' },
  { name: '5. Pricing Page (/pricing)', desc: 'Monthly vs Annual billing toggle (20% discount), Starter ($2,999/mo), Professional ($7,499/mo), Enterprise tiers, detailed feature matrix, and interactive ROI Calculator.' },
  { name: '6. Testimonials Page (/testimonials)', desc: 'Sector-filterable 5-star customer reviews, customer photos, and security compliance badges (SOC2 Type II, ISO 27001, GDPR).' },
  { name: '7. Blog Page (/blog)', desc: '6 AI research articles with category filters, search bar, author metadata, and full article reader modal.' },
  { name: '8. FAQ Page (/faq)', desc: '12 categorized accordion questions covering Security, SLAs, On-Premise deployment, Pricing, and IP ownership.' },
  { name: '9. Contact Page (/contact)', desc: 'Consultation request form with validation/confetti, global office hub selector (SF, London, Tokyo, Singapore), and interactive map representation.' },
  { name: '10. Careers Page (/careers)', desc: 'Open job positions (AI Researcher, MLOps Engineer, Full-Stack Engineer, Product Designer) with application modal.' },
  { name: '11. Privacy Policy (/privacy)', desc: 'Legal terms detailing Zero-Data Training guarantees, SOC2 encryption, data retention, and GDPR rights.' },
  { name: '12. Terms & Conditions (/terms)', desc: 'Commercial agreement covering 100% IP model weight ownership, SLAs, and acceptable use.' },
  { name: '13. 404 Page (/404)', desc: 'Futuristic diagnostic terminal readout with quick redirect controls.' }
];

pagesList.forEach((pg) => {
  if (yPos > 680) {
    doc.addPage();
    yPos = 50;
  }
  doc.fillColor('#0F172A').font('Helvetica-Bold').fontSize(10).text(pg.name, 60, yPos);
  doc.fillColor(textColor).font('Helvetica').fontSize(9).text(pg.desc, 60, yPos + 14, { width: 490 });
  yPos += 45;
});

// Interactive Features Section
if (yPos > 600) {
  doc.addPage();
  yPos = 50;
}

doc.fillColor(primaryColor).fontSize(16).font('Helvetica-Bold').text('4. Interactive & Bonus Features', 50, yPos + 10);
yPos += 35;

const bonusFeatures = [
  ['Floating AI Chatbot (NeuraBot):', 'Interactive assistant with real-time prompt suggestions and simulated intelligent responses.'],
  ['Enterprise Brochure Download:', 'Form modal that generates and downloads the 2026 NeuraFlow AI Enterprise Whitepaper PDF/text file.'],
  ['Interactive ROI Calculator:', 'Dynamic calculator allowing visitors to estimate annual cost and hour savings based on team size.'],
  ['Cookie Consent Banner:', 'Glassmorphic banner with customizable analytics and privacy settings.'],
  ['SEO & Telemetry:', 'Full OpenGraph meta, Twitter Cards, JSON-LD structured data, robots.txt, and sitemap.xml.']
];

bonusFeatures.forEach(([title, detail]) => {
  if (yPos > 700) {
    doc.addPage();
    yPos = 50;
  }
  doc.fillColor('#0F172A').font('Helvetica-Bold').fontSize(10).text(title, 60, yPos);
  doc.fillColor(textColor).font('Helvetica').fontSize(9).text(detail, 230, yPos, { width: 320 });
  yPos += 28;
});

// End of PDF
doc.end();

writeStream.on('finish', () => {
  console.log('README.pdf successfully generated at ' + pdfPath);
});
