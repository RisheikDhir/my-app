// ─── User / Session Domain Models ──────────────────────────────────────────────

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  avatarBase64?: string; // locally uploaded photo
  locale: string;        // 'en', 'hi'
  createdAt: string;     // ISO date
  updatedAt: string;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;        // BCP 47 ('en', 'hi')
  defaultCurrency: string; // 'INR'
  notificationsEnabled: boolean;
  defaultGeneratorId?: string;
}

export interface UserStats {
  totalDocuments: number;
  totalDownloads: number;
  totalPayments: number;
  totalSpentInPaise: number;
  lastActiveAt: string;
}

export interface LocalSession {
  profileId: string;
  isGuest: boolean;
  startedAt: string;
  lastActiveAt: string;
  currentPlan: PlanId;
  creditBalance: number;
  accessGrants: AccessGrant[];
}

export type PlanId = 'free' | 'pro-monthly' | 'pro-yearly';

export interface AccessGrant {
  id: string;
  resourceId: string;     // templateId | 'pdf-download' | 'plan:pro-monthly' etc.
  resourceType: AccessResourceType;
  grantedAt: string;
  expiresAt?: string;     // null = perpetual
  paymentId: string;
  grantType: 'one-time' | 'subscription' | 'credit' | 'free';
}

export type AccessResourceType =
  | 'template'
  | 'pdf-download'
  | 'plan'
  | 'credit-pack'
  | 'generator';

export function createGuestProfile(): UserProfile {
  const now = new Date().toISOString();
  return {
    id: `guest_${Date.now()}`,
    displayName: 'Guest User',
    email: '',
    locale: 'en',
    createdAt: now,
    updatedAt: now,
    preferences: {
      theme: 'light',
      language: 'en',
      defaultCurrency: 'INR',
      notificationsEnabled: false,
    },
    stats: {
      totalDocuments: 0,
      totalDownloads: 0,
      totalPayments: 0,
      totalSpentInPaise: 0,
      lastActiveAt: now,
    },
  };
}

export function createLocalSession(profileId: string): LocalSession {
  return {
    profileId,
    isGuest: true,
    startedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
    currentPlan: 'free',
    creditBalance: 0,
    accessGrants: [],
  };
}
