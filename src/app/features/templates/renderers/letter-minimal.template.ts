import { Component, Input, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { DocumentSectionData } from '../../../core/models/document.models';
import { getSection, str } from '../../../core/utils/doc-extractor.utils';

@Component({
  selector: 'tpl-letter-minimal',
  standalone: true,
  template: `
<div class="ltr-page">
  <!-- Sender -->
  <div class="ltr-sender">
    <strong>{{ senderName() }}</strong>
    @if (str(sender(), 'jobTitle')) { <p>{{ str(sender(), 'jobTitle') }}</p> }
    @if (str(sender(), 'email'))    { <p>{{ str(sender(), 'email') }}</p> }
    @if (str(sender(), 'phone'))    { <p>{{ str(sender(), 'phone') }}</p> }
    @if (str(sender(), 'location')) { <p>{{ str(sender(), 'location') }}</p> }
  </div>

  <div class="ltr-date">{{ today }}</div>

  <!-- Recipient -->
  @if (recipientName()) {
    <div class="ltr-recipient">
      <strong>{{ recipientName() }}</strong>
      @if (str(recipient(), 'recipientTitle')) { <p>{{ str(recipient(), 'recipientTitle') }}</p> }
      @if (str(recipient(), 'company'))        { <p>{{ str(recipient(), 'company') }}</p> }
      @if (str(recipient(), 'location'))       { <p>{{ str(recipient(), 'location') }}</p> }
    </div>
  }

  <!-- Subject -->
  @if (subject()) {
    <p class="ltr-subject"><strong>Re: {{ subject() }}</strong></p>
  }

  <!-- Salutation -->
  <p class="ltr-salutation">
    Dear {{ str(recipient(), 'recipientName') || 'Hiring Manager' }},
  </p>

  <!-- Body -->
  @if (body()) {
    <div class="ltr-body">{{ body() }}</div>
  } @else {
    <div class="ltr-body ltr-placeholder">
      [Your letter body will appear here. Fill in the letter content in the form.]
    </div>
  }

  <!-- Closing -->
  <div class="ltr-closing">
    <p>Sincerely,</p>
    <div class="ltr-sig-gap"></div>
    <p><strong>{{ senderName() }}</strong></p>
    @if (str(sender(), 'jobTitle')) { <p>{{ str(sender(), 'jobTitle') }}</p> }
  </div>
</div>
  `,
  styles: [`
    .ltr-page {
      font-family: 'Times New Roman', 'Georgia', serif;
      font-size: 11pt;
      width: 210mm;
      min-height: 297mm;
      padding: 20mm 22mm;
      box-sizing: border-box;
      background: #fff;
      color: #1a1a1a;
      line-height: 1.6;
    }
    .ltr-sender { margin-bottom: 20px; p { margin: 1px 0; font-size: 10pt; } }
    .ltr-date { text-align: right; font-size: 10pt; color: #555; margin-bottom: 20px; }
    .ltr-recipient { margin-bottom: 16px; p { margin: 1px 0; font-size: 10pt; } }
    .ltr-subject { margin-bottom: 12px; font-size: 10.5pt; }
    .ltr-salutation { margin-bottom: 14px; font-size: 11pt; }
    .ltr-body { font-size: 11pt; white-space: pre-line; margin-bottom: 24px; }
    .ltr-placeholder { color: #9ca3af; font-style: italic; }
    .ltr-closing { font-size: 11pt; }
    .ltr-sig-gap { height: 36px; }
  `],
})
export class LetterMinimalTemplate implements OnChanges {
  @Input() sections: DocumentSectionData[] = [];
  private readonly _s = signal<DocumentSectionData[]>([]);
  ngOnChanges(c: SimpleChanges): void { if (c['sections']) this._s.set(this.sections); }

  readonly str = str;

  sender    = computed(() => getSection(this._s(), 'personal'));
  recipient = computed(() => getSection(this._s(), 'recipient') || getSection(this._s(), 'letter-details'));

  senderName = computed(() => {
    const s = this.sender();
    return [str(s, 'firstName'), str(s, 'lastName')].filter(Boolean).join(' ') || 'Your Name';
  });

  recipientName = computed(() => str(this.recipient(), 'recipientName'));
  subject       = computed(() => str(this.recipient(), 'subject') || str(getSection(this._s(), 'letter-details'), 'subject'));
  body          = computed(() => str(getSection(this._s(), 'content'), 'body') || str(getSection(this._s(), 'letter-content'), 'letterBody'));

  readonly today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}
