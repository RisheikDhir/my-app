// ─── PaymentFacade ────────────────────────────────────────────────────────────
// Orchestrates Razorpay checkout in frontend-demo mode.
// SECURITY: Key Secret (b6kgzlcg4TZ9ZUwMwXa8ftR2) is NEVER in frontend code.
// Only rzp_test_T3Zt65kohJdv7E (Key ID) is used here.
// TODO: When backend is ready, swap openCheckout() to call POST /api/orders first,
//       then pass server-created order_id to Razorpay SDK, then verify signature
//       server-side via POST /api/payments/verify.

import { Injectable, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment';
import { LocalSessionService } from '../services/local-session.service';
import { LocalStorageAdapter } from '../services/local-storage.adapter';
import { DocumentsFacade } from './documents.facade';
import {
  PaymentRecord,
  PaymentIntent,
  PaymentStatus,
  RazorpaySuccessResponse,
} from '../models/payment.models';
import { AccessGrant, AccessResourceType } from '../models/user.models';

const PAYMENTS_KEY = 'payments_log';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

@Injectable({ providedIn: 'root' })
export class PaymentFacade {
  private doc     = inject(DOCUMENT);
  private session = inject(LocalSessionService);
  private storage = inject(LocalStorageAdapter);
  private docsFcd = inject(DocumentsFacade);

  private _processing = signal(false);
  private _lastError  = signal<string | null>(null);

  readonly processing = this._processing.asReadonly();
  readonly lastError  = this._lastError.asReadonly();

  // ── Public API ───────────────────────────────────────────────────────────────

  /**
   * Opens Razorpay checkout for a given intent.
   * Returns the created PaymentRecord on success, or null on cancel/failure.
   */
  checkout(intent: PaymentIntent): Promise<PaymentRecord | null> {
    return new Promise((resolve) => {
      this._processing.set(true);
      this._lastError.set(null);

      this.ensureRazorpaySdk().then(() => {
        const options = this.buildRazorpayOptions(intent, resolve);
        const rzp = new window.Razorpay(options);
        rzp.open();
      }).catch(err => {
        this._processing.set(false);
        this._lastError.set('Failed to load payment gateway. Please try again.');
        console.error('[PaymentFacade] SDK load error:', err);
        resolve(null);
      });
    });
  }

  /** Pay ₹10 to unlock a document for watermark-free PDF download. */
  async payForDownload(documentId: string): Promise<boolean> {
    const intent: PaymentIntent = {
      amount: environment.pricing.perDownloadPrice,
      currency: 'INR',
      purpose: 'pdf-download',
      resourceId: documentId,
      description: 'DocForge — Watermark-free PDF download (₹10)',
      prefill: this.buildPrefill(),
    };

    const record = await this.checkout(intent);
    if (!record) return false;

    this.docsFcd.unlockDocument(documentId, record.id);
    this.grantAccess(documentId, 'pdf-download', record.id, 'one-time');
    return true;
  }

  /** Pay for a Pro subscription plan. */
  async payForPlan(planId: 'pro-monthly' | 'pro-yearly'): Promise<boolean> {
    const amount = planId === 'pro-monthly'
      ? environment.pricing.proMonthlyPrice
      : environment.pricing.proYearlyPrice;

    const intent: PaymentIntent = {
      amount,
      currency: 'INR',
      purpose: 'premium-plan',
      resourceId: planId,
      description: `DocForge — ${planId === 'pro-monthly' ? 'Pro Monthly ₹199' : 'Pro Yearly ₹1499'}`,
      prefill: this.buildPrefill(),
    };

    const record = await this.checkout(intent);
    if (!record) return false;

    this.session.setPlan(planId);
    this.grantAccess(planId, 'plan', record.id, 'subscription');
    return true;
  }

  getPaymentHistory(): PaymentRecord[] {
    const profileId = this.session.profile()?.id;
    const all = this.storage.getOrDefault<PaymentRecord[]>(PAYMENTS_KEY, []);
    return profileId ? all.filter(p => p.profileId === profileId) : all;
  }

  // ── Private helpers ──────────────────────────────────────────────────────────

  private buildRazorpayOptions(
    intent: PaymentIntent,
    resolve: (r: PaymentRecord | null) => void,
  ): Record<string, unknown> {
    return {
      key: environment.razorpay.keyId,
      amount: intent.amount,
      currency: intent.currency,
      name: environment.razorpay.companyName,
      description: intent.description,
      image: environment.razorpay.companyLogo,
      theme: { color: environment.razorpay.themeColor },
      prefill: intent.prefill ?? {},
      notes: intent.notes ?? {},
      handler: (response: RazorpaySuccessResponse) => {
        const record = this.recordPayment(intent, response, 'success');
        this._processing.set(false);
        resolve(record);
      },
      modal: {
        ondismiss: () => {
          this._processing.set(false);
          resolve(null);
        },
      },
    };
  }

  private recordPayment(
    intent: PaymentIntent,
    response: RazorpaySuccessResponse,
    status: PaymentStatus,
  ): PaymentRecord {
    const profileId = this.session.profile()?.id ?? 'guest';
    const now = new Date().toISOString();
    const record: PaymentRecord = {
      id: `pay_local_${Date.now()}`,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpayOrderId: response.razorpay_order_id,
      razorpaySignature: response.razorpay_signature,
      profileId,
      amount: intent.amount,
      currency: intent.currency,
      status,
      purpose: intent.purpose,
      resourceId: intent.resourceId,
      metadata: intent.notes,
      createdAt: now,
      updatedAt: now,
      // NOTE: Always false in frontend-demo mode.
      // TODO: Set true after backend signature verification.
      isVerified: false,
    };

    const all = this.storage.getOrDefault<PaymentRecord[]>(PAYMENTS_KEY, []);
    this.storage.set(PAYMENTS_KEY, [...all, record]);
    return record;
  }

  private grantAccess(
    resourceId: string,
    resourceType: AccessResourceType,
    paymentId: string,
    grantType: 'one-time' | 'subscription' | 'credit' | 'free',
  ): void {
    const grant: AccessGrant = {
      id: `grant_${Date.now()}`,
      resourceId,
      resourceType,
      grantedAt: new Date().toISOString(),
      paymentId,
      grantType,
    };
    this.session.addAccessGrant(grant);
  }

  private buildPrefill(): { name?: string; email?: string } {
    const p = this.session.profile();
    return { name: p?.displayName, email: p?.email || undefined };
  }

  private ensureRazorpaySdk(): Promise<void> {
    if (typeof window.Razorpay !== 'undefined') return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = this.doc.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload  = () => resolve();
      script.onerror = () => reject(new Error('Razorpay SDK failed to load'));
      this.doc.head.appendChild(script);
    });
  }
}
