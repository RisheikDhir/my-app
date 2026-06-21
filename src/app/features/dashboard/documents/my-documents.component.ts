import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DocumentsFacade } from '../../../core/facades/documents.facade';
import { GeneratorRegistryService } from '../../../core/services/generator-registry.service';
import { DocumentModel } from '../../../core/models/document.models';

type Filter = 'all' | 'draft' | 'completed' | 'downloaded';

@Component({
  selector: 'app-my-documents',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './my-documents.component.html',
  styleUrl: './my-documents.component.scss',
})
export class MyDocumentsComponent {
  private docs    = inject(DocumentsFacade);
  private gens    = inject(GeneratorRegistryService);
  private router  = inject(Router);

  readonly filter   = signal<Filter>('all');
  readonly search   = signal('');
  readonly deleting = signal<string | null>(null);

  readonly filterTabs: { key: Filter; label: string }[] = [
    { key: 'all',        label: 'All' },
    { key: 'draft',      label: 'Drafts' },
    { key: 'completed',  label: 'Completed' },
    { key: 'downloaded', label: 'Downloaded' },
  ];

  readonly filteredDocs = computed(() => {
    const q = this.search().toLowerCase().trim();
    const f = this.filter();
    return this.docs.documents().filter(d => {
      const matchStatus = f === 'all' || d.status === f;
      const matchSearch = !q || d.title.toLowerCase().includes(q) || d.generatorId.includes(q);
      return matchStatus && matchSearch;
    });
  });

  setFilter(f: Filter): void { this.filter.set(f); }
  setSearch(v: string): void { this.search.set(v); }

  generatorFor(doc: DocumentModel) {
    return this.gens.getById(doc.generatorId);
  }

  edit(doc: DocumentModel): void {
    this.router.navigate(['/generator', doc.generatorId, doc.id, 'edit']);
  }

  confirmDelete(doc: DocumentModel): void {
    if (!confirm(`Delete "${doc.title}"? This cannot be undone.`)) return;
    this.docs.deleteDocument(doc.id);
  }

  statusColor(status: string): string {
    if (status === 'downloaded') return '#059669';
    if (status === 'completed')  return '#6366f1';
    return '#f59e0b';
  }

  readonly counts = computed(() => ({
    all:        this.docs.totalCount(),
    draft:      this.docs.draftDocs().length,
    completed:  this.docs.completedDocs().length,
    downloaded: this.docs.documents().filter(d => d.status === 'downloaded').length,
  }));
}
