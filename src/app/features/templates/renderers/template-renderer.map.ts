// ─── Template Renderer Map ────────────────────────────────────────────────────
// Maps template IDs to their Angular component class.
// NgComponentOutlet uses this map to dynamically load the correct template.

import { Type } from '@angular/core';
import { ResumeAtsTemplate }       from './resume-ats.template';
import { ResumeModernTemplate }    from './resume-modern.template';
import { BiodataModernTemplate }   from './biodata-modern.template';
import { BiodataRoyalTemplate }    from './biodata-royal.template';
import { LetterMinimalTemplate }   from './letter-minimal.template';
import { CvCleanTemplate }         from './cv-clean.template';
import { GenericFallbackTemplate } from './generic-fallback.template';

export const TEMPLATE_COMPONENT_MAP: Record<string, Type<unknown>> = {
  // ── Resume ────────────────────────────────────────────────────────────────
  'resume-ats':          ResumeAtsTemplate,
  'resume-minimal':      ResumeAtsTemplate,    // ATS layout serves minimal too
  'resume-modern':       ResumeModernTemplate,
  'resume-professional': ResumeModernTemplate,
  'resume-executive':    ResumeModernTemplate,
  'resume-creative':     ResumeModernTemplate,

  // ── CV ────────────────────────────────────────────────────────────────────
  'cv-clean':     CvCleanTemplate,
  'cv-academic':  CvCleanTemplate,
  'cv-executive': ResumeModernTemplate,

  // ── Biodata / Marriage Biodata ────────────────────────────────────────────
  'biodata-modern':        BiodataModernTemplate,
  'biodata-simple':        BiodataModernTemplate,
  'biodata-classic-serif': BiodataModernTemplate,
  'biodata-royal':         BiodataRoyalTemplate,
  'biodata-elegant':       BiodataRoyalTemplate,
  'biodata-vibrant':       BiodataModernTemplate,

  // ── Letters ───────────────────────────────────────────────────────────────
  'letter-minimal':      LetterMinimalTemplate,
  'letter-professional': LetterMinimalTemplate,
  'letter-formal-india': LetterMinimalTemplate,

  // ── Summary ───────────────────────────────────────────────────────────────
  'summary-clean':  GenericFallbackTemplate,
  'summary-modern': GenericFallbackTemplate,
};

export function getTemplateComponent(templateId: string): Type<unknown> {
  return TEMPLATE_COMPONENT_MAP[templateId] ?? GenericFallbackTemplate;
}
