import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { LocalStorageAdapter } from '../../../core/services/local-storage.adapter';
import { TemplateRegistryService } from '../../../core/services/template-registry.service';
import { DocumentTemplate } from '../../../core/models/template.models';

const SAVED_KEY = 'saved_template_ids';

@Component({
  selector: 'app-saved-templates',
  standalone: true,
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './saved-templates.component.html',
  styleUrl: './saved-templates.component.scss',
})
export class SavedTemplatesComponent {
  private storage   = inject(LocalStorageAdapter);
  private templates = inject(TemplateRegistryService);

  private savedIds = signal<string[]>(
    this.storage.getOrDefault<string[]>(SAVED_KEY, [])
  );

  readonly savedTemplates = computed<DocumentTemplate[]>(() =>
    this.savedIds()
      .map(id => this.templates.getById(id))
      .filter((t): t is DocumentTemplate => !!t)
  );

  unsave(id: string): void {
    const ids = this.savedIds().filter(i => i !== id);
    this.savedIds.set(ids);
    this.storage.set(SAVED_KEY, ids);
  }

  useTemplate(t: DocumentTemplate): string {
    const slug = t.category === 'universal' ? 'resume' : t.category;
    return `/generator/${slug}/new`;
  }
}
