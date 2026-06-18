import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./features/editor/editor.component').then(m => m.EditorComponent),
  },
  {
    path: 'templates',
    loadComponent: () =>
      import('./features/templates/templates.component').then(m => m.TemplatesComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
