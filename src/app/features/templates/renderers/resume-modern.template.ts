import { Component, Input, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { DocumentSectionData } from '../../../core/models/document.models';
import {
  getPersonalInfo, getExperience, getEducation, getSummary,
  getSkills, getLanguages, getProjects, getCertifications,
  getAwards, getHobbies, getReferences,
} from '../../../core/utils/doc-extractor.utils';

@Component({
  selector: 'tpl-resume-modern',
  standalone: true,
  template: `
<div class="mod-page">
  <!-- Sidebar -->
  <aside class="mod-sidebar">
    @if (p().photo) {
      <img class="mod-photo" [src]="p().photo" alt="Profile" />
    } @else {
      <div class="mod-photo-placeholder">{{ initials() }}</div>
    }

    <div class="mod-section">
      <h3 class="mod-sidebar-heading">Contact</h3>
      @if (p().email)    { <p class="mod-contact-item">✉ {{ p().email }}</p> }
      @if (p().phone)    { <p class="mod-contact-item">📞 {{ p().phone }}</p> }
      @if (p().location) { <p class="mod-contact-item">📍 {{ p().location }}</p> }
      @if (p().linkedin) { <p class="mod-contact-item">in {{ p().linkedin }}</p> }
      @if (p().github)   { <p class="mod-contact-item">⌥ {{ p().github }}</p> }
      @if (p().website)  { <p class="mod-contact-item">🌐 {{ p().website }}</p> }
    </div>

    @if (skills().length) {
      <div class="mod-section">
        <h3 class="mod-sidebar-heading">Skills</h3>
        @for (skill of skills(); track skill) {
          <div class="mod-skill-bar">
            <span class="mod-skill-name">{{ skill }}</span>
          </div>
        }
      </div>
    }

    @if (langs().length) {
      <div class="mod-section">
        <h3 class="mod-sidebar-heading">Languages</h3>
        @for (l of langs(); track l.language) {
          <p class="mod-contact-item">{{ l.language }}@if (l.proficiency) { <em> · {{ l.proficiency }}</em> }</p>
        }
      </div>
    }

    @if (hobbies().length) {
      <div class="mod-section">
        <h3 class="mod-sidebar-heading">Interests</h3>
        <div class="mod-tags">
          @for (h of hobbies(); track h) {
            <span class="mod-tag">{{ h }}</span>
          }
        </div>
      </div>
    }
  </aside>

  <!-- Main -->
  <main class="mod-main">
    <h1 class="mod-name">{{ p().fullName }}</h1>
    @if (p().jobTitle) { <p class="mod-job-title">{{ p().jobTitle }}</p> }

    @if (summary()) {
      <section class="mod-sec">
        <h2 class="mod-sec-title">About Me</h2>
        <p class="mod-text">{{ summary() }}</p>
      </section>
    }

    @if (experience().length) {
      <section class="mod-sec">
        <h2 class="mod-sec-title">Experience</h2>
        @for (exp of experience(); track $index) {
          <div class="mod-entry">
            <div class="mod-entry-top">
              <strong>{{ exp.position }}</strong>
              <span class="mod-date">{{ exp.startDate }}@if (exp.startDate || exp.endDate || exp.isCurrent) { – }{{ exp.isCurrent ? 'Present' : exp.endDate }}</span>
            </div>
            <p class="mod-company">{{ exp.company }}{{ exp.location ? ', ' + exp.location : '' }}</p>
            @if (exp.description) { <p class="mod-text">{{ exp.description }}</p> }
          </div>
        }
      </section>
    }

    @if (education().length) {
      <section class="mod-sec">
        <h2 class="mod-sec-title">Education</h2>
        @for (edu of education(); track $index) {
          <div class="mod-entry">
            <div class="mod-entry-top">
              <strong>{{ edu.degree }}{{ edu.field ? ' — ' + edu.field : '' }}</strong>
              <span class="mod-date">{{ edu.startYear }}@if (edu.startYear || edu.endYear) { – }{{ edu.endYear }}</span>
            </div>
            <p class="mod-company">{{ edu.institution }}{{ edu.grade ? ' · ' + edu.grade : '' }}</p>
          </div>
        }
      </section>
    }

    @if (projects().length) {
      <section class="mod-sec">
        <h2 class="mod-sec-title">Projects</h2>
        @for (proj of projects(); track $index) {
          <div class="mod-entry">
            <div class="mod-entry-top">
              <strong>{{ proj.name }}{{ proj.role ? ' · ' + proj.role : '' }}</strong>
              @if (proj.startDate || proj.endDate) {
                <span class="mod-date">{{ proj.startDate }}@if (proj.startDate || proj.endDate) { – }{{ proj.endDate }}</span>
              }
            </div>
            @if (proj.url) { <p class="mod-company">{{ proj.url }}</p> }
            @if (proj.technologies.length) {
              <div class="mod-tags mod-tags-sm">
                @for (t of proj.technologies; track t) { <span class="mod-tag">{{ t }}</span> }
              </div>
            }
            @if (proj.description) { <p class="mod-text">{{ proj.description }}</p> }
          </div>
        }
      </section>
    }

    @if (certifications().length) {
      <section class="mod-sec">
        <h2 class="mod-sec-title">Certifications</h2>
        @for (cert of certifications(); track $index) {
          <div class="mod-entry">
            <div class="mod-entry-top">
              <strong>{{ cert.name }}</strong>
              @if (cert.date) { <span class="mod-date">{{ cert.date }}</span> }
            </div>
            @if (cert.issuer) { <p class="mod-company">{{ cert.issuer }}{{ cert.credentialId ? ' · ID: ' + cert.credentialId : '' }}</p> }
          </div>
        }
      </section>
    }

    @if (awards().length) {
      <section class="mod-sec">
        <h2 class="mod-sec-title">Awards & Achievements</h2>
        @for (award of awards(); track $index) {
          <div class="mod-entry">
            <div class="mod-entry-top">
              <strong>{{ award.title }}</strong>
              @if (award.date) { <span class="mod-date">{{ award.date }}</span> }
            </div>
            @if (award.issuer) { <p class="mod-company">{{ award.issuer }}</p> }
            @if (award.description) { <p class="mod-text">{{ award.description }}</p> }
          </div>
        }
      </section>
    }

    @if (references().length) {
      <section class="mod-sec">
        <h2 class="mod-sec-title">References</h2>
        <div class="mod-refs-grid">
          @for (ref of references(); track $index) {
            <div class="mod-ref-card">
              <strong>{{ ref.name }}</strong>
              @if (ref.position) { <p class="mod-company">{{ ref.position }}{{ ref.company ? ', ' + ref.company : '' }}</p> }
              @if (ref.email)    { <p class="mod-contact-item">{{ ref.email }}</p> }
              @if (ref.phone)    { <p class="mod-contact-item">{{ ref.phone }}</p> }
            </div>
          }
        </div>
      </section>
    }
  </main>
</div>
  `,
  styles: [`
    .mod-page {
      display: flex;
      width: 210mm;
      min-height: 297mm;
      background: #fff;
      font-family: 'Inter', 'Segoe UI', sans-serif;
      font-size: 9.5pt;
      box-sizing: border-box;
    }
    .mod-sidebar {
      width: 68mm;
      background: #1e1b4b;
      color: #e0e7ff;
      padding: 20px 16px;
      flex-shrink: 0;
    }
    .mod-photo {
      width: 80px; height: 80px;
      border-radius: 50%;
      object-fit: cover;
      display: block;
      margin: 0 auto 16px;
      border: 3px solid #6366f1;
    }
    .mod-photo-placeholder {
      width: 80px; height: 80px;
      border-radius: 50%;
      background: #6366f1;
      color: #fff;
      font-size: 24pt;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }
    .mod-section { margin-bottom: 16px; }
    .mod-sidebar-heading {
      font-size: 8pt;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #a5b4fc;
      margin: 0 0 6px;
      padding-bottom: 3px;
      border-bottom: 1px solid #3730a3;
    }
    .mod-contact-item { font-size: 8.5pt; margin: 3px 0; word-break: break-all; em { color: #a5b4fc; font-style: normal; } }
    .mod-skill-bar { font-size: 8.5pt; padding: 2px 0; }
    .mod-skill-name { color: #e0e7ff; }
    .mod-tags { display: flex; flex-wrap: wrap; gap: 3px; margin-top: 2px; }
    .mod-tags-sm { margin-top: 4px; margin-bottom: 3px; }
    .mod-tag {
      background: #312e81; color: #c7d2fe;
      font-size: 7.5pt; padding: 1px 6px;
      border-radius: 10px;
    }
    .mod-main { flex: 1; padding: 24px 20px; }
    .mod-name { font-size: 22pt; font-weight: 800; color: #1e1b4b; margin: 0 0 3px; }
    .mod-job-title { font-size: 11pt; color: #6366f1; margin: 0 0 16px; font-weight: 500; }
    .mod-sec { margin-bottom: 16px; }
    .mod-sec-title {
      font-size: 10pt; font-weight: 700; color: #1e1b4b;
      margin: 0 0 4px; padding-bottom: 3px;
      border-bottom: 2px solid #6366f1;
    }
    .mod-entry { margin-bottom: 10px; }
    .mod-entry-top { display: flex; justify-content: space-between; align-items: baseline; }
    .mod-date { font-size: 8.5pt; color: #6b7280; white-space: nowrap; }
    .mod-company { font-size: 9pt; color: #6366f1; margin: 1px 0 3px; }
    .mod-text { font-size: 9pt; color: #374151; margin: 3px 0; white-space: pre-line; line-height: 1.4; }
    .mod-refs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .mod-ref-card { font-size: 9pt; }
  `],
})
export class ResumeModernTemplate implements OnChanges {
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

  initials = computed(() => {
    const n = this.p().fullName;
    const parts = n.split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : n.slice(0, 2).toUpperCase();
  });
}
