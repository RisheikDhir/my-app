import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalSessionService } from '../services/local-session.service';

export const authGuard: CanActivateFn = () => {
  const session = inject(LocalSessionService);
  const router  = inject(Router);
  return session.isAuthenticated() ? true : router.createUrlTree(['/auth/login']);
};
