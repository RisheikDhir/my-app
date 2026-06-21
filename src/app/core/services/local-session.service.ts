// ─── LocalSessionService ──────────────────────────────────────────────────────
// Manages the guest-mode user session persisted in localStorage.
// No server calls — all state is derived from storage on app boot.

import { Injectable, inject, signal, computed } from '@angular/core';
import { LocalStorageAdapter } from './local-storage.adapter';
import {
  UserProfile,
  LocalSession,
  PlanId,
  AccessGrant,
  createGuestProfile,
  createLocalSession,
} from '../models/user.models';

const PROFILE_KEY = 'user_profile';
const SESSION_KEY = 'user_session';

@Injectable({ providedIn: 'root' })
export class LocalSessionService {
  private storage = inject(LocalStorageAdapter);

  private _profile = signal<UserProfile | null>(null);
  private _session = signal<LocalSession | null>(null);

  readonly profile = this._profile.asReadonly();
  readonly session = this._session.asReadonly();

  readonly isAuthenticated = computed(() => !!this._profile() && !this._session()?.isGuest);

  readonly currentPlan = computed<PlanId>(() => this._session()?.currentPlan ?? 'free');

  readonly isPro = computed(() => {
    const plan = this.currentPlan();
    return plan === 'pro-monthly' || plan === 'pro-yearly';
  });

  readonly creditBalance = computed(() => this._session()?.creditBalance ?? 0);

  readonly accessGrants = computed(() => this._session()?.accessGrants ?? []);

  constructor() {
    this.load();
  }

  private load(): void {
    const profile = this.storage.get<UserProfile>(PROFILE_KEY);
    const session = this.storage.get<LocalSession>(SESSION_KEY);

    if (profile && session) {
      this._profile.set(profile);
      this._session.set(session);
    } else {
      this.initGuest();
    }
  }

  private initGuest(): void {
    const profile = createGuestProfile();
    const session = createLocalSession(profile.id);
    this.persist(profile, session);
  }

  private persist(profile: UserProfile, session: LocalSession): void {
    this.storage.set(PROFILE_KEY, profile);
    this.storage.set(SESSION_KEY, session);
    this._profile.set(profile);
    this._session.set(session);
  }

  updateProfile(patch: Partial<UserProfile>): void {
    const current = this._profile();
    if (!current) return;
    const updated: UserProfile = {
      ...current,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    this.storage.set(PROFILE_KEY, updated);
    this._profile.set(updated);
  }

  incrementDocumentCount(): void {
    const p = this._profile();
    if (!p) return;
    const stats = { ...p.stats, totalDocuments: p.stats.totalDocuments + 1 };
    this.updateProfile({ stats });
  }

  incrementDownloadCount(): void {
    const p = this._profile();
    if (!p) return;
    const stats = { ...p.stats, totalDownloads: p.stats.totalDownloads + 1 };
    this.updateProfile({ stats });
  }

  spendCredit(): boolean {
    const s = this._session();
    if (!s || s.creditBalance <= 0) return false;
    const updated: LocalSession = { ...s, creditBalance: s.creditBalance - 1 };
    this.storage.set(SESSION_KEY, updated);
    this._session.set(updated);
    return true;
  }

  addCredits(amount: number): void {
    const s = this._session();
    if (!s) return;
    const updated: LocalSession = { ...s, creditBalance: s.creditBalance + amount };
    this.storage.set(SESSION_KEY, updated);
    this._session.set(updated);
  }

  setPlan(plan: PlanId): void {
    const s = this._session();
    if (!s) return;
    const updated: LocalSession = { ...s, currentPlan: plan };
    this.storage.set(SESSION_KEY, updated);
    this._session.set(updated);
  }

  addAccessGrant(grant: AccessGrant): void {
    const s = this._session();
    if (!s) return;
    const grants = [...s.accessGrants.filter(g => g.id !== grant.id), grant];
    const updated: LocalSession = { ...s, accessGrants: grants };
    this.storage.set(SESSION_KEY, updated);
    this._session.set(updated);
  }

  hasAccessGrant(resourceId: string): boolean {
    return this.accessGrants().some(g => g.resourceId === resourceId);
  }

  markRegistered(displayName: string, email: string): void {
    this.updateProfile({ displayName, email });
    const s = this._session();
    if (!s) return;
    const updated: LocalSession = { ...s, isGuest: false };
    this.storage.set(SESSION_KEY, updated);
    this._session.set(updated);
  }

  logout(): void {
    this.storage.remove(PROFILE_KEY);
    this.storage.remove(SESSION_KEY);
    this.initGuest();
  }
}
