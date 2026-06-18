import { Component, input, computed, ElementRef, ViewChild } from '@angular/core';
import { NgStyle, NgClass } from '@angular/common';
import { BiodataData, Template, TemplateColors, FontPair } from '../../../../core/models/biodata.models';

@Component({
  selector: 'app-biodata-preview',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './biodata-preview.component.html',
  styleUrl: './biodata-preview.component.scss',
})
export class BiodataPreviewComponent {
  readonly biodata = input.required<BiodataData>();
  readonly template = input.required<Template>();
  readonly colors = input.required<TemplateColors>();
  readonly fontPair = input.required<FontPair>();

  @ViewChild('biodataPage') biodataPage!: ElementRef<HTMLElement>;

  getPageElement(): HTMLElement {
    return this.biodataPage.nativeElement;
  }

  readonly visibleSections = computed(() =>
    this.biodata().sections.filter(s => s.visible)
  );

  readonly cssVars = computed(() => {
    const c = this.colors();
    const fp = this.fontPair();
    return {
      '--bio-primary': c.primary,
      '--bio-secondary': c.secondary,
      '--bio-accent': c.accent,
      '--bio-bg': c.background,
      '--bio-text': c.text,
      '--bio-border': c.border,
      '--bio-header-bg': c.headerBg,
      '--bio-header-text': c.headerText,
      '--bio-font-heading': fp.heading,
      '--bio-font-body': fp.body,
    };
  });
}
