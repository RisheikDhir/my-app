import { Component, inject, computed } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { BiodataService } from '../../../../core/services/biodata.service';
import { TEMPLATES, Template, TemplateColors } from '../../../../core/models/biodata.models';

@Component({
  selector: 'app-template-switcher',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './template-switcher.component.html',
  styleUrl: './template-switcher.component.scss',
})
export class TemplateSwitcherComponent {
  protected svc = inject(BiodataService);
  protected templates = TEMPLATES;

  protected colorKeys: { key: keyof TemplateColors; label: string }[] = [
    { key: 'primary', label: 'Primary' },
    { key: 'headerBg', label: 'Header' },
    { key: 'accent', label: 'Accent' },
    { key: 'background', label: 'Background' },
    { key: 'text', label: 'Text' },
  ];

  selectTemplate(id: string): void {
    this.svc.selectTemplate(id);
  }

  selectFontPair(id: string): void {
    this.svc.selectFontPair(id);
  }

  updateColor(key: keyof TemplateColors, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.svc.updateCustomColor(key, value);
  }

  getColorValue(key: keyof TemplateColors): string {
    return this.svc.effectiveColors()[key];
  }
}
