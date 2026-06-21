import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LocalSessionService } from '../../../core/services/local-session.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private session = inject(LocalSessionService);
  private router  = inject(Router);

  name     = signal('');
  email    = signal('');
  password = signal('');
  loading  = signal(false);
  error    = signal<string | null>(null);

  setName(v: string)     { this.name.set(v); this.error.set(null); }
  setEmail(v: string)    { this.email.set(v); this.error.set(null); }
  setPassword(v: string) { this.password.set(v); this.error.set(null); }

  async submit(): Promise<void> {
    const name  = this.name().trim();
    const email = this.email().trim();
    const pass  = this.password();

    if (!name)            { this.error.set('Please enter your name.'); return; }
    if (!email)           { this.error.set('Please enter your email.'); return; }
    if (pass.length < 6)  { this.error.set('Password must be at least 6 characters.'); return; }

    this.loading.set(true);
    // Frontend-only: stores name + email in local profile, clears guest flag.
    // TODO: Replace with POST /api/auth/register when backend is ready.
    await new Promise(r => setTimeout(r, 600));
    this.session.markRegistered(name, email);
    this.loading.set(false);
    this.router.navigate(['/dashboard']);
  }
}
