// ─── Route-level SEO Metadata Registry ────────────────────────────────────────
// Each public route defines its canonical SEO metadata.
// The SeoMetaService reads this config on route change and updates the document head.

import { RouteSeoCofig, buildFaqSchema, buildWebApplicationSchema, buildBreadcrumbSchema } from '../models/seo.models';

const BASE_URL = 'https://docforge.app'; // TODO: replace with environment.appUrl at runtime

const BASE_TITLE_SUFFIX = '| DocForge — Free Document Generator';

export const ROUTE_SEO_CONFIG: RouteSeoCofig[] = [
  // ─── Home ───────────────────────────────────────────────────────────────────
  {
    path: '/',
    seo: {
      title: `DocForge — Free Resume, CV & Biodata Generator Online`,
      description: 'Create professional resumes, CVs, marriage biodatas, and cover letters online. 20+ document types, premium templates, and instant PDF download. Free to preview.',
      keywords: ['resume builder', 'cv maker', 'biodata generator', 'marriage biodata', 'cover letter generator', 'document maker india', 'free resume online'],
      ogTitle: 'DocForge — Create Professional Documents Instantly',
      ogDescription: 'Build job-winning resumes, CVs, and marriage biodatas with live preview and premium templates. Pay only to download.',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      canonicalUrl: `${BASE_URL}/`,
      structuredData: [
        buildWebApplicationSchema('DocForge', BASE_URL, 'Free online generator for resumes, CVs, marriage biodatas, and cover letters with live preview.'),
        buildFaqSchema([
          { q: 'Is DocForge free to use?', a: 'Yes, DocForge is free to preview. You pay only ₹10 to download a PDF without watermark.' },
          { q: 'Can I create a marriage biodata on DocForge?', a: 'Yes! DocForge has dedicated marriage biodata templates including Royal, Floral Elegant, Classic Serif, Modern, and more.' },
          { q: 'Does DocForge support Hindi?', a: 'Yes, DocForge supports both English and Hindi field labels and content.' },
          { q: 'Can I save my resume draft?', a: 'Yes, your draft is automatically saved to your browser. You can return and edit it any time.' },
          { q: 'What formats can I download?', a: 'You can download your document as a PDF or PNG image. Print from browser is also supported.' },
        ]),
      ],
    },
  },

  // ─── Pricing ─────────────────────────────────────────────────────────────────
  {
    path: '/pricing',
    seo: {
      title: `Pricing — DocForge ${BASE_TITLE_SUFFIX}`,
      description: 'DocForge is free to preview. Pay ₹10 per PDF download or unlock all premium templates with Pro plan at ₹199/month. No subscription required.',
      keywords: ['docforge pricing', 'resume builder price india', 'cv maker cost', 'free resume download'],
      ogTitle: 'Simple, Transparent Pricing | DocForge',
      ogDescription: 'Free preview. ₹10 per download. ₹199/month for unlimited Pro access.',
      canonicalUrl: `${BASE_URL}/pricing`,
      structuredData: buildBreadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: 'Pricing', url: `${BASE_URL}/pricing` },
      ]),
    },
  },

  // ─── Templates Gallery ────────────────────────────────────────────────────────
  {
    path: '/templates',
    seo: {
      title: `Browse All Templates — Resume, CV, Biodata ${BASE_TITLE_SUFFIX}`,
      description: 'Choose from 20+ professionally designed templates for resumes, CVs, marriage biodatas, and cover letters. Free and premium options available.',
      keywords: ['resume templates', 'cv templates', 'biodata templates', 'marriage biodata templates', 'free resume template india'],
      canonicalUrl: `${BASE_URL}/templates`,
    },
  },

  // ─── About ────────────────────────────────────────────────────────────────────
  {
    path: '/about',
    seo: {
      title: `About DocForge — Our Story & Mission ${BASE_TITLE_SUFFIX}`,
      description: 'DocForge helps millions of Indians create professional resumes, CVs, and marriage biodatas for free. Learn about our mission, story, and team.',
      canonicalUrl: `${BASE_URL}/about`,
    },
  },

  // ─── Contact ──────────────────────────────────────────────────────────────────
  {
    path: '/contact',
    seo: {
      title: `Contact Us — DocForge ${BASE_TITLE_SUFFIX}`,
      description: 'Get in touch with the DocForge team. We\'re here to help with any questions about our document generator platform.',
      canonicalUrl: `${BASE_URL}/contact`,
    },
  },

  // ─── FAQ ──────────────────────────────────────────────────────────────────────
  {
    path: '/faq',
    seo: {
      title: `FAQ — Frequently Asked Questions ${BASE_TITLE_SUFFIX}`,
      description: 'Find answers to common questions about using DocForge — free features, premium plans, PDF download, templates, and more.',
      canonicalUrl: `${BASE_URL}/faq`,
      structuredData: buildFaqSchema([
        { q: 'How do I create a resume on DocForge?', a: 'Click "Create Resume" on the homepage, fill in your details step by step, choose a template, and download your PDF.' },
        { q: 'Is my data safe on DocForge?', a: 'All your data is stored locally in your browser — we never send it to any server. Your documents are 100% private.' },
        { q: 'Can I edit my resume later?', a: 'Yes, your resume is automatically saved in your browser. Just visit DocForge again to continue editing.' },
        { q: 'What payment methods are accepted?', a: 'We accept all major payment methods via Razorpay — UPI, cards, net banking, and wallets.' },
        { q: 'Is there a refund policy?', a: 'We offer a full refund if you are unable to download your document after payment. Contact us within 24 hours.' },
        { q: 'Can I create a marriage biodata in Hindi?', a: 'Yes, DocForge supports Hindi field labels and you can fill in your content in Hindi.' },
      ]),
    },
  },

  // ─── Legal ────────────────────────────────────────────────────────────────────
  {
    path: '/privacy-policy',
    seo: {
      title: `Privacy Policy — DocForge`,
      description: 'Read DocForge\'s privacy policy. We store all your data locally in your browser — no account required, no server storage.',
      noindex: false,
      canonicalUrl: `${BASE_URL}/privacy-policy`,
    },
  },
  {
    path: '/terms-and-conditions',
    seo: {
      title: `Terms & Conditions — DocForge`,
      description: 'DocForge Terms and Conditions of use. Read about your rights, responsibilities, and payment terms.',
      canonicalUrl: `${BASE_URL}/terms-and-conditions`,
    },
  },
  {
    path: '/refund-policy',
    seo: {
      title: `Refund Policy — DocForge`,
      description: 'DocForge Refund Policy. We offer refunds if you are unable to download your document after payment. Read our full policy.',
      canonicalUrl: `${BASE_URL}/refund-policy`,
    },
  },

  // ─── SEO Landing Pages ────────────────────────────────────────────────────────
  {
    path: '/resume-generator',
    seo: {
      title: `Free Resume Builder Online — Create Resume in Minutes ${BASE_TITLE_SUFFIX}`,
      description: 'Build a professional, ATS-optimised resume online for free. Choose from 6 modern templates, fill your details, and download a print-ready PDF. No signup required.',
      keywords: ['resume builder online', 'free resume maker', 'create resume online', 'resume generator india', 'online resume builder', 'resume format download'],
      ogTitle: 'Free Resume Builder — Create Your Resume in Minutes',
      ogDescription: 'Professional resume templates, live preview, and instant PDF download. No signup, no watermark on free templates.',
      canonicalUrl: `${BASE_URL}/resume-generator`,
      structuredData: [
        buildBreadcrumbSchema([{ name: 'Home', url: BASE_URL }, { name: 'Resume Generator', url: `${BASE_URL}/resume-generator` }]),
        buildFaqSchema([
          { q: 'Is this resume builder free?', a: 'Yes, you can preview for free. Download a PDF for ₹10 or upgrade to Pro for unlimited downloads.' },
          { q: 'Is the resume ATS compatible?', a: 'Yes, our ATS Resume template is specifically designed to pass applicant tracking systems.' },
        ]),
      ],
    },
  },
  {
    path: '/cv-generator',
    seo: {
      title: `Free CV Maker Online — Build a Professional CV ${BASE_TITLE_SUFFIX}`,
      description: 'Create a comprehensive Curriculum Vitae online for academic, research, and professional roles. Multiple CV templates, live preview, and instant PDF.',
      keywords: ['cv generator', 'cv maker online', 'curriculum vitae generator', 'cv builder india', 'academic cv', 'free cv maker'],
      canonicalUrl: `${BASE_URL}/cv-generator`,
    },
  },
  {
    path: '/biodata-generator',
    seo: {
      title: `Free Bio Data Generator — Create Bio Data Online ${BASE_TITLE_SUFFIX}`,
      description: 'Create a professional bio data for job applications in the traditional Indian format. Instant PDF download, accepted by government and private employers.',
      keywords: ['bio data format', 'biodata maker', 'bio data generator india', 'biodata for job', 'bio data pdf download', 'biodata format download'],
      canonicalUrl: `${BASE_URL}/biodata-generator`,
    },
  },
  {
    path: '/marriage-biodata-generator',
    seo: {
      title: `Marriage Biodata Generator — Create Beautiful Marriage Biodata Free ${BASE_TITLE_SUFFIX}`,
      description: 'Create a beautiful marriage biodata online. Royal, Floral Elegant, Classic Serif, Modern templates. Add photo, family details, horoscope, and partner preferences. Instant PDF.',
      keywords: ['marriage biodata', 'marriage biodata format', 'biodata for marriage', 'shaadi biodata', 'marriage biodata generator', 'marriage biodata pdf', 'vivah biodata', 'kundli biodata'],
      ogTitle: 'Marriage Biodata Generator — Royal, Elegant & Modern Templates',
      ogDescription: 'Create a beautiful marriage biodata with photos, family details, and horoscope. Premium templates, instant PDF download.',
      canonicalUrl: `${BASE_URL}/marriage-biodata-generator`,
    },
  },
  {
    path: '/cover-letter-generator',
    seo: {
      title: `Free Cover Letter Generator — Write a Cover Letter Online ${BASE_TITLE_SUFFIX}`,
      description: 'Write a compelling cover letter in minutes. Guided form, professional templates, and instant PDF. Perfect for job applications in India.',
      keywords: ['cover letter generator', 'cover letter maker', 'create cover letter online', 'cover letter format india', 'free cover letter builder'],
      canonicalUrl: `${BASE_URL}/cover-letter-generator`,
    },
  },
  {
    path: '/job-application-letter-generator',
    seo: {
      title: `Job Application Letter Generator — Formal Application Letter ${BASE_TITLE_SUFFIX}`,
      description: 'Generate a formal job application letter in the traditional Indian format. Suitable for government, private sector, and walk-in interview applications.',
      keywords: ['job application letter', 'application letter format', 'job application generator', 'formal job letter india'],
      canonicalUrl: `${BASE_URL}/job-application-letter-generator`,
    },
  },
  {
    path: '/fresher-resume-generator',
    seo: {
      title: `Fresher Resume Generator — Resume for Freshers & Students ${BASE_TITLE_SUFFIX}`,
      description: 'Build a winning first-job resume with no work experience. Highlight education, internships, projects, and skills. ATS-optimised templates for freshers.',
      keywords: ['fresher resume', 'resume for freshers', 'fresher resume format', 'college student resume', 'first job resume india'],
      canonicalUrl: `${BASE_URL}/fresher-resume-generator`,
    },
  },
  {
    path: '/experienced-resume-generator',
    seo: {
      title: `Experienced Resume Generator — Resume for Senior Professionals ${BASE_TITLE_SUFFIX}`,
      description: 'Create a powerful resume for experienced professionals with 3+ years. Highlight leadership, career progression, and key achievements.',
      keywords: ['experienced resume', 'senior resume format', 'professional resume for experienced', '5 year experience resume'],
      canonicalUrl: `${BASE_URL}/experienced-resume-generator`,
    },
  },
  {
    path: '/teacher-resume-generator',
    seo: {
      title: `Teacher Resume Generator — Teaching Resume Format ${BASE_TITLE_SUFFIX}`,
      description: 'Create a professional teacher resume for schools, colleges, and education institutions. Includes teaching experience, subject expertise, and certifications.',
      keywords: ['teacher resume', 'teacher cv format', 'teaching resume india', 'educator resume template', 'school teacher resume'],
      canonicalUrl: `${BASE_URL}/teacher-resume-generator`,
    },
  },
  {
    path: '/developer-resume-generator',
    seo: {
      title: `Developer Resume Generator — Software Engineer Resume Builder ${BASE_TITLE_SUFFIX}`,
      description: 'Build a tech-focused resume for software developers and engineers. Highlight your tech stack, GitHub projects, and contributions.',
      keywords: ['developer resume', 'software engineer resume', 'programmer resume template', 'tech resume builder india', 'it resume format'],
      canonicalUrl: `${BASE_URL}/developer-resume-generator`,
    },
  },
  {
    path: '/designer-resume-generator',
    seo: {
      title: `Designer Resume Generator — UI/UX & Graphic Designer Resume ${BASE_TITLE_SUFFIX}`,
      description: 'Create a visually striking resume for designers. Premium creative templates perfect for UI/UX designers, graphic designers, and creative professionals.',
      keywords: ['designer resume', 'graphic designer resume', 'ui ux designer resume', 'creative resume template', 'portfolio resume'],
      canonicalUrl: `${BASE_URL}/designer-resume-generator`,
    },
  },
  {
    path: '/ats-resume-generator',
    seo: {
      title: `ATS Resume Generator — ATS-Friendly Resume Builder ${BASE_TITLE_SUFFIX}`,
      description: 'Generate a resume that passes ATS screening. Machine-readable layout, keyword-optimised sections, and clean formatting for Naukri, LinkedIn, and global job portals.',
      keywords: ['ATS resume', 'ATS friendly resume', 'ATS resume builder', 'applicant tracking system resume', 'ATS resume format'],
      canonicalUrl: `${BASE_URL}/ats-resume-generator`,
    },
  },
  {
    path: '/portfolio-resume-generator',
    seo: {
      title: `Portfolio Resume Generator — Combine Resume with Portfolio ${BASE_TITLE_SUFFIX}`,
      description: 'Create a combined resume and portfolio document for designers, developers, and creatives. Showcase your work alongside credentials in a single PDF.',
      keywords: ['portfolio resume', 'portfolio resume template', 'resume with portfolio', 'creative portfolio resume'],
      canonicalUrl: `${BASE_URL}/portfolio-resume-generator`,
    },
  },

  // ─── Dashboard routes (noindex) ───────────────────────────────────────────────
  {
    path: '/dashboard',
    seo: {
      title: 'Dashboard — DocForge',
      description: 'Your DocForge dashboard.',
      noindex: true,
      nofollow: true,
    },
  },
];

export const ROUTE_SEO_MAP = new Map<string, RouteSeoCofig>(
  ROUTE_SEO_CONFIG.map(r => [r.path, r]),
);

export function getSeoForRoute(path: string): RouteSeoCofig | undefined {
  return ROUTE_SEO_MAP.get(path);
}
