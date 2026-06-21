import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoMetaService } from './core/services/seo-meta.service';
import { ThemeService } from './core/services/theme.service';
import { UpgradeModalService } from './core/services/upgrade-modal.service';
import { ToastContainerComponent } from './shared/toast/toast-container.component';
import { ProUpgradeModalComponent } from './shared/pro-upgrade-modal/pro-upgrade-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastContainerComponent, ProUpgradeModalComponent],
  template: `
    <router-outlet />
    <app-toast-container />
    @if (upgradeModal.visible()) {
      <app-pro-upgrade-modal />
    }
  `,
})
export class App implements OnInit {
  private seo   = inject(SeoMetaService);
  private theme = inject(ThemeService);
  readonly upgradeModal = inject(UpgradeModalService);

  ngOnInit(): void {
    this.seo.init();
  }
}
