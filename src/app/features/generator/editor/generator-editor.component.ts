import {
  Component, inject, OnInit, OnDestroy, signal, computed, ViewChild, ElementRef, PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import { getGeneratorBySlug } from '../../../core/config/generators.config';
import { getTemplatesForGenerator } from '../../../core/config/templates.config';
import { GeneratorDefinition, GeneratorSectionSchema, GeneratorFieldSchema } from '../../../core/models/generator.models';
import { DocumentTemplate } from '../../../core/models/template.models';
import { DocumentSectionData, DocumentSectionItem } from '../../../core/models/document.models';
import { DocumentsFacade } from '../../../core/facades/documents.facade';
import { DraftAutosaveService } from '../../../core/services/draft-autosave.service';
import { ExportService } from '../../../core/services/export.service';
import { AccessControlService } from '../../../core/services/access-control.service';
import { ToastService } from '../../../core/services/toast.service';
import { DocumentRendererComponent } from '../../templates/renderers/document-renderer.component';

@Component({
  selector: 'app-generator-editor',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet, DocumentRendererComponent],
  templateUrl: './generator-editor.component.html',
  styleUrl: './generator-editor.component.scss',
})
export class GeneratorEditorComponent implements OnInit, OnDestroy {
  @ViewChild('previewEl') previewEl!: ElementRef<HTMLElement>;

  private route      = inject(ActivatedRoute);
  private router     = inject(Router);
  private docsFcd    = inject(DocumentsFacade);
  private autosave   = inject(DraftAutosaveService);
  private platformId = inject(PLATFORM_ID);
  readonly exporter  = inject(ExportService);
  private access     = inject(AccessControlService);
  private toast      = inject(ToastService);

  generator       = signal<GeneratorDefinition | null>(null);
  templates       = signal<DocumentTemplate[]>([]);
  activeTemplate  = signal<DocumentTemplate | null>(null);
  activeStepIndex = signal(0);
  sectionData     = signal<DocumentSectionData[]>([]);
  docId           = signal<string | null>(null);
  docTitle        = signal('Untitled Document');
  saving          = signal(false);
  downloading     = signal(false);
  saveStatus      = signal<'idle' | 'saving' | 'saved'>('idle');
  draftRestored   = signal(false);

  readonly steps = computed(() => this.generator()?.formSchema.steps ?? []);
  readonly activeStep = computed<GeneratorSectionSchema | null>(
    () => this.steps()[this.activeStepIndex()] ?? null,
  );

  readonly completionPercent = computed(() => {
    const gen = this.generator();
    if (!gen) return 0;
    const required = this.steps().filter(s => !s.optional);
    if (!required.length) return 0;
    const done = required.filter(s => {
      const sec = this.sectionData().find(d => d.sectionId === s.id);
      const item = sec?.items[0] ?? {};
      return (s.completionFields ?? []).some(f => !!item[f]);
    }).length;
    return Math.round((done / required.length) * 100);
  });

  readonly canDownloadFree = computed(() => {
    const id = this.docId();
    return id ? this.access.canDownloadWithoutPayment(id) : false;
  });

  readonly previewSections = computed(() => this.sectionData());

  ngOnInit(): void {
    const slug  = this.route.snapshot.paramMap.get('slug') ?? '';
    const id    = this.route.snapshot.paramMap.get('id');
    const gen   = getGeneratorBySlug(slug);
    if (!gen) return;

    this.generator.set(gen);

    const tpls = getTemplatesForGenerator(gen.id, gen.supportedTemplateIds);
    this.templates.set(tpls);

    if (id) {
      this.docId.set(id);
      const doc = this.docsFcd.getById(id);
      if (doc) {
        this.docTitle.set(doc.title);
        this.activeTemplate.set(tpls.find(t => t.id === doc.templateId) ?? tpls[0] ?? null);
        this.sectionData.set(doc.sections.length ? doc.sections : this.buildEmptySections(gen));
        this.docsFcd.setActive(id);
      }
    } else {
      this.activeTemplate.set(tpls[0] ?? null);
      // Check for saved draft
      const draft = this.autosave.loadDraft(`new_${gen.slug}`);
      if (draft?.['sections']) {
        this.sectionData.set(draft['sections'] as DocumentSectionData[]);
        this.draftRestored.set(true);
        setTimeout(() => this.draftRestored.set(false), 4000);
      } else {
        this.sectionData.set(this.buildEmptySections(gen));
      }
    }

    this.autosave.startAutosave(() => this.persistDocument());
  }

