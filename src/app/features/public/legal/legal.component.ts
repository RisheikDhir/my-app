import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

type LegalPage = 'privacy' | 'terms' | 'refund';

interface LegalContent {
  title: string;
  lastUpdated: string;
  sections: Array<{ heading: string; body: string }>;
}

const LEGAL: Record<LegalPage, LegalContent> = {
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'June 2025',
    sections: [
      { heading: 'Data Storage', body: 'DocForge stores all your document data exclusively in your browser\'s localStorage. We do not transmit your personal information to any external server. Your documents, names, photos, and all form data remain on your device only.' },
      { heading: 'Payment Data', body: 'Payment processing is handled entirely by Razorpay. DocForge does not store card numbers, UPI IDs, or banking credentials. We only store the Razorpay Payment ID (a reference number) to confirm payment status in your browser session.' },
      { heading: 'Analytics', body: 'We may collect anonymous usage data (page views, generator usage frequency) to improve the product. No personally identifiable information is included in analytics.' },
      { heading: 'Cookies', body: 'We use only essential browser storage (localStorage) required for the app to function. We do not use tracking cookies.' },
      { heading: 'Third-Party Services', body: 'We use Razorpay for payments and Google Fonts for typography. Please review their respective privacy policies.' },
      { heading: 'Contact', body: 'For privacy concerns, contact us at support@docforge.app.' },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    lastUpdated: 'June 2025',
    sections: [
      { heading: 'Acceptance', body: 'By using DocForge, you agree to these terms. If you disagree, please discontinue use.' },
      { heading: 'Service Description', body: 'DocForge is a browser-based document generation tool. All data processing occurs in your browser. We provide document templates and a form-filling interface.' },
      { heading: 'Free vs Paid', body: 'Preview is free for all users. A fee of ₹10 per download (or Pro plan price) is charged for watermark-free PDF downloads. Fees are non-refundable except as stated in our Refund Policy.' },
      { heading: 'User Responsibilities', body: 'You are responsible for the accuracy of information in your documents. DocForge is not liable for any consequences of incorrect document content.' },
      { heading: 'Intellectual Property', body: 'DocForge templates and software are proprietary. You own the content you enter into forms. You may not resell or redistribute DocForge templates.' },
      { heading: 'Limitation of Liability', body: 'DocForge is provided "as is". We are not liable for losses arising from use of the service, including but not limited to career or matrimonial outcomes.' },
    ],
  },
  refund: {
    title: 'Refund Policy',
    lastUpdated: 'June 2025',
    sections: [
      { heading: 'Refund Eligibility', body: 'You are eligible for a full refund if: (a) you paid but were unable to download your document due to a technical error on our part, or (b) you were charged twice for the same download.' },
      { heading: 'How to Request', body: 'Email support@docforge.app within 24 hours of payment with your Razorpay Payment ID and a description of the issue. Refunds are processed within 5–7 business days.' },
      { heading: 'Non-Refundable Cases', body: 'Refunds are not provided for: successfully completed downloads, change of mind after download, dissatisfaction with template design (we provide free preview before payment), or expired session access.' },
      { heading: 'Disputes', body: 'For payment disputes, contact support@docforge.app first. If unresolved, you may raise a dispute through Razorpay\'s resolution centre.' },
    ],
  },
};

@Component({
  selector: 'app-legal',
  standalone: true,
  template: `
    <div class="container legal-page">
      @if (content) {
        <h1>{{ content.title }}</h1>
        <p class="last-updated">Last updated: {{ content.lastUpdated }}</p>
        @for (section of content.sections; track section.heading) {
          <section class="legal-section">
            <h2>{{ section.heading }}</h2>
            <p>{{ section.body }}</p>
          </section>
        }
      }
    </div>
  `,
  styles: [`.container { max-width: 760px; margin: 0 auto; padding: 64px 24px 72px; } h1 { font-size: clamp(26px,4vw,38px); font-weight: 800; margin-bottom: 6px; } .last-updated { color: #9ca3af; font-size: 13px; margin-bottom: 40px; } .legal-section { margin-bottom: 28px; } h2 { font-size: 17px; font-weight: 700; margin-bottom: 8px; } p { font-size: 14.5px; color: #374151; line-height: 1.7; }`],
})
export class LegalComponent implements OnInit {
  private route = inject(ActivatedRoute);
  content: LegalContent | undefined;

  ngOnInit(): void {
    const page = (this.route.snapshot.data['page'] ?? 'privacy') as LegalPage;
    this.content = LEGAL[page];
  }
}
