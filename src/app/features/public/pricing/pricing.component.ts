import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SUBSCRIPTION_PLANS } from '../../../core/models/payment.models';
import { UpgradeModalService } from '../../../core/services/upgrade-modal.service';
import { LocalSessionService } from '../../../core/services/local-session.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  readonly plans   = SUBSCRIPTION_PLANS;
  readonly isPro   = inject(LocalSessionService).isPro;
  private modal    = inject(UpgradeModalService);

  formatPrice(paise: number): string {
    return paise === 0 ? 'Free' : `₹${paise / 100}`;
  }

  openUpgrade(): void { this.modal.open(); }
}
