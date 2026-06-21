import { Component, Input, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { DocumentSectionData } from '../../../core/models/document.models';
import { getSection, str } from '../../../core/utils/doc-extractor.utils';

@Component({
  selector: 'tpl-biodata-royal',
  standalone: true,
  template: `
<div class="royal-page">
  <!-- Ornate top border -->
  <div class="royal-border-top">
    <span class="royal-ornament">❧</span>
    <span class="royal-ornament-line"></span>
    <span class="royal-title-text">॥ विवाह परिचय पत्र ॥</span>
    <span class="royal-ornament-line"></span>
    <span class="royal-ornament">❧</span>
  </div>

  <!-- Header -->
  <header class="royal-header">
    @if (str(personal(), 'photo')) {
      <img class="royal-photo" [src]="str(personal(), 'photo')" alt="Photo" />
    } @else {
      <div class="royal-photo-ph">{{ initials() }}</div>
    }
    <h1 class="royal-name">{{ fullName() }}</h1>
    <p class="royal-sub">
      {{ str(personal(), 'religion') }}{{ personal()['caste'] ? ' · ' + str(personal(), 'caste') : '' }}
    </p>
  </header>

  <div class="royal-body">
    <div class="royal-col">
      <section class="royal-sec">
        <h3 class="royal-sec-title">🌸 व्यक्तिगत जानकारी</h3>
        @for (row of personalRows(); track row.label) {
          @if (row.value) {
            <div class="royal-row">
              <span class="royal-label">{{ row.label }}</span>
              <span class="royal-colon">:</span>
              <span class="royal-value">{{ row.value }}</span>
            </div>
          }
        }
      </section>

      <section class="royal-sec">
        <h3 class="royal-sec-title">📚 शिक्षा एवं व्यवसाय</h3>
        @for (row of educationRows(); track row.label) {
          @if (row.value) {
            <div class="royal-row">
              <span class="royal-label">{{ row.label }}</span>
              <span class="royal-colon">:</span>
              <span class="royal-value">{{ row.value }}</span>
            </div>
          }
        }
      </section>
    </div>

    <div class="royal-col">
      <section class="royal-sec">
        <h3 class="royal-sec-title">👨‍👩‍👧 परिवार विवरण</h3>
        @for (row of familyRows(); track row.label) {
          @if (row.value) {
            <div class="royal-row">
              <span class="royal-label">{{ row.label }}</span>
              <span class="royal-colon">:</span>
              <span class="royal-value">{{ row.value }}</span>
            </div>
          }
        }
      </section>

      <section class="royal-sec">
        <h3 class="royal-sec-title">📞 संपर्क विवरण</h3>
        @if (str(personal(), 'phone'))    { <div class="royal-row"><span class="royal-label">फ़ोन</span><span class="royal-colon">:</span><span class="royal-value">{{ str(personal(), 'phone') }}</span></div> }
        @if (str(personal(), 'email'))    { <div class="royal-row"><span class="royal-label">ईमेल</span><span class="royal-colon">:</span><span class="royal-value">{{ str(personal(), 'email') }}</span></div> }
        @if (str(personal(), 'location')) { <div class="royal-row"><span class="royal-label">पता</span><span class="royal-colon">:</span><span class="royal-value">{{ str(personal(), 'location') }}</span></div> }
      </section>
    </div>
  </div>

  <div class="royal-border-bottom">
    <span class="royal-ornament">✿</span>
    <span class="royal-ornament-line"></span>
    <span class="royal-ornament">✿</span>
  </div>
</div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
    .royal-page {
      font-family: 'Cormorant Garamond', 'Times New Roman', serif;
      width: 210mm;
      min-height: 297mm;
      background: #fffdf7;
      box-sizing: border-box;
      color: #2d1a06;
      border: 6px double #8b4513;
      margin: 0;
    }
    .royal-border-top, .royal-border-bottom {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 10px 20px;
      background: linear-gradient(135deg, #8b4513 0%, #a0522d 50%, #8b4513 100%);
      color: #f5deb3;
    }
    .royal-ornament { font-size: 18pt; }
    .royal-ornament-line { flex: 1; height: 1px; background: #f5deb3; opacity: 0.5; }
    .royal-title-text { font-size: 13pt; font-style: italic; letter-spacing: 0.05em; white-space: nowrap; }
    .royal-header { text-align: center; padding: 20px 20px 12px; border-bottom: 2px solid #e8c99a; }
    .royal-photo {
      width: 100px; height: 100px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #8b4513;
      margin-bottom: 10px;
    }
    .royal-photo-ph {
      width: 100px; height: 100px;
      border-radius: 50%;
      background: #f5deb3;
      border: 3px solid #8b4513;
      color: #8b4513;
      font-size: 28pt; font-weight: 600;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 10px;
    }
    .royal-name { font-size: 24pt; font-weight: 600; margin: 0 0 4px; color: #8b4513; }
    .royal-sub { font-size: 11pt; font-style: italic; color: #6b4c2a; margin: 0; }
    .royal-body { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
    .royal-col { padding: 14px 18px; }
    .royal-col:first-child { border-right: 1px solid #e8c99a; }
    .royal-sec { margin-bottom: 14px; }
    .royal-sec-title {
      font-size: 10.5pt; font-weight: 600; color: #8b4513;
      margin: 0 0 6px; padding-bottom: 3px;
      border-bottom: 1px solid #e8c99a;
    }
    .royal-row { display: flex; gap: 4px; padding: 2px 0; font-size: 9.5pt; }
    .royal-label { min-width: 80px; flex-shrink: 0; color: #6b4c2a; }
    .royal-colon { color: #8b4513; }
    .royal-value { font-weight: 500; flex: 1; }
    .royal-border-bottom { padding: 8px 20px; }
  `],
})
export class BiodataRoyalTemplate implements OnChanges {
  @Input() sections: DocumentSectionData[] = [];
  private readonly _s = signal<DocumentSectionData[]>([]);
  ngOnChanges(c: SimpleChanges): void { if (c['sections']) this._s.set(this.sections); }

