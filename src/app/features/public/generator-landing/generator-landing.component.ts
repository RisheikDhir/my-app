import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { UpperCasePipe } from '@angular/common';
import { getGeneratorById } from '../../../core/config/generators.config';
import { getTemplatesForGenerator } from '../../../core/config/templates.config';
import { GeneratorDefinition } from '../../../core/models/generator.models';
import { DocumentTemplate } from '../../../core/models/template.models';
import { getSeoForRoute } from '../../../core/config/routes-seo.config';

@Component({
  selector: 'app-generator-landing',
  standalone: true,
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './generator-landing.component.html',
  styleUrl: './generator-landing.component.scss',
})
export class GeneratorLandingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private titleSvc = inject(Title);
  private metaSvc = inject(Meta);

  generator: GeneratorDefinition | undefined;
  templates: DocumentTemplate[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.data['generatorId'] as string;
    this.generator = getGeneratorById(id);

    if (this.generator) {
      this.templates = getTemplatesForGenerator(this.generator.id, this.generator.supportedTemplateIds).slice(0, 6);
      this.applyMeta();
    }
  }

  private applyMeta(): void {
    if (!this.generator) return;
    const seoKey = this.route.snapshot.data['seoKey'] as string | undefined;
    const routeSeo = seoKey ? getSeoForRoute(seoKey) : undefined;

    const title = routeSeo?.seo?.title ?? `${this.generator.name} | DocForge`;
    const desc  = routeSeo?.seo?.description ?? this.generator.description;

    this.titleSvc.setTitle(title);
    this.metaSvc.updateTag({ name: 'description', content: desc });
  }

  get createRoute(): string {
    return `/generator/${this.generator?.slug ?? ''}/new`;
  }

  isTemplateFree(t: DocumentTemplate): boolean {
    return this.generator?.freeTemplateIds.includes(t.id) ?? false;
  }
}
