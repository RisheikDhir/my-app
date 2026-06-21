import { Component, inject, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PaymentFacade } from '../../../core/facades/payment.facade';

@Component({
  selector: 'app-my-payments',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './my-payments.component.html',
  styleUrl: './my-payments.component.scss',
})
export class MyPaymentsComponent {
  private payment = inject(PaymentFacade);

  readonly payments = computed(() =>
    this.payment.getPaymentHistory().slice().reverse()
  );

  purposeLabel(purpose: string): string {
    const map: Record<string, string> = {
      'pdf-download':   'PDF Download',
      'template-unlock': 'Template Unlock',
      'premium-plan':   'Pro Plan',
      'credit-pack':    'Credit Pack',
    };
    return map[purpose] ?? purpose;
  }

  statusColor(status: string): string {
    if (status === 'success')  return '#059669';
    if (status === 'failed')   return '#dc2626';
    if (status === 'refunded') return '#f59e0b';
    return '#6b7280';
  }
}
