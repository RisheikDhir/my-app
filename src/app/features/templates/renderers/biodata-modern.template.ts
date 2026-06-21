import { Component, Input, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { DocumentSectionData } from '../../../core/models/document.models';
import { getSection, getSectionItems, str } from '../../../core/utils/doc-extractor.utils';

@Component({
  selector: 'tpl-biodata-modern',
  standalone: true,
  template: `
<div class="bm-page">
  <!-- Header -->
  <header class="bm-header">
    <div class="bm-header-text">
      <p class="bm-label">Marriage Biodata</p>
      <h1 class="bm-name">{{ fullName() }}</h1>
      @if (personal()['religion']) {
        <p class="bm-sub">{{ str(personal(), 'religion') }}{{ personal()['caste'] ? ' · ' + str(personal(), 'caste') : '' }}</p>
      }
    </div>
    @if (str(personal(), 'photo')) {
      <img class="bm-photo" [src]="str(personal(), 'photo')" alt="Photo" />
    } @else {
      <div class="bm-photo-ph">{{ initials() }}</div>
    }
  </header>

  <div class="bm-body">
    <!-- Personal Details -->
    <section class="bm-section">
      <h2 class="bm-sec-title">Personal Details</h2>
      <div class="bm-grid">
        @for (row of personalRows(); track row.label) {
          @if (row.value) {
            <div class="bm-row">
              <span class="bm-row-label">{{ row.label }}</span>
              <span class="bm-row-value">{{ row.value }}</span>
            </div>
          }
        }
      </div>
    </section>

    <!-- Education & Career -->
    @if (educationRows().length) {
      <section class="bm-section">
        <h2 class="bm-sec-title">Education &amp; Career</h2>
        <div class="bm-grid">
          @for (row of educationRows(); track row.label) {
            @if (row.value) {
              <div class="bm-row">
                <span class="bm-row-label">{{ row.label }}</span>
                <span class="bm-row-value">{{ row.value }}</span>
              </div>
            }
          }
        </div>
      </section>
    }

    <!-- Family Details -->
    @if (hasFamily()) {
      <section class="bm-section">
        <h2 class="bm-sec-title">Family Details</h2>
        <div class="bm-grid">
          @for (row of familyRows(); track row.label) {
            @if (row.value) {
              <div class="bm-row">
                <span class="bm-row-label">{{ row.label }}</span>
                <span class="bm-row-value">{{ row.value }}</span>
              </div>
            }
          }
        </div>
      </section>
    }

    <!-- Contact -->
    <section class="bm-section">
      <h2 class="bm-sec-title">Contact</h2>
      <div class="bm-grid">
        @if (str(personal(), 'phone'))    { <div class="bm-row"><span class="bm-row-label">Phone</span><span class="bm-row-value">{{ str(personal(), 'phone') }}</span></div> }
        @if (str(personal(), 'email'))    { <div class="bm-row"><span class="bm-row-label">Email</span><span class="bm-row-value">{{ str(personal(), 'email') }}</span></div> }
        @if (str(personal(), 'location')) { <div class="bm-row"><span class="bm-row-label">Location</span><span class="bm-row-value">{{ str(personal(), 'location') }}</span></div> }
      </div>
    </section>
  </div>

  <footer class="bm-footer">Created with DocForge · docforge.app</footer>
</div>
  `,
  styles: [`
    .bm-page {
      font-family: 'Poppins', 'Segoe UI', sans-serif;
      font-size: 10pt;
      width: 210mm;
      min-height: 297mm;
      background: #fff;
      box-sizing: border-box;
      color: #1f2937;
    }
    .bm-header {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      padding: 24px 24px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
    }
    .bm-label { font-size: 8pt; text-transform: uppercase; letter-spacing: 0.12em; opacity: 0.8; margin: 0 0 4px; }
    .bm-name  { font-size: 22pt; font-weight: 700; margin: 0 0 4px; }
    .bm-sub   { font-size: 9.5pt; opacity: 0.85; margin: 0; }
    .bm-photo {
      width: 90px; height: 90px;
      border-radius: 12px;
      object-fit: cover;
      border: 3px solid rgba(255,255,255,0.5);
    }
    .bm-photo-ph {
      width: 90px; height: 90px;
      border-radius: 12px;
      background: rgba(255,255,255,0.2);
      color: #fff;
      font-size: 24pt; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      border: 2px dashed rgba(255,255,255,0.5);
    }
    .bm-body { padding: 16px 24px; }
    .bm-section { margin-bottom: 16px; }
    .bm-sec-title {
      font-size: 10pt; font-weight: 700; color: #6366f1;
      margin: 0 0 8px; padding-bottom: 4px;
      border-bottom: 2px solid #e0e7ff;
    }
    .bm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 16px; }
    .bm-row { display: flex; gap: 8px; padding: 3px 0; }
    .bm-row-label { font-size: 9pt; color: #6b7280; min-width: 90px; flex-shrink: 0; }
    .bm-row-value { font-size: 9.5pt; font-weight: 500; }
    .bm-footer { text-align: center; font-size: 8pt; color: #9ca3af; padding: 10px; border-top: 1px solid #f3f4f6; }
  `],
})
export class BiodataModernTemplate implements OnChanges {
  @Input() sections: DocumentSectionData[] = [];
  private readonly _s = signal<DocumentSectionData[]>([]);
  ngOnChanges(c: SimpleChanges): void { if (c['sections']) this._s.set(this.sections); }

  readonly str = str;

  personal    = computed(() => getSection(this._s(), 'personal'));
  education   = computed(() => getSection(this._s(), 'education'));
  family      = computed(() => getSection(this._s(), 'family'));

  fullName = computed(() => {
    const p = this.personal();
    return [str(p, 'firstName'), str(p, 'lastName')].filter(Boolean).join(' ') || 'Your Name';
  });

  initials = computed(() => {
    const n = this.fullName();
    const parts = n.split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : n.slice(0, 2).toUpperCase();
  });

  personalRows = computed(() => {
    const p = this.personal();
    return [
      { label: 'Date of Birth',  value: str(p, 'dateOfBirth') },
      { label: 'Age',            value: str(p, 'age') },
      { label: 'Height',         value: str(p, 'height') },
      { label: 'Weight',         value: str(p, 'weight') },
      { label: 'Complexion',     value: str(p, 'complexion') },
      { label: 'Blood Group',    value: str(p, 'bloodGroup') },
      { label: 'Religion',       value: str(p, 'religion') },
      { label: 'Caste',          value: str(p, 'caste') },
      { label: 'Mother Tongue',  value: str(p, 'motherTongue') },
      { label: 'Manglik',        value: str(p, 'manglik') },
      { label: 'Horoscope',      value: str(p, 'horoscope') },
      { label: 'Marital Status', value: str(p, 'maritalStatus') },
    ];
  });

  educationRows = computed(() => {
    const e = this.education();
    return [
      { label: 'Qualification', value: str(e, 'degree') || str(e, 'qualification') },
      { label: 'Institution',   value: str(e, 'institution') },
      { label: 'Occupation',    value: str(e, 'occupation') },
      { label: 'Employer',      value: str(e, 'company') || str(e, 'employer') },
      { label: 'Annual Income',  value: str(e, 'income') || str(e, 'annualIncome') },
    ].filter(r => r.value);
  });

  familyRows = computed(() => {
    const f = this.family();
    return [
      { label: "Father's Name",  value: str(f, 'fatherName') },
      { label: "Father's Occ.", value: str(f, 'fatherOccupation') },
      { label: "Mother's Name",  value: str(f, 'motherName') },
      { label: "Mother's Occ.", value: str(f, 'motherOccupation') },
      { label: 'Siblings',       value: str(f, 'siblings') },
      { label: 'Native Place',   value: str(f, 'nativePlace') },
    ];
  });

  hasFamily = computed(() => this.familyRows().some(r => r.value));
}
