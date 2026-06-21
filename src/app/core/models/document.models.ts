// ─── Document / Draft Domain Models ───────────────────────────────────────────

export interface DocumentSectionItem {
  [fieldId: string]: string | string[] | boolean | null;
}

export interface DocumentSectionData {
  sectionId: string;
  items: DocumentSectionItem[]; // repeatable sections have multiple items; non-repeatable has one
  order: number;
  visible: boolean;
}

export interface ThemeOverrides {
  primaryColor?: string;
  accentColor?: string;
  fontPrimary?: string;
  fontSecondary?: string;
  fontSize?: 'sm' | 'md' | 'lg';
  spacing?: 'compact' | 'normal' | 'relaxed';
}

export interface PaymentAccess {
  isPremiumUnlocked: boolean;
  paymentIds: string[];   // payment IDs that unlocked this doc
  unlockedAt?: string;
  watermarkDisabled?: boolean;
}

export type DocumentStatus = 'draft' | 'completed' | 'downloaded';

export interface DocumentModel {
  id: string;
  profileId: string;           // local profile id (guest_ or user_)
  generatorId: string;         // e.g., 'resume', 'marriage-biodata'
  templateId: string;          // selected template id
  title: string;               // user-given name for this doc
  sections: DocumentSectionData[];
  themeOverrides: ThemeOverrides;
  status: DocumentStatus;
  paymentAccess: PaymentAccess;
  createdAt: string;           // ISO
  updatedAt: string;
  lastOpenedAt: string;
  downloadCount: number;
  previewSnapshotBase64?: string; // thumbnail of the preview (generated on save)
  tags?: string[];             // user-added tags
}

export interface DownloadRecord {
  id: string;
  documentId: string;
  profileId: string;
  format: 'pdf' | 'png' | 'print';
  templateId: string;
  generatorId: string;
  downloadedAt: string;
  paymentId?: string;
  fileSize?: number;           // bytes
}

export interface ExportRequest {
  documentId: string;
  format: 'pdf' | 'png' | 'print';
  templateId: string;
  themeOverrides?: ThemeOverrides;
  watermark?: boolean;
}

export interface ExportResult {
  success: boolean;
  format: 'pdf' | 'png' | 'print';
  filename?: string;
  paymentId?: string;
  downloadedAt?: string;
  error?: string;
}

export function createBlankDocument(
  profileId: string,
  generatorId: string,
  templateId: string,
  title: string,
): DocumentModel {
  const now = new Date().toISOString();
  return {
    id: `doc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    profileId,
    generatorId,
    templateId,
    title,
    sections: [],
    themeOverrides: {},
    status: 'draft',
    paymentAccess: { isPremiumUnlocked: false, paymentIds: [] },
    createdAt: now,
    updatedAt: now,
    lastOpenedAt: now,
    downloadCount: 0,
  };
}