  readonly str = str;
  personal = computed(() => getSection(this._s(), 'personal'));
  education = computed(() => getSection(this._s(), 'education'));
  family = computed(() => getSection(this._s(), 'family'));

  fullName = computed(() => {
    const p = this.personal();
    return [str(p, 'firstName'), str(p, 'lastName')].filter(Boolean).join(' ') || 'आपका नाम';
  });
  initials = computed(() => {
    const n = this.fullName();
    const parts = n.split(' ');
    return parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : n.slice(0, 2).toUpperCase();
  });

  personalRows = computed(() => {
    const p = this.personal();
    return [
      { label: 'जन्मतिथि',    value: str(p, 'dateOfBirth') },
      { label: 'आयु',         value: str(p, 'age') },
      { label: 'ऊँचाई',       value: str(p, 'height') },
      { label: 'वजन',         value: str(p, 'weight') },
      { label: 'रंग',         value: str(p, 'complexion') },
      { label: 'रक्त समूह',   value: str(p, 'bloodGroup') },
      { label: 'धर्म',        value: str(p, 'religion') },
      { label: 'जाति',        value: str(p, 'caste') },
      { label: 'मंगलिक',     value: str(p, 'manglik') },
      { label: 'राशि / नक्षत्र', value: str(p, 'horoscope') },
    ];
  });

  educationRows = computed(() => {
    const e = this.education();
    return [
      { label: 'शिक्षा',      value: str(e, 'degree') || str(e, 'qualification') },
      { label: 'कॉलेज',      value: str(e, 'institution') },
      { label: 'व्यवसाय',    value: str(e, 'occupation') },
      { label: 'कार्यालय',   value: str(e, 'company') || str(e, 'employer') },
      { label: 'आय (वार्षिक)', value: str(e, 'income') || str(e, 'annualIncome') },
    ];
  });

  familyRows = computed(() => {
    const f = this.family();
    return [
      { label: 'पिता का नाम',     value: str(f, 'fatherName') },
      { label: 'पिता का व्यवसाय', value: str(f, 'fatherOccupation') },
      { label: 'माता का नाम',     value: str(f, 'motherName') },
      { label: 'माता का व्यवसाय', value: str(f, 'motherOccupation') },
      { label: 'भाई/बहन',        value: str(f, 'siblings') },
      { label: 'मूल स्थान',       value: str(f, 'nativePlace') },
    ];
  });
}