  ngOnDestroy(): void {
    this.autosave.flush();
    this.autosave.stopAutosave();
  }

  // ── Section data management ───────────────────────────────────────────────

  private buildEmptySections(gen: GeneratorDefinition): DocumentSectionData[] {
    return gen.formSchema.steps.map((step, i) => ({
      sectionId: step.id,
      items: [{}],
      order: i,
      visible: true,
    }));
  }

  updateField(sectionId: string, fieldId: string, value: string | string[] | boolean | null): void {
    this.sectionData.update(sections =>
      sections.map(s => s.sectionId !== sectionId ? s : {
        ...s,
        items: [{ ...s.items[0], [fieldId]: value }],
      })
    );
    this.autosave.markDirty();
  }

  updateRepeatableField(sectionId: string, itemIndex: number, fieldId: string, value: string | string[] | boolean | null): void {
    this.sectionData.update(sections =>
      sections.map(s => {
        if (s.sectionId !== sectionId) return s;
        const items = [...s.items];
        items[itemIndex] = { ...items[itemIndex], [fieldId]: value };
        return { ...s, items };
      })
    );
    this.autosave.markDirty();
  }

  addRepeatableItem(sectionId: string): void {
    this.sectionData.update(sections =>
      sections.map(s => s.sectionId !== sectionId ? s : {
        ...s, items: [...s.items, {}],
      })
    );
    this.autosave.markDirty();
  }

  removeRepeatableItem(sectionId: string, itemIndex: number): void {
    this.sectionData.update(sections =>
      sections.map(s => {
        if (s.sectionId !== sectionId || s.items.length <= 1) return s;
        const items = s.items.filter((_, i) => i !== itemIndex);
        return { ...s, items };
      })
    );
    this.autosave.markDirty();
  }

  getFieldValue(sectionId: string, fieldId: string, itemIndex = 0): string | string[] | boolean | null {
    const sec = this.sectionData().find(s => s.sectionId === sectionId);
    return sec?.items[itemIndex]?.[fieldId] ?? '';
  }

  getItems(sectionId: string): DocumentSectionItem[] {
    return this.sectionData().find(s => s.sectionId === sectionId)?.items ?? [{}];
  }

