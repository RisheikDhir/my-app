// ─── Template Registry ─────────────────────────────────────────────────────────
// All document templates defined as config. The DocumentRendererComponent reads
// this config and applies the correct CSS class + typography to the preview.

import { DocumentTemplate } from '../models/template.models';

const A4_MARGINS = { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' };
const A4_TIGHT   = { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' };

// ─── Resume Templates ──────────────────────────────────────────────────────────

export const RESUME_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'resume-modern',
    name: 'Modern Resume',
    slug: 'resume-modern',
    category: 'resume',
    description: 'A clean, contemporary design with a coloured sidebar and bold header. Great for creative and tech roles.',
    isPremium: true,
    isPopular: true,
    thumbnailUrl: '/assets/templates/resume-modern.png',
    tags: ['modern', 'two-column', 'coloured'],
    typography: { fontPrimary: 'Inter', fontSecondary: 'Inter', fontSizeBase: 10, lineHeight: 1.5, headingWeight: 700 },
    layout: {
      columns: 2, headerLayout: 'left', showPhoto: true,
      photoShape: 'circle', photoPosition: 'sidebar-top',
      sidebarWidth: '32%', pageMargins: A4_TIGHT, sectionSpacing: 'normal',
    },
    theme: {
      primaryColor: '#1a56db', accentColor: '#1c64f2', backgroundColor: '#ffffff',
      textColor: '#111827', mutedColor: '#6b7280', borderColor: '#e5e7eb',
      sectionHeaderStyle: 'underline',
    },
    supportedSections: ['personal','summary','experience','education','skills','projects','certifications','languages','awards'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_TIGHT, headerOnEveryPage: false, showPageNumbers: false },
    rendererClass: 'tpl-resume-modern',
    fontImports: ['Inter:wght@400;600;700'],
  },
  {
    id: 'resume-ats',
    name: 'ATS Resume',
    slug: 'resume-ats',
    category: 'resume',
    description: 'Single-column, keyword-dense, machine-readable layout. Passes applicant tracking systems with 95%+ compatibility.',
    isPremium: false,
    isAtsOptimized: true,
    thumbnailUrl: '/assets/templates/resume-ats.png',
    tags: ['ATS', 'one-column', 'minimal', 'clean'],
    typography: { fontPrimary: 'Calibri, Arial, sans-serif', fontSizeBase: 11, lineHeight: 1.4, headingWeight: 700 },
    layout: {
      columns: 1, headerLayout: 'left', showPhoto: false,
      photoShape: 'circle', photoPosition: 'none',
      pageMargins: A4_MARGINS, sectionSpacing: 'compact',
    },
    theme: {
      primaryColor: '#1a1a1a', accentColor: '#2563eb', backgroundColor: '#ffffff',
      textColor: '#1a1a1a', mutedColor: '#6b7280', borderColor: '#d1d5db',
      sectionHeaderStyle: 'underline',
    },
    supportedSections: ['personal','summary','experience','education','skills','certifications','awards','references'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_MARGINS, headerOnEveryPage: false, showPageNumbers: false },
    rendererClass: 'tpl-resume-ats',
    fontImports: [],
  },
  {
    id: 'resume-professional',
    name: 'Professional Resume',
    slug: 'resume-professional',
    category: 'resume',
    description: 'Traditional professional design with a dark header bar and clean sections. Corporate-ready for banking, consulting, and law.',
    isPremium: true,
    thumbnailUrl: '/assets/templates/resume-professional.png',
    tags: ['professional', 'corporate', 'dark-header'],
    typography: { fontPrimary: 'Lato', fontSecondary: 'Lato', fontSizeBase: 10, lineHeight: 1.5, headingWeight: 700 },
    layout: {
      columns: 1, headerLayout: 'left', showPhoto: false,
      photoShape: 'circle', photoPosition: 'none',
      pageMargins: A4_TIGHT, sectionSpacing: 'normal',
    },
    theme: {
      primaryColor: '#1e3a5f', accentColor: '#2563eb', backgroundColor: '#ffffff',
      textColor: '#111827', mutedColor: '#6b7280', borderColor: '#d1d5db',
      sectionHeaderStyle: 'filled',
    },
    supportedSections: ['personal','summary','experience','education','skills','certifications','awards','references'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_TIGHT, headerOnEveryPage: false, showPageNumbers: true },
    rendererClass: 'tpl-resume-professional',
    fontImports: ['Lato:wght@400;700'],
  },
  {
    id: 'resume-minimal',
    name: 'Minimal Resume',
    slug: 'resume-minimal',
    category: 'resume',
    description: 'Ultra-clean, whitespace-focused design. Lets your content speak without visual distraction.',
    isPremium: false,
    thumbnailUrl: '/assets/templates/resume-minimal.png',
    tags: ['minimal', 'clean', 'whitespace', 'simple'],
    typography: { fontPrimary: 'Plus Jakarta Sans', fontSizeBase: 10, lineHeight: 1.6, headingWeight: 600 },
    layout: {
      columns: 1, headerLayout: 'centered', showPhoto: false,
      photoShape: 'circle', photoPosition: 'none',
      pageMargins: A4_MARGINS, sectionSpacing: 'relaxed',
    },
    theme: {
      primaryColor: '#111827', accentColor: '#6b7280', backgroundColor: '#ffffff',
      textColor: '#374151', mutedColor: '#9ca3af', borderColor: '#f3f4f6',
      sectionHeaderStyle: 'plain',
    },
    supportedSections: ['personal','summary','experience','education','skills','projects','certifications'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_MARGINS, headerOnEveryPage: false, showPageNumbers: false },
    rendererClass: 'tpl-resume-minimal',
    fontImports: ['Plus+Jakarta+Sans:wght@400;500;600'],
  },
  {
    id: 'resume-executive',
    name: 'Executive Resume',
    slug: 'resume-executive',
    category: 'resume',
    description: 'Sophisticated, premium design for C-suite and senior leadership. Emphasises career achievements and executive presence.',
    isPremium: true,
    thumbnailUrl: '/assets/templates/resume-executive.png',
    tags: ['executive', 'senior', 'premium', 'leadership'],
    typography: { fontPrimary: 'Merriweather', fontSecondary: 'Lato', fontSizeBase: 10, lineHeight: 1.6, headingWeight: 700, letterSpacingHeadings: '0.06em' },
    layout: {
      columns: 1, headerLayout: 'left', showPhoto: true,
      photoShape: 'square', photoPosition: 'header-right',
      pageMargins: A4_TIGHT, sectionSpacing: 'relaxed',
    },
    theme: {
      primaryColor: '#1a2c4e', accentColor: '#c9a84c', backgroundColor: '#ffffff',
      textColor: '#1a2c4e', mutedColor: '#6b7280', borderColor: '#c9a84c',
      sectionHeaderStyle: 'bordered',
    },
    supportedSections: ['personal','summary','experience','education','skills','awards','certifications','references'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_TIGHT, headerOnEveryPage: false, showPageNumbers: true },
    rendererClass: 'tpl-resume-executive',
    fontImports: ['Merriweather:wght@400;700', 'Lato:wght@400;700'],
  },
  {
    id: 'resume-creative',
    name: 'Creative Resume',
    slug: 'resume-creative',
    category: 'resume',
    description: 'Bold, expressive layout with a gradient header and coloured section pills. Perfect for designers, marketers, and media professionals.',
    isPremium: true,
    isNew: true,
    thumbnailUrl: '/assets/templates/resume-creative.png',
    tags: ['creative', 'bold', 'coloured', 'designer'],
    typography: { fontPrimary: 'Poppins', fontSecondary: 'Poppins', fontSizeBase: 10, lineHeight: 1.5, headingWeight: 700 },
    layout: {
      columns: 2, headerLayout: 'banner', showPhoto: true,
      photoShape: 'circle', photoPosition: 'header-left',
      sidebarWidth: '35%', pageMargins: { top: '0', right: '0', bottom: '15mm', left: '0' }, sectionSpacing: 'normal',
    },
    theme: {
      primaryColor: '#6d28d9', accentColor: '#a78bfa', backgroundColor: '#ffffff',
      textColor: '#1f2937', mutedColor: '#6b7280', borderColor: '#ede9fe',
      sectionHeaderStyle: 'pill',
    },
    supportedSections: ['personal','summary','experience','education','skills','projects','certifications','languages','awards'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: { top: '0', right: '0', bottom: '15mm', left: '0' }, headerOnEveryPage: false, showPageNumbers: false },
    rendererClass: 'tpl-resume-creative',
    fontImports: ['Poppins:wght@400;500;600;700'],
  },
];

