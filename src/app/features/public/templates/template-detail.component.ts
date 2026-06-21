import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getTemplateBySlug } from '../../../core/config/templates.config';
import { DocumentTemplate } from '../../../core/models/template.models';

@Component({
  selector: 'app-template-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container page-wrapper">
      @if (template) {
        <h1>{{ template.name }}</h1>
        <p>{{ template.description }}</p>
        <div class="actions">
          <a [routerLink]="['/generator', template.category, 'new']" [queryParams]="{ templateId: template.id }" class="btn-primary-link">Use This Template →</a>
          <a routerLink="/templates" class="btn-ghost-link">← Back to Templates</a>
        </div>
      } @else {
        <h1>Template not found</h1>
        <a routerLink="/templates">View all templates</a>
      }
    </div>
  `,
  styles: [`.container { max-width: 900px; margin: 0 auto; padding: 64px 24px; } h1 { font-size: 32px; font-weight: 800; margin-bottom: 12px; } p { color: #6b7280; font-size: 16px; } .actions { display: flex; gap: 12px; margin-top: 28px; flex-wrap: wrap; } .btn-primary-link { background: #6366f1; color: #fff; padding: 10px 22px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; } .btn-ghost-link { color: #6b7280; text-decoration: none; font-size: 14px; padding: 10px; }`],
})
export class TemplateDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  template: DocumentTemplate | undefined;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.template = getTemplateBySlug(slug);
  }
}
