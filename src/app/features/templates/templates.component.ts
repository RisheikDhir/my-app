import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { BiodataService } from '../../core/services/biodata.service';
import { SeoService } from '../../core/services/seo.service';
import { TEMPLATES, Template } from '../../core/models/biodata.models';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [RouterLink, NgStyle],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss',
})
export class TemplatesComponent implements OnInit {
  protected svc = inject(BiodataService);
  private seoSvc = inject(SeoService);

  protected templates = TEMPLATES;

  ngOnInit(): void {
    this.seoSvc.setPage({
      title: 'Marriage Biodata Templates — 5 Beautiful Designs',
      description: 'Browse 5 premium marriage biodata templates: Royal, Modern Minimal, Floral Elegant, Classic Serif, and Vibrant. All free, all customizable.',
    });
  }

  selectAndCreate(id: string): void {
    this.svc.selectTemplate(id);
  }

  getPreviewVars(t: Template): Record<string, string> {
    const fp = t.fontPairs[0];
    return {
      '--bio-primary': t.defaultColors.primary,
      '--bio-secondary': t.defaultColors.secondary,
      '--bio-accent': t.defaultColors.accent,
      '--bio-bg': t.defaultColors.background,
      '--bio-text': t.defaultColors.text,
      '--bio-border': t.defaultColors.border,
      '--bio-header-bg': t.defaultColors.headerBg,
      '--bio-header-text': t.defaultColors.headerText,
      '--bio-font-heading': fp.heading,
      '--bio-font-body': fp.body,
    };
  }

  getPreviewColors(t: Template): string[] {
    return [t.defaultColors.primary, t.defaultColors.accent, t.defaultColors.background];
  }
}