// ─── CV Templates ──────────────────────────────────────────────────────────────

export const CV_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'cv-academic',
    name: 'Academic CV',
    slug: 'cv-academic',
    category: 'cv',
    description: 'Multi-page academic CV template with sections for publications, research, conferences, and academic appointments.',
    isPremium: true,
    thumbnailUrl: '/assets/templates/cv-academic.png',
    tags: ['academic', 'research', 'university', 'phd', 'professor'],
    typography: { fontPrimary: 'EB Garamond', fontSecondary: 'Lato', fontSizeBase: 11, lineHeight: 1.6, headingWeight: 700 },
    layout: {
      columns: 1, headerLayout: 'left', showPhoto: false,
      photoShape: 'circle', photoPosition: 'none',
      pageMargins: A4_MARGINS, sectionSpacing: 'relaxed',
    },
    theme: {
      primaryColor: '#1e3a5f', accentColor: '#2563eb', backgroundColor: '#ffffff',
      textColor: '#111827', mutedColor: '#6b7280', borderColor: '#d1d5db',
      sectionHeaderStyle: 'underline',
    },
    supportedSections: ['personal','summary','education','experience','publications','projects','certifications','awards','languages','references'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_MARGINS, headerOnEveryPage: true, showPageNumbers: true },
    rendererClass: 'tpl-cv-academic',
    fontImports: ['EB+Garamond:wght@400;600;700', 'Lato:wght@400;700'],
  },
  {
    id: 'cv-executive',
    name: 'Executive CV',
    slug: 'cv-executive',
    category: 'cv',
    description: 'Polished executive-grade CV for C-suite leaders, board advisors, and senior management.',
    isPremium: true,
    thumbnailUrl: '/assets/templates/cv-executive.png',
    tags: ['executive', 'leadership', 'management', 'premium'],
    typography: { fontPrimary: 'Libre Baskerville', fontSecondary: 'Inter', fontSizeBase: 10, lineHeight: 1.6, headingWeight: 700 },
    layout: {
      columns: 1, headerLayout: 'left', showPhoto: true,
      photoShape: 'square', photoPosition: 'header-right',
      pageMargins: A4_TIGHT, sectionSpacing: 'relaxed',
    },
    theme: {
      primaryColor: '#1a2c4e', accentColor: '#c9a84c', backgroundColor: '#fafaf9',
      textColor: '#1a2c4e', mutedColor: '#78716c', borderColor: '#c9a84c',
      sectionHeaderStyle: 'bordered',
    },
    supportedSections: ['personal','summary','experience','education','skills','awards','certifications','references'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_TIGHT, headerOnEveryPage: true, showPageNumbers: true },
    rendererClass: 'tpl-cv-executive',
    fontImports: ['Libre+Baskerville:wght@400;700', 'Inter:wght@400;600'],
  },
  {
    id: 'cv-clean',
    name: 'Clean CV',
    slug: 'cv-clean',
    category: 'cv',
    description: 'Simple, structured CV template that works for all experience levels. Clear hierarchy, readable fonts, free to use.',
    isPremium: false,
    thumbnailUrl: '/assets/templates/cv-clean.png',
    tags: ['clean', 'simple', 'universal', 'free'],
    typography: { fontPrimary: 'Noto Sans', fontSizeBase: 10, lineHeight: 1.5, headingWeight: 600 },
    layout: {
      columns: 1, headerLayout: 'left', showPhoto: false,
      photoShape: 'circle', photoPosition: 'none',
      pageMargins: A4_MARGINS, sectionSpacing: 'normal',
    },
    theme: {
      primaryColor: '#111827', accentColor: '#4b5563', backgroundColor: '#ffffff',
      textColor: '#374151', mutedColor: '#9ca3af', borderColor: '#e5e7eb',
      sectionHeaderStyle: 'underline',
    },
    supportedSections: ['personal','summary','education','experience','skills','publications','certifications','awards','languages','references'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_MARGINS, headerOnEveryPage: false, showPageNumbers: true },
    rendererClass: 'tpl-cv-clean',
    fontImports: ['Noto+Sans:wght@400;600;700'],
  },
];

