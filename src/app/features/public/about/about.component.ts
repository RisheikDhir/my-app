import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page container">
      <div class="page-hero">
        <h1>About DocForge</h1>
        <p>Helping every Indian create professional documents — for free.</p>
      </div>
      <div class="content">
        <section class="story">
          <h2>Our Story</h2>
          <p>DocForge was built by a team of developers and designers who were tired of paying ₹500–₹2000 for a simple resume PDF. We believed everyone — freshers, teachers, professionals, or someone preparing marriage biodata — deserves access to beautiful, professional documents without the cost barrier.</p>
          <p>We launched DocForge with a simple promise: <strong>free to preview, ₹10 to download</strong>. No subscriptions forced on you, no login walls, no data harvested.</p>
        </section>
        <section class="mission">
          <h2>Our Mission</h2>
          <p>To democratise professional document creation for 1.4 billion Indians. Whether you're applying for your first job, preparing a marriage biodata for your family, or building an academic CV for a PhD application — DocForge is here to make it fast, beautiful, and affordable.</p>
        </section>
        <section class="values">
          <h2>Our Values</h2>
          <div class="values-grid">
            <div class="value-card"><span class="v-icon">🔒</span><h3>Privacy First</h3><p>Your data never leaves your browser. No accounts, no tracking, no servers storing your personal information.</p></div>
            <div class="value-card"><span class="v-icon">💰</span><h3>Fair Pricing</h3><p>Preview for free. Download for ₹10. We believe professional documents shouldn't cost a month's rent.</p></div>
            <div class="value-card"><span class="v-icon">🇮🇳</span><h3>Built for India</h3><p>Marriage biodata, formal job application letters, bio data for government jobs — we understand the Indian context.</p></div>
            <div class="value-card"><span class="v-icon">⚡</span><h3>Speed & Quality</h3><p>Create a professional document in under 10 minutes. No design skills needed.</p></div>
          </div>
        </section>
        <div class="cta-row">
          <a routerLink="/generator" class="btn btn-primary">Create Your Document →</a>
          <a routerLink="/contact" class="btn btn-ghost">Contact Us</a>
        </div>
      </div>
    </div>
  `,
  styles: [`.page { max-width: 900px; margin: 0 auto; padding: 0 24px; } .page-hero { text-align: center; padding: 64px 0 48px; h1 { font-size: clamp(28px,4vw,44px); font-weight: 800; } p { color: #6b7280; font-size: 18px; margin-top: 8px; } } .content { padding-bottom: 72px; } section { margin-bottom: 48px; } h2 { font-size: 22px; font-weight: 800; margin-bottom: 14px; } p { font-size: 15px; line-height: 1.7; color: #374151; margin-bottom: 12px; } .values-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; @media(max-width: 600px){grid-template-columns: 1fr;} } .value-card { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 14px; padding: 24px; } .v-icon { font-size: 28px; margin-bottom: 10px; display: block; } .value-card h3 { font-size: 16px; font-weight: 700; margin-bottom: 6px; } .cta-row { display: flex; gap: 12px; flex-wrap: wrap; } .btn { display: inline-flex; align-items: center; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.15s; border: none; } .btn-primary { background: #6366f1; color: #fff; &:hover { opacity: 0.88; } } .btn-ghost { border: 1.5px solid #e5e7eb; color: #374151; &:hover { border-color: #6366f1; color: #6366f1; } }`],
})
export class AboutComponent {}