  shouldShowField(field: GeneratorFieldSchema, sectionId: string, itemIndex = 0): boolean {
    if (!field.showWhen) return true;
    const val = this.getFieldValue(sectionId, field.showWhen.fieldId, itemIndex);
    return val === field.showWhen.equals;
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  goToStep(index: number): void {
    if (index >= 0 && index < this.steps().length) {
      this.autosave.flush();
      this.activeStepIndex.set(index);
    }
  }
  nextStep(): void { this.goToStep(this.activeStepIndex() + 1); }
  prevStep(): void { this.goToStep(this.activeStepIndex() - 1); }

  selectTemplate(t: DocumentTemplate): void { this.activeTemplate.set(t); }

  // ── Persistence ───────────────────────────────────────────────────────────

  private persistDocument(): void {
    this.saveStatus.set('saving');
    const gen = this.generator();
    if (!gen) return;

    const id = this.docId();
    if (id) {
      const doc = this.docsFcd.getById(id);
      if (doc) {
        this.docsFcd.saveDocument({
          ...doc,
          sections: this.sectionData(),
          templateId: this.activeTemplate()?.id ?? doc.templateId,
          title: this.docTitle(),
        });
      }
    } else {
      // Auto-create document on first autosave
      const created = this.docsFcd.createDocument(
        gen.id,
        this.activeTemplate()?.id ?? gen.supportedTemplateIds[0] ?? '',
        this.docTitle(),
      );
      this.docId.set(created.id);
      this.docsFcd.saveDocument({ ...created, sections: this.sectionData() });
      // Save draft key pointing to new doc id
      this.autosave.clearDraft(`new_${gen.slug}`);
    }
    this.saveStatus.set('saved');
    setTimeout(() => this.saveStatus.set('idle'), 2000);
  }

  async complete(): Promise<void> {
    this.autosave.flush();
    const id = this.docId();
    if (id) {
      const doc = this.docsFcd.getById(id);
      if (doc) this.docsFcd.saveDocument({ ...doc, status: 'completed' });
    }
    await this.downloadPdf();
  }

  async downloadPdf(): Promise<void> {
    const previewEl = this.previewEl?.nativeElement;
    if (!previewEl || !this.docId()) return;
    this.downloading.set(true);
    const title = this.docTitle() || 'document';
    const ok = await this.exporter.downloadPdf(previewEl, this.docId()!, title);
    this.downloading.set(false);
    if (ok) this.toast.success('PDF downloaded successfully!');
    else    this.toast.info('Payment cancelled. PDF not downloaded.');
  }

  async shareLink(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      this.toast.success('Link copied to clipboard!');
    } catch {
      this.toast.error('Could not copy link. Please copy the URL manually.');
    }
  }

  // ── Field helper methods (called from template) ───────────────────────────

  inputType(fieldType: string): string {
    const map: Record<string, string> = {
      email: 'email', phone: 'tel', url: 'url',
      number: 'number', date: 'date', year: 'number',
    };
    return map[fieldType] ?? 'text';
  }

  asArray(value: unknown): string[] {
    if (Array.isArray(value)) return value as string[];
    if (typeof value === 'string' && value) return value.split(',').map(v => v.trim()).filter(Boolean);
    return [];
  }

  addTag(event: Event, sectionId: string, fieldId: string, idx: number, repeatable: boolean): void {
    event.preventDefault();
    this.commitTags(event.target as HTMLInputElement, sectionId, fieldId, idx, repeatable);
  }

  onTagBlur(event: FocusEvent, sectionId: string, fieldId: string, idx: number, repeatable: boolean): void {
    this.commitTags(event.target as HTMLInputElement, sectionId, fieldId, idx, repeatable);
  }

  private commitTags(input: HTMLInputElement, sectionId: string, fieldId: string, idx: number, repeatable: boolean): void {
    const raw = input.value.trim();
    if (!raw) return;
    const incoming = raw.split(',').map(t => t.trim()).filter(Boolean);
    const current = this.asArray(this.getFieldValue(sectionId, fieldId, idx));
    const toAdd = incoming.filter(t => !current.includes(t));
    if (!toAdd.length) { input.value = ''; return; }
    const updated = [...current, ...toAdd];
    repeatable
      ? this.updateRepeatableField(sectionId, idx, fieldId, updated)
      : this.updateField(sectionId, fieldId, updated);
    input.value = '';
  }

  removeTag(sectionId: string, fieldId: string, idx: number, tag: string, repeatable: boolean): void {
    const updated = this.asArray(this.getFieldValue(sectionId, fieldId, idx)).filter(t => t !== tag);
    repeatable
      ? this.updateRepeatableField(sectionId, idx, fieldId, updated)
      : this.updateField(sectionId, fieldId, updated);
  }

  onPhotoSelected(event: Event, sectionId: string, fieldId: string, idx: number, repeatable: boolean): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      repeatable
        ? this.updateRepeatableField(sectionId, idx, fieldId, dataUrl)
        : this.updateField(sectionId, fieldId, dataUrl);
    };
    reader.readAsDataURL(file);
  }
}
