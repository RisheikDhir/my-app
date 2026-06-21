// ─── DocumentsFacade ──────────────────────────────────────────────────────────
// Signals-based reactive layer over DocumentsRepository.
// Components interact only with this facade — never the repository directly.

import { Injectable, inject, signal, computed } from '@angular/core';
import { DocumentsRepository } from '../repositories/documents.repository';
import { LocalSessionService } from '../services/local-session.service';
import { DocumentModel, DownloadRecord } from '../models/document.models';

@Injectable({ providedIn: 'root' })
export class DocumentsFacade {
  private repo    = inject(DocumentsRepository);
  private session = inject(LocalSessionService);

  private _documents   = signal<DocumentModel[]>([]);
  private _activeDocId = signal<string | null>(null);
  private _loading     = signal(false);

  readonly documents   = this._documents.asReadonly();
  readonly loading     = this._loading.asReadonly();

  readonly activeDoc = computed(() => {
    const id = this._activeDocId();
    return id ? this._documents().find(d => d.id === id) ?? null : null;
  });

  readonly draftDocs = computed(() =>
    this._documents().filter(d => d.status === 'draft')
  );

  readonly completedDocs = computed(() =>
    this._documents().filter(d => d.status === 'completed' || d.status === 'downloaded')
  );

  readonly totalCount = computed(() => this._documents().length);

  constructor() {
    this.loadAll();
  }

  loadAll(): void {
    const profileId = this.session.profile()?.id;
    const docs = this.repo.getAll(profileId).sort(
      (a, b) => new Date(b.lastOpenedAt).getTime() - new Date(a.lastOpenedAt).getTime()
    );
    this._documents.set(docs);
  }

  createDocument(
    generatorId: string,
    templateId: string,
    title: string,
  ): DocumentModel {
    const profileId = this.session.profile()?.id ?? 'guest';
    const doc = this.repo.create(profileId, generatorId, templateId, title);
    this._documents.update(list => [doc, ...list]);
    this._activeDocId.set(doc.id);
    this.session.incrementDocumentCount();
    return doc;
  }

  saveDocument(doc: DocumentModel): DocumentModel {
    const saved = this.repo.save(doc);
    this._documents.update(list =>
      list.map(d => d.id === saved.id ? saved : d)
    );
    return saved;
  }

  deleteDocument(id: string): void {
    this.repo.delete(id);
    this._documents.update(list => list.filter(d => d.id !== id));
    if (this._activeDocId() === id) {
      this._activeDocId.set(null);
    }
  }

  setActive(id: string | null): void {
    if (id) this.repo.touch(id);
    this._activeDocId.set(id);
    if (id) {
      // Refresh from storage to get latest
      const fresh = this.repo.getById(id);
      if (fresh) {
        this._documents.update(list =>
          list.map(d => d.id === id ? fresh : d)
        );
      }
    }
  }

  getById(id: string): DocumentModel | null {
    return this._documents().find(d => d.id === id) ?? this.repo.getById(id);
  }

  unlockDocument(docId: string, paymentId: string): void {
    const doc = this.getById(docId);
    if (!doc) return;
    const updated: DocumentModel = {
      ...doc,
      paymentAccess: {
        ...doc.paymentAccess,
        isPremiumUnlocked: true,
        watermarkDisabled: true,
        paymentIds: [...doc.paymentAccess.paymentIds, paymentId],
        unlockedAt: new Date().toISOString(),
      },
    };
    this.saveDocument(updated);
  }

  recordDownload(record: DownloadRecord): void {
    this.repo.logDownload(record);
    const doc = this.getById(record.documentId);
    if (doc) {
      this.saveDocument({
        ...doc,
        downloadCount: doc.downloadCount + 1,
        status: 'downloaded',
      });
    }
    this.session.incrementDownloadCount();
  }

  getDownloads(): DownloadRecord[] {
    const profileId = this.session.profile()?.id;
    return this.repo.getDownloads(profileId);
  }
}
