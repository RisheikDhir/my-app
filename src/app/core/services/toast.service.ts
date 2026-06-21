import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(message: string, type: ToastType = 'info', duration = 3500): void {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    this._toasts.update(t => [...t, { id, message, type }]);
    setTimeout(() => this.remove(id), duration);
  }

  success(msg: string): void { this.show(msg, 'success'); }
  error(msg: string):   void { this.show(msg, 'error', 5000); }
  info(msg: string):    void { this.show(msg, 'info'); }
  warning(msg: string): void { this.show(msg, 'warning'); }

  remove(id: string): void {
    this._toasts.update(t => t.filter(x => x.id !== id));
  }
}
