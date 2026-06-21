// ─── AccessControlService ─────────────────────────────────────────────────────
// Entitlement checks for templates, PDF downloads, and plan features.
// All decisions are based on the local session — no server calls.

import { Injectable, inject } from '@angular/core';
import { LocalSessionService } from './local-session.service';
import { DocumentsFacade } from '../facades/documents.facade';
import { getTemplateById } from '../config/templates.config';
import { getGeneratorById } from '../config/generators.config';

@Injectable({ providedIn: 'root' })
export class AccessControlService {
  private session = inject(LocalSessionService);
  private docs    = inject(DocumentsFacade);

  // ── Template access ──────────────────────────────────────────────────────────

  canUseTemplate(templateId: string): boolean {
    if (this.session.isPro()) return true;
    const template = getTemplateById(templateId);
    if (!template) return false;
    if (!template.isPremium) return true;
    return this.session.hasAccessGrant(templateId);
  }

  isTemplateFree(templateId: string): boolean {
    const t = getTemplateById(templateId);
    return t ? !t.isPremium : false;
  }

  isFreeForGenerator(templateId: string, generatorId: string): boolean {
    const gen = getGeneratorById(generatorId);
    if (!gen) return false;
    return gen.freeTemplateIds.includes(templateId);
  }

  // ── Download access ──────────────────────────────────────────────────────────

  canDownloadFree(documentId: string): boolean {
    const doc = this.docs.getById(documentId);
    if (!doc) return false;
    return doc.paymentAccess.isPremiumUnlocked || this.session.isPro();
  }

  /** Returns whether user can download without paying (Pro plan or already unlocked) */
  canDownloadWithoutPayment(documentId: string): boolean {
    if (this.session.isPro()) return true;
    const doc = this.docs.getById(documentId);
    return doc?.paymentAccess.isPremiumUnlocked ?? false;
  }

  isDocumentUnlocked(documentId: string): boolean {
    const doc = this.docs.getById(documentId);
    return doc?.paymentAccess.isPremiumUnlocked ?? false;
  }

  // ── Plan features ────────────────────────────────────────────────────────────

  canAccessDashboard(): boolean {
    // Dashboard is open to all (even guests); Pro features gated inside
    return true;
  }

  canSaveMultipleDocuments(): boolean {
    // Free users can save up to 5; Pro unlimited
    if (this.session.isPro()) return true;
    return this.docs.totalCount() < 5;
  }

  canUseCustomTheme(): boolean {
    return this.session.isPro();
  }

  canBulkDownload(): boolean {
    const plan = this.session.currentPlan();
    return plan === 'pro-yearly';
  }

  canViewDownloadHistory(): boolean {
    return this.session.isPro();
  }

  // ── Credit-based access ──────────────────────────────────────────────────────

  hasCredits(): boolean {
    return this.session.creditBalance() > 0;
  }

  canPayPerDownload(): boolean {
    // Per-download payment (₹10) is always allowed as a fallback
    return true;
  }

  // ── Watermark ────────────────────────────────────────────────────────────────

  shouldShowWatermark(documentId: string): boolean {
    if (this.session.isPro()) return false;
    const doc = this.docs.getById(documentId);
    return !(doc?.paymentAccess.watermarkDisabled ?? false);
  }
}
