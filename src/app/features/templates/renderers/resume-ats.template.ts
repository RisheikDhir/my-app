import { Component, Input, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { DocumentSectionData } from '../../../core/models/document.models';
import {
  getPersonalInfo, getExperience, getEducation, getSummary,
  getSkills, getLanguages, getProjects, getCertifications,
  getAwards, getHobbies, getReferences,
} from '../../../core/utils/doc-extractor.utils';

@Component({
  selector: 'tpl-resume-ats',
  standalone: true,
  template: `
<div class="ats-page">
  <!-- Header -->
  <header class="ats-header">
    <h1 class="ats-name">{{ p().fullName }}</h1>
    @if (p().jobTitle) { <p class="ats-title">{{ p().jobTitle }}</p> }
    <div class="ats-contact">
      @if (p().email)    { <span>{{ p().email }}</span> }
      @if (p().phone)    { <span>{{ p().phone }}</span> }
      @if (p().location) { <span>{{ p().location }}</span> }
      @if (p().linkedin) { <span>{{ p().linkedin }}</span> }
      @if (p().github)   { <span>{{ p().github }}</span> }
      @if (p().website)  { <span>{{ p().website }}</span> }
    </div>
  </header>

  <!-- Summary -->
  @if (summary()) {
    <section class="ats-section">
      <h2 class="ats-section-title">PROFESSIONAL SUMMARY</h2>
      <div class="ats-divider"></div>
      <p class="ats-text">{{ summary() }}</p>
    </section>
  }

  <!-- Experience -->
  @if (experience().length) {
    <section class="ats-section">
      <h2 class="ats-section-title">WORK EXPERIENCE</h2>
      <div class="ats-divider"></div>
      @for (exp of experience(); track $index) {
        <div class="ats-entry">
          <div class="ats-entry-header">
            <strong>{{ exp.position }}</strong>
            <span class="ats-dates">{{ exp.startDate }}@if (exp.startDate || exp.endDate || exp.isCurrent) { – }{{ exp.isCurrent ? 'Present' : exp.endDate }}</span>
          </div>
          <div class="ats-entry-sub">
            {{ exp.company }}{{ exp.location ? ' · ' + exp.location : '' }}
          </div>
          @if (exp.description) {
            <p class="ats-text" style="margin-top:4px;">{{ exp.description }}</p>
          }
        </div>
      }
    </section>
  }

  <!-- Education -->
  @if (education().length) {
    <section class="ats-section">
      <h2 class="ats-section-title">EDUCATION</h2>
      <div class="ats-divider"></div>
      @for (edu of education(); track $index) {
        <div class="ats-entry">
          <div class="ats-entry-header">
            <strong>{{ edu.degree }}{{ edu.field ? ' — ' + edu.field : '' }}</strong>
            <span class="ats-dates">{{ edu.startYear }}@if (edu.startYear || edu.endYear) { – }{{ edu.endYear }}</span>
          </div>
          <div class="ats-entry-sub">
            {{ edu.institution }}{{ edu.grade ? ' · ' + edu.grade : '' }}
          </div>
        </div>
      }
    </section>
  }

  <!-- Skills -->
  @if (skills().length) {
    <section class="ats-section">
      <h2 class="ats-section-title">SKILLS</h2>
      <div class="ats-divider"></div>
      <p class="ats-text">{{ skills().join(' · ') }}</p>
    </section>
  }

  <!-- Projects -->
  @if (projects().length) {
    <section class="ats-section">
      <h2 class="ats-section-title">PROJECTS</h2>
      <div class="ats-divider"></div>
      @for (proj of projects(); track $index) {
        <div class="ats-entry">
          <div class="ats-entry-header">
            <strong>{{ proj.name }}{{ proj.role ? ' · ' + proj.role : '' }}</strong>
            @if (proj.startDate || proj.endDate) {
              <span class="ats-dates">{{ proj.startDate }}@if (proj.startDate || proj.endDate) { – }{{ proj.endDate }}</span>
            }
          </div>
          @if (proj.url) { <div class="ats-entry-sub">{{ proj.url }}</div> }
          @if (proj.technologies.length) {
            <p class="ats-text" style="margin-top:2px;color:#555;">Tech: {{ proj.technologies.join(', ') }}</p>
          }
          @if (proj.description) {
            <p class="ats-text" style="margin-top:3px;">{{ proj.description }}</p>
          }
        </div>
      }
    </section>
  }

  <!-- Certifications -->
  @if (certifications().length) {
    <section class="ats-section">
      <h2 class="ats-section-title">CERTIFICATIONS</h2>
      <div class="ats-divider"></div>
      @for (cert of certifications(); track $index) {
        <div class="ats-entry">
          <div class="ats-entry-header">
            <strong>{{ cert.name }}</strong>
            @if (cert.date) { <span class="ats-dates">{{ cert.date }}</span> }
          </div>
          @if (cert.issuer) {
            <div class="ats-entry-sub">{{ cert.issuer }}{{ cert.credentialId ? ' · ID: ' + cert.credentialId : '' }}</div>
          }
        </div>
      }
    </section>
  }

  <!-- Languages -->
  @if (langs().length) {
    <section class="ats-section">
      <h2 class="ats-section-title">LANGUAGES</h2>
      <div class="ats-divider"></div>
      <p class="ats-text">{{ langs().map(l => l.language + (l.proficiency ? ' (' + l.proficiency + ')' : '')).join(' · ') }}</p>
    </section>
  }

  <!-- Awards -->
  @if (awards().length) {
    <section class="ats-section">
      <h2 class="ats-section-title">AWARDS & ACHIEVEMENTS</h2>
      <div class="ats-divider"></div>
      @for (award of awards(); track $index) {
        <div class="ats-entry">
          <div class="ats-entry-header">
            <strong>{{ award.title }}</strong>
            @if (award.date) { <span class="ats-dates">{{ award.date }}</span> }
          </div>
          @if (award.issuer) { <div class="ats-entry-sub">{{ award.issuer }}</div> }
          @if (award.description) { <p class="ats-text" style="margin-top:3px;">{{ award.description }}</p> }
        </div>
      }
    </section>
  }

  <!-- Hobbies -->
  @if (hobbies().length) {
    <section class="ats-section">
      <h2 class="ats-section-title">INTERESTS & HOBBIES</h2>
      <div class="ats-divider"></div>
      <p class="ats-text">{{ hobbies().join(' · ') }}</p>
    </section>
  }

  <!-- References -->
  @if (references().length) {
    <section class="ats-section">
      <h2 class="ats-section-title">REFERENCES</h2>
      <div class="ats-divider"></div>
      <div class="ats-refs-grid">
        @for (ref of references(); track $index) {
          <div>
            <strong>{{ ref.name }}</strong>
            @if (ref.position || ref.company) {
              <div class="ats-entry-sub">{{ ref.position }}{{ ref.company ? ', ' + ref.company : '' }}</div>
            }
            @if (ref.email) { <div class="ats-entry-sub">{{ ref.email }}</div> }
            @if (ref.phone) { <div class="ats-entry-sub">{{ ref.phone }}</div> }
          </div>
        }
      </div>
    </section>
  }
</div>
  `,
  styles: [`
    .ats-page {
      font-family: 'Arial', sans-serif;
      font-size: 10.5pt;
      color: #111;
      width: 210mm;
      min-height: 297mm;
      padding: 18mm 18mm 14mm;
      box-sizing: border-box;
      background: #fff;
      line-height: 1.45;
    }
    .ats-header { text-align: center; margin-bottom: 12px; }
    .ats-name { font-size: 20pt; font-weight: 700; letter-spacing: 0.04em; margin: 0 0 3px; }
    .ats-title { font-size: 11pt; color: #444; margin: 0 0 6px; }
    .ats-contact { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 12px; font-size: 9pt; color: #444; }
    .ats-section { margin-bottom: 12px; }
    .ats-section-title { font-size: 10pt; font-weight: 700; letter-spacing: 0.12em; margin: 0 0 3px; }
    .ats-divider { height: 1.5px; background: #111; margin-bottom: 7px; }
    .ats-entry { margin-bottom: 8px; }
    .ats-entry-header { display: flex; justify-content: space-between; font-size: 10.5pt; }
    .ats-entry-sub { font-size: 9.5pt; color: #555; }
    .ats-dates { font-size: 9.5pt; color: #555; white-space: nowrap; }
    .ats-text { margin: 0; font-size: 10pt; color: #222; white-space: pre-line; }
    .ats-refs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  `],
})
export class ResumeAtsTemplate implements OnChanges {
  @Input() sections: DocumentSectionData[] = [];
  private readonly _s = signal<DocumentSectionData[]>([]);
  ngOnChanges(c: SimpleChanges): void { if (c['sections']) this._s.set(this.sections); }

  p              = computed(() => getPersonalInfo(this._s()));
  summary        = computed(() => getSummary(this._s()));
  experience     = computed(() => getExperience(this._s()));
  education      = computed(() => getEducation(this._s()));
  skills         = computed(() => getSkills(this._s()));
  langs          = computed(() => getLanguages(this._s()));
  projects       = computed(() => getProjects(this._s()));
  certifications = computed(() => getCertifications(this._s()));
  awards         = computed(() => getAwards(this._s()));
  hobbies        = computed(() => getHobbies(this._s()));
  references     = computed(() => getReferences(this._s()));
}
