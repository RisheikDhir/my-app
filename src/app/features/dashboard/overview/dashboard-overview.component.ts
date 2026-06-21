import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { DocumentsFacade } from '../../../core/facades/documents.facade';
import { LocalSessionService } from '../../../core/services/local-session.service';
import { PaymentFacade } from '../../../core/facades/payment.facade';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.scss',
})
export class DashboardOverviewComponent {
  private docs    = inject(DocumentsFacade);
  private session = inject(LocalSessionService);
  private payment = inject(PaymentFacade);

  readonly profile      = this.session.profile;
  readonly currentPlan  = this.session.currentPlan;
  readonly isPro        = this.session.isPro;
  readonly recentDocs   = computed(() => this.docs.documents().slice(0, 5));
  readonly draftCount   = computed(() => this.docs.draftDocs().length);
  readonly completedCount = computed(() => this.docs.completedDocs().length);

  readonly totalSpent = computed(() => {
    const paise = this.payment.getPaymentHistory()
      .filter(p => p.status === 'success')
      .reduce((s, p) => s + p.amount, 0);
    return paise / 100;
  });

  readonly stats = computed(() => [
    { icon: '📄', value: String(this.docs.totalCount()),            label: 'Documents' },
    { icon: '⬇️', value: String(this.docs.getDownloads().length),  label: 'Downloads' },
    { icon: '💳', value: `₹${this.totalSpent()}`,                  label: 'Total Spent' },
    { icon: '🔖', value: this.planLabel(),                          label: 'Current Plan' },
  ]);

  readonly quickLinks = [
    { icon: '📄', label: 'New Resume',       route: '/generator/resume/new' },
    { icon: '💍', label: 'Marriage Biodata', route: '/generator/marriage-biodata/new' },
    { icon: '📋', label: 'New CV',           route: '/generator/cv/new' },
    { icon: '✉️', label: 'Cover Letter',     route: '/generator/cover-letter/new' },
  ];

  private planLabel(): string {
    const p = this.currentPlan();
    if (p === 'pro-yearly')  return 'Pro Yearly';
    if (p === 'pro-monthly') return 'Pro Monthly';
    return 'Free';
  }

  statusColor(status: string): string {
    if (status === 'downloaded') return '#059669';
    if (status === 'completed')  return '#6366f1';
    return '#f59e0b';
  }
}
