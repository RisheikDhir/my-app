import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalSessionService } from '../../../core/services/local-session.service';
import { PaymentFacade } from '../../../core/facades/payment.facade';
import { UpgradeModalService } from '../../../core/services/upgrade-modal.service';
import { SUBSCRIPTION_PLANS } from '../../../core/models/payment.models';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss',
})
export class BillingComponent {
  private session = inject(LocalSessionService);
  private payment = inject(PaymentFacade);
  private modal   = inject(UpgradeModalService);

  readonly currentPlan = this.session.currentPlan;
  readonly isPro       = this.session.isPro;
  readonly plans       = SUBSCRIPTION_PLANS;

  planLabel(): string {
    const p = this.currentPlan();
    if (p === 'pro-yearly')  return 'Pro Yearly';
    if (p === 'pro-monthly') return 'Pro Monthly';
    return 'Free';
  }

  openUpgradeModal(): void { this.modal.open(); }

  totalSpent(): number {
    return this.payment.getPaymentHistory()
      .filter(p => p.status === 'success')
      .reduce((s, p) => s + p.amount, 0) / 100;
  }
}
