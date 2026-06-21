// ─── LocalStorage Adapter ─────────────────────────────────────────────────────
// Concrete StorageAdapter backed by window.localStorage.
// SSR-safe: all reads/writes are no-ops on the server.

import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StorageAdapter } from './storage.adapter';

const STORAGE_PREFIX = 'docforge_';

@Injectable({ providedIn: 'root' })
export class LocalStorageAdapter extends StorageAdapter {
  private platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private fullKey(key: string): string {
    return key.startsWith(STORAGE_PREFIX) ? key : `${STORAGE_PREFIX}${key}`;
  }

  get<T>(key: string): T | null {
    if (!this.isBrowser) return null;
    try {
      const raw = localStorage.getItem(this.fullKey(key));
      return raw !== null ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(this.fullKey(key), JSON.stringify(value));
    } catch (e) {
      // quota exceeded or private mode — fail silently
      console.warn('[StorageAdapter] setItem failed:', e);
    }
  }

  remove(key: string): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(this.fullKey(key));
  }

  clear(): void {
    if (!this.isBrowser) return;
    // Only remove keys that belong to this app (respect other apps on same origin)
    this.keys().forEach(k => localStorage.removeItem(k));
  }

  has(key: string): boolean {
    if (!this.isBrowser) return false;
    return localStorage.getItem(this.fullKey(key)) !== null;
  }

  keys(): string[] {
    if (!this.isBrowser) return [];
    return Object.keys(localStorage).filter(k => k.startsWith(STORAGE_PREFIX));
  }
}
