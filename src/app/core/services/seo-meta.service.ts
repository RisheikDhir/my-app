// ─── SeoMetaService ────────────────────────────────────────────────────────────
// Subscribes to NavigationEnd events and applies title, meta tags, and JSON-LD
// structured data based on ROUTE_SEO_CONFIG.  Wire into AppComponent.ngOnInit().

import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';
import { getSeoForRoute } from '../config/routes-seo.config';
import { SeoMetaConfig } from '../models/seo.models';

const DEFAULT_TITLE       = 'DocForge — Free Resume, CV & Biodata Maker';
const DEFAULT_DESCRIPTION = 'Create professional resumes, CVs, marriage biodatas and cover letters online. Free preview, ₹10 PDF download. 20+ generators, 15+ templates.';
const SITE_URL            = 'https://risheikdhir.github.io/my-app';

@Injectable({ providedIn: 'root' })
export class SeoMetaService {
  private router     = inject(Router);
  private titleSvc   = inject(Title);
  private metaSvc    = inject(Meta);
  private doc        = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  init(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        const url = (e as NavigationEnd).urlAfterRedirects.split('?')[0];
        this.applyForRoute(url);
      });
  }

  applyForRoute(path: string): void {
    const entry  = getSeoForRoute(path);
    const seo    = entry?.seo;

    this.setTitle(seo?.title ?? DEFAULT_TITLE);
    this.setDescription(seo?.description ?? DEFAULT_DESCRIPTION);

    if (seo?.keywords?.length) {
      this.metaSvc.updateTag({ name: 'keywords', content: seo.keywords.join(', ') });
    }

    // Open Graph
    this.metaSvc.updateTag({ property: 'og:title',       content: seo?.ogTitle       ?? seo?.title       ?? DEFAULT_TITLE });
    this.metaSvc.updateTag({ property: 'og:description', content: seo?.ogDescription ?? seo?.description ?? DEFAULT_DESCRIPTION });
    this.metaSvc.updateTag({ property: 'og:url',         content: `${SITE_URL}${path}` });
    this.metaSvc.updateTag({ property: 'og:type',        content: 'website' });

    // Twitter Card
    this.metaSvc.updateTag({ name: 'twitter:card',        content: 'summary_large_image' });
    this.metaSvc.updateTag({ name: 'twitter:title',       content: seo?.ogTitle       ?? seo?.title       ?? DEFAULT_TITLE });
    this.metaSvc.updateTag({ name: 'twitter:description', content: seo?.ogDescription ?? seo?.description ?? DEFAULT_DESCRIPTION });

    // Robots
    const robotsContent = seo?.noindex ? 'noindex, nofollow' : 'index, follow';
    this.metaSvc.updateTag({ name: 'robots', content: robotsContent });

    // Canonical
    this.setCanonical(seo?.canonicalUrl ?? `${SITE_URL}${path}`);

    // JSON-LD structured data
    if (seo?.structuredData) {
      this.injectJsonLd(seo.structuredData);
    } else {
      this.removeJsonLd();
    }
  }

  private setTitle(title: string): void {
    this.titleSvc.setTitle(title);
    this.metaSvc.updateTag({ property: 'og:title', content: title });
  }

  private setDescription(desc: string): void {
    this.metaSvc.updateTag({ name: 'description', content: desc });
  }

  private setCanonical(url: string): void {
    if (!this.isBrowser) return;
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private injectJsonLd(data: object | object[]): void {
    if (!this.isBrowser) return;
    this.removeJsonLd();
    const script = this.doc.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', 'seo-structured-data');
    script.textContent = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }

  private removeJsonLd(): void {
    if (!this.isBrowser) return;
    this.doc.getElementById('seo-structured-data')?.remove();
  }
}
