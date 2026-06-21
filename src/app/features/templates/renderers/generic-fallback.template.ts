import { Component, Input, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { DocumentSectionData } from '../../../core/models/document.models';
import { getPersonalInfo, getSummary, getSkills } from '../../../core/utils/doc-extractor.utils';

@Component({
  selector: 'tpl-generic-fallback',
  standalone: true,
  imports: [TitleCasePipe],
  template: `
<div class="gf-page">
  <header class="gf-header">
    <h1>{{ p().fullName }}</h1>
    @if (p().jobTitle) { <p class="gf-sub">{{ p().jobTitle }}</p> }
    <div class="gf-contact">
      @if (p().email)    { <span>{{ p().email }}</span> }
      @if (p().phone)    { <span>{{ p().phone }}</span> }
      @if (p().location) { <span>{{ p().location }}</span> }
    </div>
  </header>
  @if (summary()) {
    <section class="gf-sec">
      <h2>Summary</h2>
      <p>{{ summary() }}</p>
    </section>
  }
  @if (skills().length) {
    <section class="gf-sec">
      <h2>Skills</h2>
      <p>{{ skills().join(', ') }}</p>
    </section>
  }
  @for (sec of sections; track sec.sectionId) {
    @if (!['personal', 'summary', 'skills'].includes(sec.sectionId) && sec.items.length) {
      <section class="gf-sec">
        <h2>{{ sec.sectionId | titlecase }}</h2>
        @for (item of sec.items; track $index) {
          <div class="gf-item">
            @for (entry of objectEntries(item); track entry[0]) {
              @if (entry[1]) { <span class="gf-field">{{ entry[1] }}</span> }
            }
          </div>
        }
      </section>
    }
  }
</div>
  `,
  styles: [`
    .gf-page { font-family: Arial, sans-serif; font-size: 10.5pt; width: 210mm; min-height: 297mm; padding: 18mm; box-sizing: border-box; background: #fff; color: #111; }
    .gf-header { border-bottom: 2px solid #374151; padding-bottom: 10px; margin-bottom: 14px; }
    h1 { font-size: 20pt; margin: 0 0 4px; }
    .gf-sub { color: #555; margin: 0 0 6px; }
    .gf-contact { display: flex; gap: 10px; flex-wrap: wrap; font-size: 9pt; color: #555; }
    .gf-sec { margin-bottom: 12px; h2 { font-size: 11pt; border-bottom: 1px solid #e5e7eb; margin-bottom: 5px; padding-bottom: 2px; } }
    .gf-item { margin-bottom: 6px; display: flex; flex-wrap: wrap; gap: 4px; }
    .gf-field { font-size: 9.5pt; color: #374151; }
    .gf-field:not(:last-child)::after { content: ' · '; color: #9ca3af; }
  `],
})
export class GenericFallbackTemplate implements OnChanges {
  @Input() sections: DocumentSectionData[] = [];
  private readonly _s = signal<DocumentSectionData[]>([]);
  ngOnChanges(c: SimpleChanges): void { if (c['sections']) this._s.set(this.sections); }

  p       = computed(() => getPersonalInfo(this._s()));
  summary = computed(() => getSummary(this._s()));
  skills  = computed(() => getSkills(this._s()));

  objectEntries(obj: Record<string, unknown>): [string, unknown][] {
    return Object.entries(obj);
  }
}