// ─── Biodata / Marriage Biodata Templates ──────────────────────────────────────

export const BIODATA_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'biodata-royal',
    name: 'Royal Biodata',
    slug: 'biodata-royal',
    category: 'marriage-biodata',
    description: 'Regal maroon and gold design with ornamental borders. Perfect for traditional and classical Indian families.',
    isPremium: true,
    isPopular: true,
    thumbnailUrl: '/assets/templates/biodata-royal.png',
    tags: ['royal', 'traditional', 'maroon', 'gold', 'ornamental'],
    typography: { fontPrimary: 'Cinzel', fontSecondary: 'Cormorant Garamond', fontSizeBase: 10, lineHeight: 1.6, headingWeight: 700, letterSpacingHeadings: '0.08em' },
    layout: {
      columns: 1, headerLayout: 'centered', showPhoto: true,
      photoShape: 'circle', photoPosition: 'header-right',
      pageMargins: { top: '18mm', right: '18mm', bottom: '18mm', left: '18mm' }, sectionSpacing: 'relaxed',
    },
    theme: {
      primaryColor: '#7c0a02', accentColor: '#c9a84c', backgroundColor: '#fefbf3',
      textColor: '#2d1a00', mutedColor: '#8b5a2b', borderColor: '#c9a84c',
      sectionHeaderStyle: 'underline',
    },
    supportedSections: ['personal','religion-community','horoscope','education-career','family','contact','partner-preference'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: { top: '18mm', right: '18mm', bottom: '18mm', left: '18mm' }, headerOnEveryPage: false, showPageNumbers: false },
    rendererClass: 'tpl-biodata-royal',
    fontImports: ['Cinzel:wght@400;600;700', 'Cormorant+Garamond:wght@400;500;600;700'],
  },
  {
    id: 'biodata-elegant',
    name: 'Floral Elegant Biodata',
    slug: 'biodata-elegant',
    category: 'marriage-biodata',
    description: 'Delicate floral accents with a soft pastel palette. Romantic and feminine — ideal for modern brides.',
    isPremium: true,
    thumbnailUrl: '/assets/templates/biodata-elegant.png',
    tags: ['elegant', 'floral', 'pastel', 'feminine', 'romantic'],
    typography: { fontPrimary: 'Cormorant Garamond', fontSecondary: 'Lato', fontSizeBase: 11, lineHeight: 1.7, headingWeight: 600 },
    layout: {
      columns: 1, headerLayout: 'centered', showPhoto: true,
      photoShape: 'rounded', photoPosition: 'header-right',
      pageMargins: A4_TIGHT, sectionSpacing: 'relaxed',
    },
    theme: {
      primaryColor: '#be185d', accentColor: '#f9a8d4', backgroundColor: '#fff7f9',
      textColor: '#4a2040', mutedColor: '#9d7680', borderColor: '#fecdd3',
      sectionHeaderStyle: 'plain',
    },
    supportedSections: ['personal','religion-community','horoscope','education-career','family','contact','partner-preference'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_TIGHT, headerOnEveryPage: false, showPageNumbers: false },
    rendererClass: 'tpl-biodata-elegant',
    fontImports: ['Cormorant+Garamond:ital,wght@0,400;0,600;1,400', 'Lato:wght@400;700'],
  },
  {
    id: 'biodata-modern',
    name: 'Modern Biodata',
    slug: 'biodata-modern',
    category: 'marriage-biodata',
    description: 'Clean, contemporary layout with a professional tone. Suitable for both genders and urban families.',
    isPremium: false,
    thumbnailUrl: '/assets/templates/biodata-modern.png',
    tags: ['modern', 'clean', 'contemporary', 'neutral'],
    typography: { fontPrimary: 'Poppins', fontSizeBase: 10, lineHeight: 1.5, headingWeight: 600 },
    layout: {
      columns: 2, headerLayout: 'left', showPhoto: true,
      photoShape: 'rounded', photoPosition: 'header-right',
      sidebarWidth: '35%', pageMargins: A4_TIGHT, sectionSpacing: 'normal',
    },
    theme: {
      primaryColor: '#6366f1', accentColor: '#818cf8', backgroundColor: '#ffffff',
      textColor: '#1f2937', mutedColor: '#6b7280', borderColor: '#e5e7eb',
      sectionHeaderStyle: 'filled',
    },
    supportedSections: ['personal','religion-community','education-career','family','contact','partner-preference'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_TIGHT, headerOnEveryPage: false, showPageNumbers: false },
    rendererClass: 'tpl-biodata-modern',
    fontImports: ['Poppins:wght@400;500;600;700'],
  },
  {
    id: 'biodata-classic-serif',
    name: 'Classic Serif Biodata',
    slug: 'biodata-classic-serif',
    category: 'marriage-biodata',
    description: 'Traditional serif typography on a warm cream background. Respected, formal, and widely accepted.',
    isPremium: false,
    thumbnailUrl: '/assets/templates/biodata-classic.png',
    tags: ['classic', 'serif', 'traditional', 'cream', 'formal'],
    typography: { fontPrimary: 'Lora', fontSecondary: 'Lora', fontSizeBase: 11, lineHeight: 1.65, headingWeight: 700 },
    layout: {
      columns: 1, headerLayout: 'centered', showPhoto: true,
      photoShape: 'square', photoPosition: 'header-right',
      pageMargins: A4_MARGINS, sectionSpacing: 'relaxed',
    },
    theme: {
      primaryColor: '#44403c', accentColor: '#854d0e', backgroundColor: '#faf7f0',
      textColor: '#292524', mutedColor: '#78716c', borderColor: '#d6cfc5',
      sectionHeaderStyle: 'underline',
    },
    supportedSections: ['personal','religion-community','horoscope','education-career','family','contact','partner-preference'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_MARGINS, headerOnEveryPage: false, showPageNumbers: false },
    rendererClass: 'tpl-biodata-classic',
    fontImports: ['Lora:ital,wght@0,400;0,600;0,700;1,400'],
  },
  {
    id: 'biodata-vibrant',
    name: 'Vibrant Biodata',
    slug: 'biodata-vibrant',
    category: 'marriage-biodata',
    description: 'Bold gradient header with vibrant accents. Modern and eye-catching — ideal for contemporary profiles.',
    isPremium: true,
    isNew: true,
    thumbnailUrl: '/assets/templates/biodata-vibrant.png',
    tags: ['vibrant', 'bold', 'gradient', 'modern', 'colourful'],
    typography: { fontPrimary: 'Nunito', fontSizeBase: 10, lineHeight: 1.5, headingWeight: 700 },
    layout: {
      columns: 1, headerLayout: 'banner', showPhoto: true,
      photoShape: 'circle', photoPosition: 'header-left',
      pageMargins: { top: '0', right: '0', bottom: '15mm', left: '0' }, sectionSpacing: 'normal',
    },
    theme: {
      primaryColor: '#7c3aed', accentColor: '#ec4899', backgroundColor: '#ffffff',
      textColor: '#1f2937', mutedColor: '#6b7280', borderColor: '#ede9fe',
      sectionHeaderStyle: 'pill',
    },
    supportedSections: ['personal','religion-community','education-career','family','contact','partner-preference'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: { top: '0', right: '0', bottom: '15mm', left: '0' }, headerOnEveryPage: false, showPageNumbers: false },
    rendererClass: 'tpl-biodata-vibrant',
    fontImports: ['Nunito:wght@400;600;700;800'],
  },
  {
    id: 'biodata-simple',
    name: 'Simple Biodata',
    slug: 'biodata-simple',
    category: 'biodata',
    description: 'Plain, no-frills biodata format. Clean black-and-white, universally accepted. Free to download.',
    isPremium: false,
    thumbnailUrl: '/assets/templates/biodata-simple.png',
    tags: ['simple', 'plain', 'free', 'minimal', 'universal'],
    typography: { fontPrimary: 'Arial, Helvetica, sans-serif', fontSizeBase: 11, lineHeight: 1.5, headingWeight: 700 },
    layout: {
      columns: 1, headerLayout: 'centered', showPhoto: true,
      photoShape: 'square', photoPosition: 'header-right',
      pageMargins: A4_MARGINS, sectionSpacing: 'compact',
    },
    theme: {
      primaryColor: '#000000', accentColor: '#374151', backgroundColor: '#ffffff',
      textColor: '#000000', mutedColor: '#6b7280', borderColor: '#000000',
      sectionHeaderStyle: 'underline',
    },
    supportedSections: ['personal','religion-community','education-career','family','contact'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_MARGINS, headerOnEveryPage: false, showPageNumbers: false },
    rendererClass: 'tpl-biodata-simple',
    fontImports: [],
  },
];

