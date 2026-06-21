// ─── DocumentsRepository ──────────────────────────────────────────────────────
// Raw CRUD for DocumentModel objects in the storage layer.
// No business logic — consumers (DocumentsFacade) layer that on top.

import { Injectable, inject } from '@angular/core';
import { LocalStorageAdapter } from '../services/local-storage.adapter';
import { DocumentModel, DownloadRecord, createBlankDocument } from '../models/document.models';

const DOCS_INDEX_KEY     = 'docs_index';      // string[] of doc ids
const DOC_KEY            = (id: string) => `doc_${id}`;
const DOWNLOADS_KEY      = 'downloads_log';   // DownloadRecord[]

@Injectable({ providedIn: 'root' })
export class DocumentsRepository {
  private storage = inject(LocalStorageAdapter);

  // ── Index helpers ────────────────────────────────────────────────────────────

  private readIndex(): string[] {
    return this.storage.getOrDefault<string[]>(DOCS_INDEX_KEY, []);
  }

  private writeIndex(ids: string[]): void {
    this.storage.set(DOCS_INDEX_KEY, ids);
  }

  // ── Documents ────────────────────────────────────────────────────────────────

  getAll(profileId?: string): DocumentModel[] {
    const ids = this.readIndex();
    const docs = ids
      .map(id => this.storage.get<DocumentModel>(DOC_KEY(id)))
      .filter((d): d is DocumentModel => d !== null);
    return profileId ? docs.filter(d => d.profileId === profileId) : docs;
  }

  getById(id: string): DocumentModel | null {
    return this.storage.get<DocumentModel>(DOC_KEY(id));
  }

  create(
    profileId: string,
    generatorId: string,
    templateId: string,
    title: string,
  ): DocumentModel {
    const doc = createBlankDocument(profileId, generatorId, templateId, title);
    this.storage.set(DOC_KEY(doc.id), doc);
    this.writeIndex([...this.readIndex(), doc.id]);
    return doc;
  }

  save(doc: DocumentModel): DocumentModel {
    const updated: DocumentModel = { ...doc, updatedAt: new Date().toISOString() };
    this.storage.set(DOC_KEY(doc.id), updated);

    // Ensure it's in the index
    const ids = this.readIndex();
    if (!ids.includes(doc.id)) {
      this.writeIndex([...ids, doc.id]);
    }
    return updated;
  }

  delete(id: string): void {
    this.storage.remove(DOC_KEY(id));
    this.writeIndex(this.readIndex().filter(i => i !== id));
  }

  touch(id: string): void {
    const doc = this.getById(id);
    if (!doc) return;
    this.save({ ...doc, lastOpenedAt: new Date().toISOString() });
  }

  // ── Downloads log ────────────────────────────────────────────────────────────

  logDownload(record: DownloadRecord): void {
    const logs = this.storage.getOrDefault<DownloadRecord[]>(DOWNLOADS_KEY, []);
    this.storage.set(DOWNLOADS_KEY, [...logs, record]);
  }

  getDownloads(profileId?: string): DownloadRecord[] {
    const logs = this.storage.getOrDefault<DownloadRecord[]>(DOWNLOADS_KEY, []);
    return profileId ? logs.filter(r => r.profileId === profileId) : logs;
  }
}
