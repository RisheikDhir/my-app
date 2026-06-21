import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container">
      <div class="page-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about DocForge</p>
      </div>
      <div class="faqs">
        @for (faq of faqs; track faq.q) {
          <details class="faq-item">
            <summary>{{ faq.q }}</summary>
            <p [innerHTML]="faq.a"></p>
          </details>
        }
      </div>
      <div class="faq-cta">
        <p>Still have questions? <a routerLink="/contact">Contact us</a> — we respond within 24 hours.</p>
      </div>
    </div>
  `,
  styles: [`.container { max-width: 760px; margin: 0 auto; padding: 0 24px 72px; } .page-hero { text-align: center; padding: 64px 0 48px; h1 { font-size: clamp(26px,4vw,40px); font-weight: 800; } p { color: #6b7280; margin-top: 8px; } } .faqs { display: flex; flex-direction: column; gap: 8px; margin-bottom: 32px; } .faq-item { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; background: #fff; &[open] { box-shadow: 0 4px 16px rgba(0,0,0,0.06); } summary { padding: 18px 20px; font-size: 15px; font-weight: 600; cursor: pointer; list-style: none; &::-webkit-details-marker { display: none; } &::after { content: '+'; float: right; font-size: 20px; color: #6366f1; } } p { padding: 0 20px 18px; font-size: 14px; color: #6b7280; line-height: 1.65; a { color: #6366f1; } } } .faq-cta { text-align: center; font-size: 14px; color: #6b7280; a { color: #6366f1; font-weight: 500; } }`],
})
export class FaqComponent {
  readonly faqs = [
    { q: 'Is DocForge free to use?', a: 'Yes! DocForge is completely free to preview all documents. You only pay ₹10 when you want to download a watermark-free PDF.' },
    { q: 'Do I need to create an account?', a: 'No signup required. Your documents are saved locally in your browser. Just open DocForge and start creating.' },
    { q: 'Is my data private?', a: 'Absolutely. All your document data is stored only in your browser (localStorage). We never send your personal information to any server.' },
    { q: 'Can I create a marriage biodata in Hindi?', a: 'Yes! All form fields support Hindi. You can fill in names, addresses, and all personal details in Hindi.' },
    { q: 'Which resume template is best for ATS?', a: 'Use the "ATS Resume" or "Minimal Resume" template. These are single-column, clean designs specifically built for applicant tracking system compatibility.' },
    { q: 'Can I switch templates without losing my data?', a: 'Yes. Template switching only changes the visual design — your form data remains intact.' },
    { q: 'What payment methods does DocForge accept?', a: 'All payment methods via Razorpay: UPI (GPay, PhonePe, Paytm), debit/credit cards, net banking, and popular wallets.' },
    { q: 'Can I get a refund?', a: 'Yes. If you cannot download your document after payment, <a href="/contact">contact us</a> within 24 hours for a full refund. See our <a href="/refund-policy">Refund Policy</a>.' },
    { q: 'How many documents can I create?', a: 'Unlimited documents on free plan. Data is stored locally in your browser. Pro plan gives you organised document management in the dashboard.' },
    { q: 'Is DocForge suitable for government job applications?', a: 'Yes! Our "Bio Data" and "Formal Indian Letter" templates follow the standard format accepted by government offices and PSUs.' },
    { q: 'Can I use DocForge on my phone?', a: 'Yes, DocForge is fully responsive. The form and preview work on mobile, though desktop gives the best editing experience.' },
    { q: 'How do I download a PDF without a watermark?', a: 'Pay ₹10 via Razorpay. After payment, the PDF download is immediately unlocked for that session.' },
  ];
}
