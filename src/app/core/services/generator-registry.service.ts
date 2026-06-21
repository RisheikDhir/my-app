// ─── GeneratorRegistryService ─────────────────────────────────────────────────
// Injectable wrapper over generators.config.ts.
// Components inject this instead of calling config functions directly,
// keeping the config pure-data and the service layer testable.

import { Injectable } from '@angular/core';
import {
  GENERATORS,
  GENERATOR_MAP,
  getGeneratorById,
  getGeneratorBySlug,
  getGeneratorsByCategory,
  getPopularGenerators,
  getFreeGenerators,
} from '../config/generators.config';
import { GeneratorDefinition, GeneratorCategory } from '../models/generator.models';

@Injectable({ providedIn: 'root' })
export class GeneratorRegistryService {
  readonly all: GeneratorDefinition[] = GENERATORS;

  getById(id: string): GeneratorDefinition | undefined {
    return getGeneratorById(id);
  }

  getBySlug(slug: string): GeneratorDefinition | undefined {
    return getGeneratorBySlug(slug);
  }

  getByCategory(category: GeneratorCategory): GeneratorDefinition[] {
    return getGeneratorsByCategory(category);
  }

  getPopular(): GeneratorDefinition[] {
    return getPopularGenerators();
  }

  getFree(): GeneratorDefinition[] {
    return getFreeGenerators();
  }

  search(query: string): GeneratorDefinition[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.all;
    return this.all.filter(g =>
      g.name.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.tags?.some(t => t.toLowerCase().includes(q))
    );
  }
}
