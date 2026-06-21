import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GENERATORS, getPopularGenerators } from '../../../core/config/generators.config';
import { GeneratorDefinition } from '../../../core/models/generator.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly popularGenerators: GeneratorDefinition[] = getPopularGenerators();
  readonly allGenerators: GeneratorDefinition[] = GENERATORS.slice(0, 12);

  readonly stats = [
    { value: '50K+',  label: 'Documents created' },
    { value: '20+',   label: 'Generator types' },
    { value: '15+',   label: 'Premium templates' },
    { value: '₹10',   label: 'Per download' },
  ];

  readonly howItWorks = [
    { step: '01', icon: '🎯', title: 'Choose a Generator', desc: 'Pick from 20+ document types — resume, CV, marriage biodata, cover letter, and more.' },
    { step: '02', icon: '✍️', title: 'Fill Your Details', desc: 'Our guided multi-step form makes it easy. Add sections, reorder them, and autosave as you go.' },
    { step: '03', icon: '👁️', title: 'Preview Live', desc: 'See your document update in real time as you type. Switch templates without losing any data.' },
    { step: '04', icon: '📄', title: 'Download PDF', desc: 'Pay just ₹10 to download a watermark-free PDF. Or upgrade to Pro for unlimited downloads.' },
  ];

  readonly testimonials = [
    { name: 'Priya Sharma', role: 'Software Engineer, Bengaluru', text: 'Got my dream job with a resume built on DocForge. The ATS template was exactly what I needed. Took less than 15 minutes!', rating: 5 },
    { name: 'Rahul Verma', role: 'MBA Graduate, Delhi', text: 'Created my marriage biodata in the Royal template. Stunning design, and my family loved it. Totally worth ₹10!', rating: 5 },
    { name: 'Anita Patel', role: 'School Teacher, Ahmedabad', text: 'The teacher resume template is perfect. Clean, professional, and the school appreciated the structured layout.', rating: 5 },
    { name: 'Karthik Subramanian', role: 'UI/UX Designer, Chennai', text: `Love the Creative template! It actually reflects my work style. Way better than anything I've seen for free.`, rating: 5 },
  ];

  readonly categories = [
    { icon: '📄', label: 'Resume Builder',    desc: '6 templates, ATS-optimised',     route: '/resume-generator',           color: '#3B82F6' },
    { icon: '📋', label: 'CV Generator',      desc: 'Academic & professional CVs',    route: '/cv-generator',               color: '#8B5CF6' },
    { icon: '💍', label: 'Marriage Biodata',  desc: 'Royal, Floral, Classic & Modern', route: '/marriage-biodata-generator', color: '#EC4899' },
    { icon: '🪪', label: 'Bio Data',          desc: 'Job application bio data',        route: '/biodata-generator',          color: '#10B981' },
    { icon: '✉️', label: 'Cover Letter',      desc: 'Professional letter templates',   route: '/cover-letter-generator',     color: '#F59E0B' },
    { icon: '📩', label: 'Job Application',   desc: 'Formal Indian letter format',     route: '/job-application-letter-generator', color: '#6366F1' },
  ];

  readonly faqs = [
    { q: 'Is DocForge completely free?', a: 'You can preview all documents for free without any signup. You pay only ₹10 to download a watermark-free PDF. Pro plan (₹199/month) gives unlimited downloads.' },
    { q: 'Is my data stored on DocForge servers?', a: 'No. All your document data is stored locally in your browser using localStorage. We never send your data to any server. Your documents are 100% private.' },
    { q: 'Can I create a marriage biodata in Hindi?', a: 'Yes! DocForge supports Hindi content for all form fields. You can also use Hindi for names, addresses, and all personal details.' },
    { q: 'Which is the best resume template for ATS?', a: 'Our "ATS Resume" and "Minimal Resume" templates are specifically designed for applicant tracking system compatibility — single column, clean formatting, no graphics.' },
    { q: 'Can I edit my document after downloading?', a: 'Yes, your draft is automatically saved in your browser. Return to DocForge and continue editing any time.' },
  ];

  getStars(count: number): number[] {
    return Array(count).fill(0);
  }

  getGeneratorRoute(g: GeneratorDefinition): string {
    return g.seoLandingRoute ?? `/generator/${g.slug}/new`;
  }
}
