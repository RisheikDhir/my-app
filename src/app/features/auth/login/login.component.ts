import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LocalSessionService } from '../../../core/services/local-session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private session = inject(LocalSessionService);
  private router  = inject(Router);

  email    = signal('');
  password = signal('');
  loading  = signal(false);
  error    = signal<string | null>(null);

  setEmail(v: string)    { this.email.set(v); this.error.set(null); }
  setPassword(v: string) { this.password.set(v); this.error.set(null); }

  async submit(): Promise<void> {
    const email = this.email().trim();
    if (!email)            { this.error.set('Please enter your email.'); return; }
    if (!this.password())  { this.error.set('Please enter your password.'); return; }

    this.loading.set(true);
    // Frontend-only: no real auth server. Updates local profile + clears guest flag.
    // TODO: Replace with POST /api/auth/login when backend is ready.
    await new Promise(r => setTimeout(r, 600));
    const name = this.session.profile()?.displayName ?? 'User';
    this.session.markRegistered(name, email);
    this.loading.set(false);
    this.router.navigate(['/dashboard']);
  }
}
