// ─── TemplateRegistryService ──────────────────────────────────────────────────
// Injectable wrapper over templates.config.ts.

import { Injectable } from '@angular/core';
import {
  ALL_TEMPLATES,
  TEMPLATE_MAP,
  getTemplateById,
  getTemplateBySlug,
  getTemplatesForGenerator,
  getFreeTemplatesForGenerator,
} from '../config/templates.config';
import { DocumentTemplate } from '../models/template.models';

@Injectable({ providedIn: 'root' })
export class TemplateRegistryService {
  readonly all: DocumentTemplate[] = ALL_TEMPLATES;

  getById(id: string): DocumentTemplate | undefined {
    return getTemplateById(id);
  }

  getBySlug(slug: string): DocumentTemplate | undefined {
    return getTemplateBySlug(slug);
  }

  getForGenerator(generatorId: string, supportedIds: string[]): DocumentTemplate[] {
    return getTemplatesForGenerator(generatorId, supportedIds);
  }

  getFreeForGenerator(freeIds: string[]): DocumentTemplate[] {
    return getFreeTemplatesForGenerator(freeIds);
  }

  getPremium(): DocumentTemplate[] {
    return this.all.filter(t => t.isPremium);
  }

  getFree(): DocumentTemplate[] {
    return this.all.filter(t => !t.isPremium);
  }
}
