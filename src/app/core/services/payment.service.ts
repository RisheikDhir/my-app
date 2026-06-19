import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare let Razorpay: {
  new (options: RazorpayOptions): RazorpayInstance;
};

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  handler: (response: { razorpay_payment_id: string }) => void;
  prefill?: { name?: string; email?: string };
  notes?: Record<string, string>;
  theme?: { color: string };
  modal?: { ondismiss: () => void };
}

interface RazorpayInstance {
  open(): void;
  on(event: string, cb: (r: unknown) => void): void;
}

const RAZORPAY_KEY_ID = 'rzp_test_T3Zt65kohJdv7E';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private platformId = inject(PLATFORM_ID);
  private scriptLoaded = false;

  // Once paid in this session, all downloads are unlocked
  readonly isPaid = signal(false);
  readonly lastPaymentId = signal<string | null>(null);

  private async loadScript(): Promise<void> {
    if (this.scriptLoaded || !isPlatformBrowser(this.platformId)) return;
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[src*="razorpay"]');
      if (existing) { this.scriptLoaded = true; resolve(); return; }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => { this.scriptLoaded = true; resolve(); };
      script.onerror = () => reject(new Error('Failed to load Razorpay checkout'));
      document.head.appendChild(script);
    });
  }

  /** Opens the Razorpay checkout for ₹10. Resolves with payment ID on success. */
  async requestPayment(userName: string): Promise<string> {
    // Already paid this session — skip checkout
    if (this.isPaid()) return this.lastPaymentId()!;

    await this.loadScript();

    return new Promise<string>((resolve, reject) => {
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: 1000, // ₹10 in paise
        currency: 'INR',
        name: 'BiodataForge',
        description: 'Download Your Marriage Biodata',
        image: 'https://risheikdhir.github.io/my-app/favicon.ico',
        handler: (response) => {
          this.isPaid.set(true);
          this.lastPaymentId.set(response.razorpay_payment_id);
          resolve(response.razorpay_payment_id);
        },
        prefill: { name: userName },
        notes: { purpose: 'Biodata Download', app: 'BiodataForge' },
        theme: { color: '#6366F1' },
        modal: {
          ondismiss: () => reject(new Error('cancelled')),
        },
      };

      const rzp = new Razorpay(options);
      rzp.on('payment.failed', (r: unknown) => {
        const resp = r as { error?: { description?: string } };
        reject(new Error(resp?.error?.description ?? 'Payment failed'));
      });
      rzp.open();
    });
  }
}
