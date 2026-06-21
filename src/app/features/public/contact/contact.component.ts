import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <div class="container">
      <div class="page-hero">
        <h1>Contact Us</h1>
        <p>We typically respond within 24 hours.</p>
      </div>
      <div class="contact-grid">
        <div class="contact-info">
          <div class="info-card"><span class="info-icon">📧</span><h3>Email</h3><p>support&#64;docforge.app</p></div>
          <div class="info-card"><span class="info-icon">⏱️</span><h3>Response Time</h3><p>Within 24 hours on business days</p></div>
          <div class="info-card"><span class="info-icon">🌐</span><h3>Languages</h3><p>English & Hindi support available</p></div>
        </div>
        <div class="contact-form-area">
          <h2>Send a Message</h2>
          <div class="form-group"><label>Name</label><input type="text" placeholder="Your name" /></div>
          <div class="form-group"><label>Email</label><input type="email" placeholder="your&#64;email.com" /></div>
          <div class="form-group"><label>Subject</label><select><option>General inquiry</option><option>Payment issue</option><option>Technical support</option><option>Feature request</option><option>Refund request</option></select></div>
          <div class="form-group"><label>Message</label><textarea rows="5" placeholder="Describe your issue or question in detail…"></textarea></div>
          <button class="btn-submit" type="button">Send Message →</button>
          <p class="form-note">For payment/refund issues, please include your Razorpay Payment ID.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`.container { max-width: 1000px; margin: 0 auto; padding: 0 24px 72px; } .page-hero { text-align: center; padding: 64px 0 48px; h1 { font-size: clamp(26px,4vw,40px); font-weight: 800; } p { color: #6b7280; margin-top: 8px; } } .contact-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 40px; @media(max-width: 768px){grid-template-columns: 1fr;} } .info-card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 16px; background: #f8fafc; } .info-icon { font-size: 24px; margin-bottom: 8px; display: block; } .info-card h3 { font-size: 15px; font-weight: 700; margin-bottom: 4px; } .info-card p { font-size: 14px; color: #6b7280; } h2 { font-size: 20px; font-weight: 800; margin-bottom: 20px; } .form-group { margin-bottom: 16px; label { display: block; font-size: 13.5px; font-weight: 600; margin-bottom: 6px; } input, select, textarea { width: 100%; padding: 10px 14px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; transition: border-color 0.15s; font-family: inherit; box-sizing: border-box; &:focus { border-color: #6366f1; } } textarea { resize: vertical; } } .btn-submit { width: 100%; padding: 13px; background: #6366f1; color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: opacity 0.15s; &:hover { opacity: 0.88; } } .form-note { font-size: 12px; color: #9ca3af; margin-top: 12px; }`],
})
export class ContactComponent {}
