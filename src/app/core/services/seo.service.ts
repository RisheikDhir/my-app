import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private router = inject(Router);

  private readonly BASE_URL = 'https://biodatamaker.app';

  setPage(config: SeoConfig): void {
    const fullTitle = `${config.title} | BiodataForge`;
    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: `${this.BASE_URL}${this.router.url}` });
    if (config.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: config.ogImage });
    }

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });

    // Canonical
    this.meta.updateTag({ rel: 'canonical', href: `${this.BASE_URL}${this.router.url}` });
  }
}
