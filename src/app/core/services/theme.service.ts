import { Injectable, inject, effect, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { LocalSessionService } from './local-session.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private doc        = inject(DOCUMENT);
  private session    = inject(LocalSessionService);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      const pref = this.session.profile()?.preferences.theme ?? 'light';
      const resolved = pref === 'system'
        ? (isPlatformBrowser(this.platformId) && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : pref;
      this.doc.documentElement.setAttribute('data-theme', resolved);
    });
  }

  setTheme(theme: 'light' | 'dark' | 'system'): void {
    const profile = this.session.profile();
    if (!profile) return;
    this.session.updateProfile({
      preferences: { ...profile.preferences, theme },
    });
  }

  current(): 'light' | 'dark' | 'system' {
    return this.session.profile()?.preferences.theme ?? 'light';
  }
}