// ─── Cover Letter / Job Application Letter Templates ───────────────────────────

export const LETTER_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'letter-professional',
    name: 'Professional Cover Letter',
    slug: 'letter-professional',
    category: 'cover-letter',
    description: 'Clean professional layout matching most resume templates. Ideal for corporate and white-collar applications.',
    isPremium: true,
    thumbnailUrl: '/assets/templates/letter-professional.png',
    tags: ['professional', 'corporate', 'clean'],
    typography: { fontPrimary: 'Lato', fontSizeBase: 11, lineHeight: 1.6, headingWeight: 700 },
    layout: { columns: 1, headerLayout: 'left', showPhoto: false, photoShape: 'circle', photoPosition: 'none', pageMargins: A4_MARGINS, sectionSpacing: 'relaxed' },
    theme: { primaryColor: '#1e3a5f', accentColor: '#2563eb', backgroundColor: '#ffffff', textColor: '#111827', mutedColor: '#6b7280', borderColor: '#d1d5db', sectionHeaderStyle: 'none' },
    supportedSections: ['sender','recipient','content'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_MARGINS, headerOnEveryPage: false, showPageNumbers: false },
    rendererClass: 'tpl-letter-professional',
    fontImports: ['Lato:wght@400;700'],
  },
  {
    id: 'letter-minimal',
    name: 'Minimal Cover Letter',
    slug: 'letter-minimal',
    category: 'cover-letter',
    description: 'Simple, distraction-free layout that puts focus entirely on your words. Free to use.',
    isPremium: false,
    thumbnailUrl: '/assets/templates/letter-minimal.png',
    tags: ['minimal', 'simple', 'free', 'clean'],
    typography: { fontPrimary: 'Georgia, serif', fontSizeBase: 11, lineHeight: 1.7, headingWeight: 700 },
    layout: { columns: 1, headerLayout: 'left', showPhoto: false, photoShape: 'circle', photoPosition: 'none', pageMargins: A4_MARGINS, sectionSpacing: 'relaxed' },
    theme: { primaryColor: '#111827', accentColor: '#374151', backgroundColor: '#ffffff', textColor: '#374151', mutedColor: '#6b7280', borderColor: '#e5e7eb', sectionHeaderStyle: 'none' },
    supportedSections: ['sender','recipient','content'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_MARGINS, headerOnEveryPage: false, showPageNumbers: false },
    rendererClass: 'tpl-letter-minimal',
    fontImports: [],
  },
  {
    id: 'letter-formal-india',
    name: 'Formal Indian Letter',
    slug: 'letter-formal-india',
    category: 'job-application',
    description: 'Traditional Indian formal letter format. Widely accepted for government, PSU, and formal private sector applications.',
    isPremium: false,
    thumbnailUrl: '/assets/templates/letter-formal.png',
    tags: ['formal', 'indian', 'government', 'PSU', 'traditional'],
    typography: { fontPrimary: 'Times New Roman, serif', fontSizeBase: 12, lineHeight: 1.6, headingWeight: 700 },
    layout: { columns: 1, headerLayout: 'left', showPhoto: false, photoShape: 'circle', photoPosition: 'none', pageMargins: A4_MARGINS, sectionSpacing: 'relaxed' },
    theme: { primaryColor: '#000000', accentColor: '#374151', backgroundColor: '#ffffff', textColor: '#000000', mutedColor: '#374151', borderColor: '#000000', sectionHeaderStyle: 'none' },
    supportedSections: ['sender','recipient','content'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_MARGINS, headerOnEveryPage: false, showPageNumbers: false },
    rendererClass: 'tpl-letter-formal',
    fontImports: [],
  },
];

