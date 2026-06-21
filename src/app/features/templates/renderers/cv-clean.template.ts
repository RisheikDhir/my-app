import { Component, Input, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { DocumentSectionData } from '../../../core/models/document.models';
import { getPersonalInfo, getExperience, getEducation, getSummary, getSkills, getLanguages, getCertifications, getAwards, getSectionItems, str } from '../../../core/utils/doc-extractor.utils';

@Component({
  selector: 'tpl-cv-clean',
  standalone: true,
  template: `
<div class="cv-page">
  <header class="cv-header">
    <h1 class="cv-name">{{ p().fullName }}</h1>
    @if (p().jobTitle) { <p class="cv-title">{{ p().jobTitle }}</p> }
    <div class="cv-contact">
      @if (p().email)    { <span>{{ p().email }}</span> }
      @if (p().phone)    { <span>{{ p().phone }}</span> }
      @if (p().location) { <span>{{ p().location }}</span> }
      @if (p().linkedin) { <span>LinkedIn: {{ p().linkedin }}</span> }
    </div>
  </header>

  @if (summary()) {
    <section class="cv-sec">
      <h2 class="cv-sec-title">Research Interests &amp; Profile</h2>
      <p class="cv-text">{{ summary() }}</p>
    </section>
  }

  @if (education().length) {
    <section class="cv-sec">
      <h2 class="cv-sec-title">Education</h2>
      @for (edu of education(); track $index) {
        <div class="cv-entry">
          <div class="cv-entry-head">
            <div><strong>{{ edu.degree }}{{ edu.field ? ', ' + edu.field : '' }}</strong></div>
            <span class="cv-date">{{ edu.startYear }} – {{ edu.endYear }}</span>
          </div>
          <p class="cv-inst">{{ edu.institution }}{{ edu.grade ? ' | ' + edu.grade : '' }}</p>
        </div>
      }
    </section>
  }

  @if (experience().length) {
    <section class="cv-sec">
      <h2 class="cv-sec-title">Academic &amp; Professional Experience</h2>
      @for (exp of experience(); track $index) {
        <div class="cv-entry">
          <div class="cv-entry-head">
            <div><strong>{{ exp.position }}</strong> — {{ exp.company }}</div>
            <span class="cv-date">{{ exp.startDate }} – {{ exp.isCurrent ? 'Present' : exp.endDate }}</span>
          </div>
          @if (exp.location) { <p class="cv-inst">{{ exp.location }}</p> }
          @if (exp.description) { <p class="cv-text">{{ exp.description }}</p> }
        </div>
      }
    </section>
  }

  @if (publications().length) {
    <section class="cv-sec">
      <h2 class="cv-sec-title">Publications</h2>
      @for (pub of publications(); track $index) {
        <div class="cv-pub">
          <p>{{ str(pub, 'title') }}
            @if (str(pub, 'journal')) { <em>{{ str(pub, 'journal') }}</em> }
            @if (str(pub, 'year'))    { ({{ str(pub, 'year') }}) }
          </p>
        </div>
      }
    </section>
  }

  @if (skills().length) {
    <section class="cv-sec">
      <h2 class="cv-sec-title">Skills &amp; Competencies</h2>
      <p class="cv-text">{{ skills().join(' · ') }}</p>
    </section>
  }

  @if (langs().length) {
    <section class="cv-sec">
      <h2 class="cv-sec-title">Languages</h2>
      <p class="cv-text">{{ langs().map(l => l.language + (l.proficiency ? ' (' + l.proficiency + ')' : '')).join(' · ') }}</p>
    </section>
  }

  @if (certifications().length) {
    <section class="cv-sec">
      <h2 class="cv-sec-title">Certifications</h2>
      @for (cert of certifications(); track $index) {
        <div class="cv-entry">
          <div class="cv-entry-head">
            <div><strong>{{ cert.name }}</strong>{{ cert.issuer ? ' — ' + cert.issuer : '' }}</div>
            @if (cert.date) { <span class="cv-date">{{ cert.date }}</span> }
          </div>
        </div>
      }
    </section>
  }

  @if (awards().length) {
    <section class="cv-sec">
      <h2 class="cv-sec-title">Awards &amp; Achievements</h2>
      @for (award of awards(); track $index) {
        <div class="cv-entry">
          <div class="cv-entry-head">
            <div><strong>{{ award.title }}</strong>{{ award.issuer ? ' — ' + award.issuer : '' }}</div>
            @if (award.date) { <span class="cv-date">{{ award.date }}</span> }
          </div>
          @if (award.description) { <p class="cv-text">{{ award.description }}</p> }
        </div>
      }
    </section>
  }
</div>
  `,
  styles: [`
    .cv-page {
      font-family: 'Georgia', 'Times New Roman', serif;
      font-size: 10.5pt;
      width: 210mm;
      min-height: 297mm;
      padding: 16mm 18mm;
      box-sizing: border-box;
      background: #fff;
      color: #1a1a1a;
      line-height: 1.5;
    }
    .cv-header { text-align: center; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 2px solid #374151; }
    .cv-name  { font-size: 20pt; font-weight: 700; margin: 0 0 3px; }
    .cv-title { font-size: 11pt; color: #555; margin: 0 0 6px; font-style: italic; }
    .cv-contact { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 14px; font-size: 9pt; color: #555; font-family: Arial, sans-serif; }
    .cv-sec { margin-bottom: 12px; }
    .cv-sec-title {
      font-size: 10.5pt; font-weight: 700; letter-spacing: 0.06em;
      text-transform: uppercase; margin: 0 0 5px;
      padding-bottom: 2px; border-bottom: 1.5px solid #374151;
    }
    .cv-entry { margin-bottom: 8px; }
    .cv-entry-head { display: flex; justify-content: space-between; align-items: baseline; font-size: 10.5pt; }
    .cv-date { font-size: 9.5pt; color: #555; white-space: nowrap; font-family: Arial, sans-serif; }
    .cv-inst { font-size: 9.5pt; color: #555; margin: 2px 0 0; font-style: italic; }
    .cv-text { font-size: 10pt; margin: 3px 0; color: #222; white-space: pre-line; }
    .cv-pub { margin-bottom: 5px; p { font-size: 9.5pt; margin: 0; em { font-style: italic; } } }
  `],
})
export class CvCleanTemplate implements OnChanges {
  @Input() sections: DocumentSectionData[] = [];
  private readonly _s = signal<DocumentSectionData[]>([]);
  ngOnChanges(c: SimpleChanges): void { if (c['sections']) this._s.set(this.sections); }

  readonly str = str;

  p              = computed(() => getPersonalInfo(this._s()));
  summary        = computed(() => getSummary(this._s()));
  experience     = computed(() => getExperience(this._s()));
  education      = computed(() => getEducation(this._s()));
  skills         = computed(() => getSkills(this._s()));
  langs          = computed(() => getLanguages(this._s()));
  certifications = computed(() => getCertifications(this._s()));
  awards         = computed(() => getAwards(this._s()));
  publications   = computed(() => getSectionItems(this._s(), 'publications'));
}
