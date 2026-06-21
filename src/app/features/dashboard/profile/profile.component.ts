import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { LocalSessionService } from '../../../core/services/local-session.service';
import { ThemeService } from '../../../core/services/theme.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private session = inject(LocalSessionService);
  private themeSvc = inject(ThemeService);
  private toast    = inject(ToastService);

  name    = signal('');
  email   = signal('');
  phone   = signal('');
  lang    = signal('en');
  theme   = signal<'light' | 'dark' | 'system'>('light');
  saving  = signal(false);

  readonly initials = computed(() => {
    const n = this.name().trim();
    if (!n) return 'G';
    const parts = n.split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : n.slice(0, 2).toUpperCase();
  });

  readonly themeOptions: { value: 'light' | 'dark' | 'system'; label: string; icon: string }[] = [
    { value: 'light',  label: 'Light',  icon: '☀️' },
    { value: 'dark',   label: 'Dark',   icon: '🌙' },
    { value: 'system', label: 'System', icon: '💻' },
  ];

  ngOnInit(): void {
    const p = this.session.profile();
    if (!p) return;
    this.name.set(p.displayName ?? '');
    this.email.set(p.email ?? '');
    this.phone.set(p.phone ?? '');
    this.lang.set(p.preferences?.language ?? 'en');
    this.theme.set(p.preferences?.theme ?? 'light');
  }

  setTheme(t: 'light' | 'dark' | 'system'): void {
    this.theme.set(t);
    this.themeSvc.setTheme(t);
  }

  async save(): Promise<void> {
    this.saving.set(true);
    await new Promise(r => setTimeout(r, 350));
    this.session.updateProfile({
      displayName: this.name().trim(),
      email: this.email().trim(),
      phone: this.phone().trim(),
      preferences: {
        ...this.session.profile()!.preferences,
        language: this.lang(),
        theme: this.theme(),
      },
    });
    this.saving.set(false);
    this.toast.success('Profile saved successfully!');
  }

  set(field: 'name' | 'email' | 'phone', v: string): void {
    if (field === 'name')  this.name.set(v);
    if (field === 'email') this.email.set(v);
    if (field === 'phone') this.phone.set(v);
  }
}
