import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <div class="nf-code">404</div>
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <div class="nf-actions">
        <a routerLink="/" class="btn btn-primary">← Go Home</a>
        <a routerLink="/generator" class="btn btn-ghost">Create a Document</a>
      </div>
    </div>
  `,
  styles: [`.not-found { text-align: center; padding: 120px 24px; min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; } .nf-code { font-size: 96px; font-weight: 900; background: linear-gradient(135deg, #6366f1, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 16px; } h1 { font-size: 28px; font-weight: 800; margin-bottom: 10px; } p { color: #6b7280; font-size: 16px; margin-bottom: 32px; } .nf-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; } .btn { display: inline-flex; align-items: center; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.15s; border: none; } .btn-primary { background: #6366f1; color: #fff; &:hover { opacity: 0.88; } } .btn-ghost { background: transparent; color: #374151; border: 1.5px solid #e5e7eb; &:hover { border-color: #6366f1; color: #6366f1; } }`],
})
export class NotFoundComponent {}
