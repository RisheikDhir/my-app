import { Component, inject } from '@angular/core';
import { ToastService, Toast } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    <div class="toast-stack">
      @for (toast of toasts(); track toast.id) {
        <div class="toast" [class]="'toast-' + toast.type" (click)="dismiss(toast.id)">
          <span class="toast-icon">{{ icon(toast.type) }}</span>
          <span class="toast-msg">{{ toast.message }}</span>
          <button class="toast-close" aria-label="Dismiss">✕</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-stack {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-width: 360px;
    }

    .toast {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 500;
      color: #fff;
      box-shadow: 0 4px 20px rgba(0,0,0,0.18);
      cursor: pointer;
      animation: slide-in 0.2s ease-out;
      background: #374151;
    }

    .toast-success { background: #059669; }
    .toast-error   { background: #dc2626; }
    .toast-warning { background: #d97706; }
    .toast-info    { background: #0284c7; }

    .toast-icon { font-size: 15px; flex-shrink: 0; line-height: 1.4; }
    .toast-msg  { flex: 1; line-height: 1.4; }

    .toast-close {
      background: none;
      border: none;
      color: rgba(255,255,255,0.7);
      cursor: pointer;
      font-size: 12px;
      padding: 0;
      flex-shrink: 0;
      line-height: 1;

      &:hover { color: #fff; }
    }

    @keyframes slide-in {
      from { opacity: 0; transform: translateX(20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
  `],
})
export class ToastContainerComponent {
  private toastSvc = inject(ToastService);
  readonly toasts  = this.toastSvc.toasts;

  dismiss(id: string): void { this.toastSvc.remove(id); }

  icon(type: Toast['type']): string {
    return { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' }[type];
  }
}
