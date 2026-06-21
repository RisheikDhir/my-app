import { Component, inject, signal } from '@angular/core';
import { PaymentFacade } from '../../core/facades/payment.facade';
import { UpgradeModalService } from '../../core/services/upgrade-modal.service';
import { ToastService } from '../../core/services/toast.service';
import { SUBSCRIPTION_PLANS } from '../../core/models/payment.models';

@Component({
  selector: 'app-pro-upgrade-modal',
  standalone: true,
  template: `
    <div class="modal-backdrop" (click)="close()">
      <div class="modal-box" (click)="$event.stopPropagation()">
        <button class="modal-close" (click)="close()" aria-label="Close">✕</button>

        <div class="modal-header">
          <span class="modal-crown">⭐</span>
          <h2>Upgrade to Pro</h2>
          <p class="modal-sub">Unlock all templates · Unlimited downloads · No watermark</p>
        </div>

        <div class="plans-row">
          @for (plan of plans; track plan.id) {
            <div class="plan-card" [class.highlighted]="plan.highlighted">
              @if (plan.badge) {
                <span class="badge-chip">{{ plan.badge }}</span>
              }
              <div class="plan-name">{{ plan.name }}</div>
              <div class="plan-price">
                ₹{{ plan.priceInPaise / 100 }}
                <span class="plan-period">/ {{ plan.interval }}</span>
              </div>
              @if (plan.id === 'pro-yearly') {
                <div class="plan-savings">Save ₹990 vs monthly</div>
              }
              <ul class="plan-features">
                @for (f of plan.features; track f) {
                  <li>✓ {{ f }}</li>
                }
              </ul>
              <button class="btn-upgrade"
                [class.primary]="plan.highlighted"
                [disabled]="!!upgrading()"
                (click)="upgrade(plan.id === 'pro-monthly' ? 'pro-monthly' : 'pro-yearly')">
                @if (upgrading() === plan.id) { Processing… }
                @else { Get Started }
              </button>
            </div>
          }
        </div>

        <p class="modal-footer-note">
          Secure payment via Razorpay · Cancel anytime · Indian prices inclusive of GST
        </p>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9000;
      padding: 20px;
      animation: fade-in 0.15s ease;
    }

    .modal-box {
      background: #fff;
      border-radius: 16px;
      padding: 36px 32px 28px;
      max-width: 640px;
      width: 100%;
      position: relative;
      box-shadow: 0 24px 64px rgba(0,0,0,0.22);
      animation: scale-in 0.2s ease;
    }

    .modal-close {
      position: absolute;
      top: 14px;
      right: 16px;
      background: none;
      border: none;
      font-size: 16px;
      color: #9ca3af;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;

      &:hover { background: #f3f4f6; color: #374151; }
    }

    .modal-header {
      text-align: center;
      margin-bottom: 28px;
    }

    .modal-crown { font-size: 32px; display: block; margin-bottom: 8px; }
    h2 { font-size: 22px; font-weight: 900; color: #111; margin-bottom: 6px; }
    .modal-sub { font-size: 13.5px; color: #6b7280; }

    .plans-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;

      @media (max-width: 500px) { grid-template-columns: 1fr; }
    }

    .plan-card {
      border: 1.5px solid #e5e7eb;
      border-radius: 12px;
      padding: 20px;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: border-color 0.15s;

      &.highlighted {
        border-color: #6366f1;
        background: #fafaff;
      }
    }

    .badge-chip {
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: #fff;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 10px;
      border-radius: 20px;
      white-space: nowrap;
      letter-spacing: 0.5px;
    }

    .plan-name { font-size: 14px; font-weight: 800; color: #111; margin-top: 4px; }

    .plan-price {
      font-size: 26px;
      font-weight: 900;
      color: #111;
      line-height: 1.1;
    }

    .plan-period { font-size: 13px; font-weight: 400; color: #9ca3af; }
    .plan-savings { font-size: 11px; font-weight: 700; color: #059669; background: #ecfdf5; padding: 2px 8px; border-radius: 20px; display: inline-block; }

    .plan-features {
      list-style: none;
      font-size: 12.5px;
      color: #374151;
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
      margin: 4px 0 8px;

      li { display: flex; gap: 6px; }
    }

    .btn-upgrade {
      width: 100%;
      padding: 10px;
      border-radius: 9px;
      border: 1.5px solid #e5e7eb;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      background: #fff;
      color: #374151;
      transition: all 0.15s;

      &.primary { background: #6366f1; color: #fff; border-color: #6366f1; }
      &:hover:not(:disabled) { opacity: 0.85; }
      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }

    .modal-footer-note {
      text-align: center;
      font-size: 11px;
      color: #9ca3af;
      margin-top: 20px;
    }

    @keyframes fade-in  { from { opacity: 0 } to { opacity: 1 } }
    @keyframes scale-in { from { transform: scale(0.95) } to { transform: scale(1) } }
  `],
})
export class ProUpgradeModalComponent {
  readonly plans    = SUBSCRIPTION_PLANS.filter(p => p.id !== 'free');
  readonly upgrading = signal<string | null>(null);

  private payment = inject(PaymentFacade);
  private modal   = inject(UpgradeModalService);
  private toast   = inject(ToastService);

  async upgrade(planId: 'pro-monthly' | 'pro-yearly'): Promise<void> {
    this.upgrading.set(planId);
    const ok = await this.payment.payForPlan(planId);
    this.upgrading.set(null);
    if (ok) {
      this.toast.success('You are now a Pro member! Enjoy unlimited downloads.');
      this.modal.close();
    } else {
      this.toast.error('Payment was not completed. Please try again.');
    }
  }

  close(): void { this.modal.close(); }
}