// ─── Summary Templates ─────────────────────────────────────────────────────────

export const SUMMARY_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'summary-clean',
    name: 'Clean Summary',
    slug: 'summary-clean',
    category: 'professional-summary',
    description: 'One-page professional summary with clean typography and smart section layout.',
    isPremium: false,
    thumbnailUrl: '/assets/templates/summary-clean.png',
    tags: ['summary', 'one-page', 'clean', 'professional'],
    typography: { fontPrimary: 'Inter', fontSizeBase: 11, lineHeight: 1.6, headingWeight: 600 },
    layout: { columns: 1, headerLayout: 'centered', showPhoto: true, photoShape: 'circle', photoPosition: 'header-left', pageMargins: A4_MARGINS, sectionSpacing: 'relaxed' },
    theme: { primaryColor: '#0f766e', accentColor: '#14b8a6', backgroundColor: '#ffffff', textColor: '#111827', mutedColor: '#6b7280', borderColor: '#ccfbf1', sectionHeaderStyle: 'underline' },
    supportedSections: ['personal','summary','skills','highlights','awards'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_MARGINS, headerOnEveryPage: false, showPageNumbers: false },
    rendererClass: 'tpl-summary-clean',
    fontImports: ['Inter:wght@400;600;700'],
  },
  {
    id: 'summary-modern',
    name: 'Modern Summary',
    slug: 'summary-modern',
    category: 'professional-summary',
    description: 'Bold and dynamic one-pager with a coloured sidebar for key competencies.',
    isPremium: true,
    thumbnailUrl: '/assets/templates/summary-modern.png',
    tags: ['modern', 'coloured', 'sidebar', 'bold'],
    typography: { fontPrimary: 'Poppins', fontSizeBase: 10, lineHeight: 1.5, headingWeight: 700 },
    layout: { columns: 2, headerLayout: 'split', showPhoto: true, photoShape: 'circle', photoPosition: 'sidebar-top', sidebarWidth: '35%', pageMargins: A4_TIGHT, sectionSpacing: 'normal' },
    theme: { primaryColor: '#0f766e', accentColor: '#14b8a6', backgroundColor: '#ffffff', textColor: '#1f2937', mutedColor: '#6b7280', borderColor: '#ccfbf1', sectionHeaderStyle: 'filled' },
    supportedSections: ['personal','summary','skills','highlights','awards'],
    printSettings: { pageSize: 'A4', orientation: 'portrait', margins: A4_TIGHT, headerOnEveryPage: false, showPageNumbers: false },
    rendererClass: 'tpl-summary-modern',
    fontImports: ['Poppins:wght@400;500;600;700'],
  },
];

// ─── Master template registry ──────────────────────────────────────────────────

export const ALL_TEMPLATES: DocumentTemplate[] = [
  ...RESUME_TEMPLATES,
  ...CV_TEMPLATES,
  ...BIODATA_TEMPLATES,
  ...LETTER_TEMPLATES,
  ...SUMMARY_TEMPLATES,
];

export const TEMPLATE_MAP = new Map<string, DocumentTemplate>(
  ALL_TEMPLATES.map(t => [t.id, t]),
);

export function getTemplateById(id: string): DocumentTemplate | undefined {
  return TEMPLATE_MAP.get(id);
}

export function getTemplateBySlug(slug: string): DocumentTemplate | undefined {
  return ALL_TEMPLATES.find(t => t.slug === slug);
}

export function getTemplatesForGenerator(generatorId: string, supportedIds: string[]): DocumentTemplate[] {
  return supportedIds.map(id => TEMPLATE_MAP.get(id)).filter((t): t is DocumentTemplate => !!t);
}

export function getFreeTemplatesForGenerator(freeIds: string[]): DocumentTemplate[] {
  return freeIds.map(id => TEMPLATE_MAP.get(id)).filter((t): t is DocumentTemplate => !!t);
}
