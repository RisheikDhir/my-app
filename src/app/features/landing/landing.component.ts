import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  private seoSvc = inject(SeoService);

  ngOnInit(): void {
    this.seoSvc.setPage({
      title: 'Free Marriage Biodata Maker — Beautiful Biodatas in Minutes',
      description: 'Create a stunning marriage biodata online for free. Choose from 5 beautiful templates, add your photo, and download a perfect A4 PDF instantly. No sign-up needed.',
      keywords: 'marriage biodata maker, free biodata format for marriage, matrimonial biodata creator with photo, biodata for marriage PDF, Hindu biodata maker online',
    });
  }

  readonly features = [
    { icon: '🎨', title: '5 Beautiful Templates', desc: 'Royal, Modern, Floral, Classic, and Vibrant — each fully customizable.' },
    { icon: '⚡', title: 'Live Preview', desc: 'See your biodata update in real-time as you type.' },
    { icon: '📄', title: 'Perfect PDF Export', desc: 'Download a crisp A4 PDF or a PNG image for WhatsApp sharing.' },
    { icon: '🔒', title: 'Private & Secure', desc: 'Everything stays in your browser. No account, no cloud storage.' },
    { icon: '✏️', title: 'Fully Customizable', desc: 'Add custom fields, reorder sections with drag & drop, toggle colors.' },
    { icon: '📱', title: 'Mobile Friendly', desc: 'Works perfectly on phones and tablets too.' },
  ];

  readonly faqs = [
    {
      q: 'Is BiodataForge completely free?',
      a: 'Yes, completely free. No sign-up required. Create, customize, and download your biodata at no cost.',
    },
    {
      q: 'Will my data be saved?',
      a: 'Your data is saved automatically in your browser\'s local storage. It persists across page refreshes. Nothing is sent to a server.',
    },
    {
      q: 'Can I add custom fields to my biodata?',
      a: 'Absolutely. You can add custom fields to any existing section, or create entirely new sections with your own title.',
    },
    {
      q: 'What format is the downloaded biodata in?',
      a: 'You can download as a high-quality A4 PDF (perfect for printing) or as a PNG image (great for WhatsApp sharing).',
    },
    {
      q: 'Can I use Devanagari/Hindi text in my biodata?',
      a: 'Yes. All templates support Unicode text including Hindi and other Indic scripts.',
    },
    {
      q: 'How do I change the template?',
      a: 'In the editor, click "Templates & Style" in the preview panel. You can switch templates, change colors, and choose font pairs without losing your entered data.',
    },
  ];
}
