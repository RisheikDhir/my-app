import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ALL_TEMPLATES } from '../../../core/config/templates.config';
import { DocumentTemplate } from '../../../core/models/template.models';

@Component({
  selector: 'app-templates-gallery',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-hero container">
      <h1>Document Templates Gallery</h1>
      <p>{{ templates.length }}+ professional templates — free and premium</p>
    </div>
    <section class="container templates-page">
      <div class="template-grid">
        @for (t of templates; track t.id) {
          <div class="template-card">
            <div class="template-thumb" [style.background]="t.theme.primaryColor + '18'">
              <span style="font-size:40px">📄</span>
              @if (t.isPremium) { <span class="badge-pro">PRO</span> }
            </div>
            <div class="template-info">
              <h3>{{ t.name }}</h3>
              <p>{{ t.description }}</p>
              <a [routerLink]="'/generator/' + t.category + '/new'" class="btn-use">Use Template →</a>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .page-hero { text-align: center; padding: 64px 0 40px; h1 { font-size: clamp(26px,4vw,42px); font-weight: 800; } p { color: #6b7280; margin-top: 8px; } }
    .templates-page { padding-bottom: 72px; }
    .template-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
    .template-card { border: 1px solid #e5e7eb; border-radius: 14px; overflow: hidden; background: #fff; transition: box-shadow 0.15s; &:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.08); } }
    .template-thumb { height: 160px; display: flex; align-items: center; justify-content: center; position: relative; }
    .badge-pro { position: absolute; top: 10px; right: 10px; background: #6d28d9; color: #fff; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
    .template-info { padding: 16px; h3 { font-size: 15px; font-weight: 700; margin-bottom: 4px; } p { font-size: 12.5px; color: #6b7280; line-height: 1.5; margin-bottom: 12px; } }
    .btn-use { font-size: 13px; font-weight: 600; color: #6366f1; text-decoration: none; &:hover { text-decoration: underline; } }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  `],
})
export class TemplatesGalleryComponent {
  readonly templates: DocumentTemplate[] = ALL_TEMPLATES;
}
