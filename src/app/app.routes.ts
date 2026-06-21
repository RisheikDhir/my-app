import { Routes } from '@angular/router';

// ─── Guards ────────────────────────────────────────────────────────────────────
import { authGuard } from './core/guards/auth.guard';

// ─── Route tree ────────────────────────────────────────────────────────────────
// All routes are lazy-loaded by feature to keep the initial bundle minimal.
//
// Route data convention:
//   { seoKey: '/resume-generator' }  → looked up in ROUTE_SEO_CONFIG by SeoMetaService
//   { noindex: true }               → applied to dashboard / private pages

export const routes: Routes = [

  // ─── Public Layout Routes ─────────────────────────────────────────────────────
  {
    path: '',
    loadComponent: () => import('./layouts/public-layout/public-layout.component').then(m => m.PublicLayoutComponent),
    children: [

      // Home
      { path: '', loadComponent: () => import('./features/public/home/home.component').then(m => m.HomeComponent), data: { seoKey: '/' } },

      // Core public pages
      { path: 'pricing',              loadComponent: () => import('./features/public/pricing/pricing.component').then(m => m.PricingComponent), data: { seoKey: '/pricing' } },
      { path: 'templates',            loadComponent: () => import('./features/public/templates/templates-gallery.component').then(m => m.TemplatesGalleryComponent), data: { seoKey: '/templates' } },
      { path: 'templates/:slug',      loadComponent: () => import('./features/public/templates/template-detail.component').then(m => m.TemplateDetailComponent) },
      { path: 'about',                loadComponent: () => import('./features/public/about/about.component').then(m => m.AboutComponent), data: { seoKey: '/about' } },
      { path: 'contact',              loadComponent: () => import('./features/public/contact/contact.component').then(m => m.ContactComponent), data: { seoKey: '/contact' } },
      { path: 'faq',                  loadComponent: () => import('./features/public/faq/faq.component').then(m => m.FaqComponent), data: { seoKey: '/faq' } },

      // Legal
      { path: 'privacy-policy',       loadComponent: () => import('./features/public/legal/legal.component').then(m => m.LegalComponent), data: { seoKey: '/privacy-policy', page: 'privacy' } },
      { path: 'terms-and-conditions', loadComponent: () => import('./features/public/legal/legal.component').then(m => m.LegalComponent), data: { seoKey: '/terms-and-conditions', page: 'terms' } },
      { path: 'refund-policy',        loadComponent: () => import('./features/public/legal/legal.component').then(m => m.LegalComponent), data: { seoKey: '/refund-policy', page: 'refund' } },

      // ── SEO Landing Pages — one per generator type ────────────────────────
      { path: 'resume-generator',                  loadComponent: () => import('./features/public/generator-landing/generator-landing.component').then(m => m.GeneratorLandingComponent), data: { generatorId: 'resume', seoKey: '/resume-generator' } },
      { path: 'cv-generator',                      loadComponent: () => import('./features/public/generator-landing/generator-landing.component').then(m => m.GeneratorLandingComponent), data: { generatorId: 'cv', seoKey: '/cv-generator' } },
      { path: 'biodata-generator',                 loadComponent: () => import('./features/public/generator-landing/generator-landing.component').then(m => m.GeneratorLandingComponent), data: { generatorId: 'biodata', seoKey: '/biodata-generator' } },
      { path: 'marriage-biodata-generator',        loadComponent: () => import('./features/public/generator-landing/generator-landing.component').then(m => m.GeneratorLandingComponent), data: { generatorId: 'marriage-biodata', seoKey: '/marriage-biodata-generator' } },
      { path: 'cover-letter-generator',            loadComponent: () => import('./features/public/generator-landing/generator-landing.component').then(m => m.GeneratorLandingComponent), data: { generatorId: 'cover-letter', seoKey: '/cover-letter-generator' } },
      { path: 'job-application-letter-generator',  loadComponent: () => import('./features/public/generator-landing/generator-landing.component').then(m => m.GeneratorLandingComponent), data: { generatorId: 'job-application-letter', seoKey: '/job-application-letter-generator' } },
      { path: 'fresher-resume-generator',          loadComponent: () => import('./features/public/generator-landing/generator-landing.component').then(m => m.GeneratorLandingComponent), data: { generatorId: 'fresher-resume', seoKey: '/fresher-resume-generator' } },
      { path: 'experienced-resume-generator',      loadComponent: () => import('./features/public/generator-landing/generator-landing.component').then(m => m.GeneratorLandingComponent), data: { generatorId: 'experienced-resume', seoKey: '/experienced-resume-generator' } },
      { path: 'teacher-resume-generator',          loadComponent: () => import('./features/public/generator-landing/generator-landing.component').then(m => m.GeneratorLandingComponent), data: { generatorId: 'teacher-resume', seoKey: '/teacher-resume-generator' } },
      { path: 'developer-resume-generator',        loadComponent: () => import('./features/public/generator-landing/generator-landing.component').then(m => m.GeneratorLandingComponent), data: { generatorId: 'developer-resume', seoKey: '/developer-resume-generator' } },
      { path: 'designer-resume-generator',         loadComponent: () => import('./features/public/generator-landing/generator-landing.component').then(m => m.GeneratorLandingComponent), data: { generatorId: 'designer-resume', seoKey: '/designer-resume-generator' } },
      { path: 'portfolio-resume-generator',        loadComponent: () => import('./features/public/generator-landing/generator-landing.component').then(m => m.GeneratorLandingComponent), data: { generatorId: 'portfolio-resume', seoKey: '/portfolio-resume-generator' } },
      { path: 'ats-resume-generator',              loadComponent: () => import('./features/public/generator-landing/generator-landing.component').then(m => m.GeneratorLandingComponent), data: { generatorId: 'ats-resume', seoKey: '/ats-resume-generator' } },
      { path: 'internship-resume-generator',       loadComponent: () => import('./features/public/generator-landing/generator-landing.component').then(m => m.GeneratorLandingComponent), data: { generatorId: 'internship-resume' } },
      { path: 'professional-summary-generator',    loadComponent: () => import('./features/public/generator-landing/generator-landing.component').then(m => m.GeneratorLandingComponent), data: { generatorId: 'professional-summary' } },
    ],
  },

  // ─── Auth Routes ─────────────────────────────────────────────────────────────
  {
    path: 'auth',
    children: [
      { path: 'login',    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
      { path: '',         redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  // ─── Generator Editor (full-screen, handles all 20 generator types via :slug)
  {
    path: 'generator',
    loadComponent: () => import('./layouts/generator-layout/generator-layout.component').then(m => m.GeneratorLayoutComponent),
    children: [
      { path: '',             loadComponent: () => import('./features/generator/generator-list/generator-list.component').then(m => m.GeneratorListComponent), data: { noindex: true } },
      { path: ':slug/new',    loadComponent: () => import('./features/generator/editor/generator-editor.component').then(m => m.GeneratorEditorComponent), data: { noindex: true } },
      { path: ':slug/:id/edit', loadComponent: () => import('./features/generator/editor/generator-editor.component').then(m => m.GeneratorEditorComponent), data: { noindex: true } },
    ],
  },

  // ─── Dashboard ───────────────────────────────────────────────────────────────
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      { path: '',               loadComponent: () => import('./features/dashboard/overview/dashboard-overview.component').then(m => m.DashboardOverviewComponent), data: { noindex: true } },
      { path: 'documents',      loadComponent: () => import('./features/dashboard/documents/my-documents.component').then(m => m.MyDocumentsComponent), data: { noindex: true } },
      { path: 'documents/new',  redirectTo: '/generator' },
      { path: 'payments',       loadComponent: () => import('./features/dashboard/payments/my-payments.component').then(m => m.MyPaymentsComponent), data: { noindex: true } },
      { path: 'billing',        loadComponent: () => import('./features/dashboard/billing/billing.component').then(m => m.BillingComponent), data: { noindex: true } },
      { path: 'profile',        loadComponent: () => import('./features/dashboard/profile/profile.component').then(m => m.ProfileComponent), data: { noindex: true } },
      { path: 'downloads',      loadComponent: () => import('./features/dashboard/downloads/download-history.component').then(m => m.DownloadHistoryComponent), data: { noindex: true } },
      { path: 'saved-templates', loadComponent: () => import('./features/dashboard/saved-templates/saved-templates.component').then(m => m.SavedTemplatesComponent), data: { noindex: true } },
    ],
  },

  // ─── Legacy compatibility — old biodata /create route ────────────────────────
  { path: 'create',    redirectTo: '/generator/marriage-biodata/new', pathMatch: 'full' },

  // ─── 404 ─────────────────────────────────────────────────────────────────────
  { path: '**', loadComponent: () => import('./features/public/not-found/not-found.component').then(m => m.NotFoundComponent) },
];
