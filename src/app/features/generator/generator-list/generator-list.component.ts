import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GENERATORS } from '../../../core/config/generators.config';
import { GeneratorDefinition } from '../../../core/models/generator.models';

@Component({
  selector: 'app-generator-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="gen-list-page">
      <div class="gen-list-header">
        <h1>Choose a Document Type</h1>
        <p>Select a generator to get started. All data is saved locally in your browser.</p>
      </div>
      <div class="gen-grid">
        @for (g of generators; track g.id) {
          <a [routerLink]="['/generator', g.slug, 'new']" class="gen-card" [style.--accent]="g.color">
            <div class="gc-icon">{{ g.icon }}</div>
            <div class="gc-body">
              <div class="gc-name">
                {{ g.name }}
                @if (g.isNew) { <span class="badge-new">New</span> }
                @if (g.isPopular) { <span class="badge-pop">Popular</span> }
                @if (g.isPremium) { <span class="badge-pro">Pro</span> }
              </div>
              <p class="gc-desc">{{ g.shortDescription }}</p>
              <div class="gc-meta">
                <span>⏱ ~{{ g.formSchema.estimatedMinutes }} min</span>
                <span>{{ g.supportedTemplateIds.length }} templates</span>
              </div>
            </div>
            <span class="gc-arrow">→</span>
          </a>
        }
      </div>
    </div>
  `,
  styles: [`.gen-list-page { height: calc(100vh - 56px); overflow-y: auto; padding: 32px 24px 48px; max-width: 1100px; margin: 0 auto; } .gen-list-header { text-align: center; margin-bottom: 36px; h1 { font-size: 26px; font-weight: 800; } p { color: #6b7280; font-size: 14px; margin-top: 6px; } } .gen-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; } .gen-card { display: flex; align-items: flex-start; gap: 14px; padding: 18px; background: #fff; border: 1.5px solid #e5e7eb; border-radius: 14px; text-decoration: none; transition: all 0.2s; border-left: 3px solid var(--accent, #6366f1); &:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-1px); border-color: var(--accent, #6366f1); } } .gc-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; } .gc-body { flex: 1; min-width: 0; } .gc-name { font-size: 14px; font-weight: 700; color: #111; display: flex; align-items: center; gap: 4px; flex-wrap: wrap; margin-bottom: 4px; } .gc-desc { font-size: 12.5px; color: #6b7280; margin-bottom: 8px; } .gc-meta { display: flex; gap: 10px; font-size: 11px; color: #9ca3af; } .gc-arrow { color: #d1d5db; font-size: 16px; flex-shrink: 0; transition: 0.15s; } .gen-card:hover .gc-arrow { color: var(--accent, #6366f1); } .badge-new { background: #d1fae5; color: #065f46; padding: 1px 5px; border-radius: 4px; font-size: 9px; font-weight: 700; } .badge-pop { background: #fef3c7; color: #92400e; padding: 1px 5px; border-radius: 4px; font-size: 9px; font-weight: 700; } .badge-pro { background: #ede9fe; color: #6d28d9; padding: 1px 5px; border-radius: 4px; font-size: 9px; font-weight: 700; }`],
})
export class GeneratorListComponent {
  readonly generators: GeneratorDefinition[] = GENERATORS;
}
