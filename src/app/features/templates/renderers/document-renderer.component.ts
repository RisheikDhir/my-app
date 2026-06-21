// ─── DocumentRendererComponent ────────────────────────────────────────────────
// Wrapper that dynamically loads the correct template component using
// NgComponentOutlet based on the selected templateId.

import { Component, Input, OnChanges, SimpleChanges, computed, signal, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { DocumentSectionData } from '../../../core/models/document.models';
import { getTemplateComponent } from './template-renderer.map';

@Component({
  selector: 'app-document-renderer',
  standalone: true,
  imports: [NgComponentOutlet],
  template: `
    <ng-container
      [ngComponentOutlet]="rendererClass()"
      [ngComponentOutletInputs]="{ sections: _sections() }">
    </ng-container>
  `,
  styles: [':host { display: block; }'],
})
export class DocumentRendererComponent implements OnChanges {
  @Input() templateId: string = '';
  @Input() sections: DocumentSectionData[] = [];

  readonly _templateId = signal('');
  readonly _sections   = signal<DocumentSectionData[]>([]);

  ngOnChanges(c: SimpleChanges): void {
    if (c['templateId']) this._templateId.set(this.templateId);
    if (c['sections'])   this._sections.set(this.sections);
  }

  readonly rendererClass = computed<Type<unknown>>(() =>
    getTemplateComponent(this._templateId())
  );
}
