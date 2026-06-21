// ─── DraftAutosaveService ─────────────────────────────────────────────────────
// Periodically saves the generator editor's in-progress form state.
// Components call startAutosave()/stopAutosave() and bind a saveFn callback.

import { Injectable, inject, signal, NgZone } from '@angular/core';
import { LocalStorageAdapter } from './local-storage.adapter';

const DRAFT_PREFIX   = 'draft_';
const DEFAULT_DELAY  = 3000; // ms

export interface AutosaveStatus {
  state: 'idle' | 'pending' | 'saving' | 'saved' | 'error';
  savedAt: number | null;
}

@Injectable({ providedIn: 'root' })
export class DraftAutosaveService {
  private storage = inject(LocalStorageAdapter);
  private zone    = inject(NgZone);

  private timerId: ReturnType<typeof setTimeout> | null = null;
  private saveFn: (() => void) | null = null;

  private _status = signal<AutosaveStatus>({ state: 'idle', savedAt: null });
  readonly status = this._status.asReadonly();

  // ── Draft persistence (raw form data) ────────────────────────────────────────

  saveDraft(docId: string, formData: Record<string, unknown>): void {
    this.storage.set(`${DRAFT_PREFIX}${docId}`, formData);
  }

  loadDraft(docId: string): Record<string, unknown> | null {
    return this.storage.get<Record<string, unknown>>(`${DRAFT_PREFIX}${docId}`);
  }

  clearDraft(docId: string): void {
    this.storage.remove(`${DRAFT_PREFIX}${docId}`);
  }

  // ── Autosave loop ─────────────────────────────────────────────────────────────

  /**
   * Registers a callback to call every `delayMs` ms after the last markDirty() call.
   * Call this from the editor component on init.
   */
  startAutosave(saveFn: () => void, delayMs = DEFAULT_DELAY): void {
    this.saveFn = saveFn;
    this._status.set({ state: 'idle', savedAt: null });
  }

  /**
   * Call this whenever form data changes (e.g., on field blur or effect trigger).
   * Debounces the actual save by delayMs.
   */
  markDirty(delayMs = DEFAULT_DELAY): void {
    this._status.set({ state: 'pending', savedAt: this._status().savedAt });
    this.clearTimer();

    this.zone.runOutsideAngular(() => {
      this.timerId = setTimeout(() => {
        this.zone.run(() => this.flush());
      }, delayMs);
    });
  }

  /** Force an immediate save (e.g., on route change or beforeunload). */
  flush(): void {
    if (!this.saveFn) return;
    this._status.set({ state: 'saving', savedAt: this._status().savedAt });
    try {
      this.saveFn();
      this._status.set({ state: 'saved', savedAt: Date.now() });
    } catch (e) {
      console.error('[Autosave] save failed:', e);
      this._status.set({ state: 'error', savedAt: this._status().savedAt });
    }
  }

  stopAutosave(): void {
    this.clearTimer();
    this.saveFn = null;
    this._status.set({ state: 'idle', savedAt: null });
  }

  private clearTimer(): void {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}
