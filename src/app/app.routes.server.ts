import { RenderMode, ServerRoute } from '@angular/ssr';
import { GENERATORS } from './core/config/generators.config';
import { ALL_TEMPLATES } from './core/config/templates.config';

export const serverRoutes: ServerRoute[] = [

  // ── Parameterised routes — render on the client ────────────────────────────
  // These cannot be statically prerendered because they depend on runtime data.
  { path: 'templates/:slug',          renderMode: RenderMode.Client },
  { path: 'generator/:slug/new',      renderMode: RenderMode.Client },
  { path: 'generator/:slug/:id/edit', renderMode: RenderMode.Client },
  { path: 'dashboard/**',             renderMode: RenderMode.Client },
  { path: 'auth/**',                  renderMode: RenderMode.Client },

  // ── All other routes — prerender at build time ─────────────────────────────
  { path: '**', renderMode: RenderMode.Prerender },
];
