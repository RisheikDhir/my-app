import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-generator-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="generator-shell">
      <header class="gen-header">
        <a routerLink="/" class="gen-logo">
          <span>⚡</span>
          <span>DocForge</span>
        </a>
        <nav class="gen-nav">
          <a routerLink="/dashboard" class="gen-nav-link">Dashboard</a>
          <a routerLink="/templates" class="gen-nav-link">Templates</a>
        </nav>
      </header>
      <main class="gen-main">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .generator-shell { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
    .gen-header {
      display: flex; align-items: center; gap: 24px; padding: 0 20px;
      height: 56px; border-bottom: 1px solid var(--color-border, #e5e7eb);
      background: #fff; flex-shrink: 0; z-index: 50;
    }
    .gen-logo { display: flex; align-items: center; gap: 6px; text-decoration: none; font-size: 18px; font-weight: 800; color: #6366f1; }
    .gen-nav { display: flex; gap: 4px; margin-left: auto; }
    .gen-nav-link { padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 500; color: #6b7280; text-decoration: none; transition: all 0.15s; }
    .gen-nav-link:hover { color: #111; background: #f3f4f6; }
    .gen-main { flex: 1; overflow: hidden; }
  `],
})
export class GeneratorLayoutComponent {}
