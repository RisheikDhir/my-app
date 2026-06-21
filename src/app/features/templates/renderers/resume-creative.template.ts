import { Component, Input, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { DocumentSectionData } from '../../../core/models/document.models';
import {
  getPersonalInfo, getExperience, getEducation, getSummary,
  getSkills, getLanguages, getProjects, getCertifications,
  getAwards, getHobbies,
} from '../../../core/utils/doc-extractor.utils';

@Component({
  selector: 'tpl-resume-creative',
  standalone: true,
  template: `
<div class="cre-page">
  <!-- Split header: accent left + name right -->
  <div class="cre-header">
    <div class="cre-accent-strip">
      <div class="cre-avatar">{{ initials() }}</div>
      @if (skills().length) {
        <div class="cre-strip-section">
          <h3 class="cre-strip-heading">Skills</h3>
          @for (skill of skills(); track skill) {
            <p class="cre-strip-item">{{ skill }}</p>
          }
        </div>
      }
      @if (langs().length) {
        <div class="cre-strip-section">
          <h3 class="cre-strip-heading">Languages</h3>
          @for (l of langs(); track l.language) {
            <p class="cre-strip-item">{{ l.language }}@if (l.proficiency) {<em class="cre-prof"> · {{ l.proficiency }}</em>}</p>
          }
        </div>
      }
      @if (hobbies().length) {
        <div class="cre-strip-section">
          <h3 class="cre-strip-heading">Interests</h3>
          <p class="cre-strip-item">{{ hobbies().join(', ') }}</p>
        </div>
      }
      <div class="cre-strip-section cre-contact-strip">
        <h3 class="cre-strip-heading">Contact</h3>
        @if (p().email)    { <p class="cre-strip-item">{{ p().email }}</p> }
        @if (p().phone)    { <p class="cre-strip-item">{{ p().phone }}</p> }
        @if (p().location) { <p class="cre-strip-item">{{ p().location }}</p> }
        @if (p().linkedin) { <p class="cre-strip-item">{{ p().linkedin }}</p> }
      </div>
    </div>

    <div class="cre-header-text">
      <h1 class="cre-name">{{ p().fullName }}</h1>
      @if (p().jobTitle) { <p class="cre-job-title">{{ p().jobTitle }}</p> }
      @if (summary()) { <p class="cre-summary">{{ summary() }}</p> }
    </div>
  </div>

  <!-- Main content -->
  <div class="cre-main">
    @if (experience().length) {
      <section class="cre-sec">
        <h2 class="cre-sec-title"><span class="cre-dot"></span>Experience</h2>
        @for (exp of experience(); track $index) {
          <div class="cre-entry">
            <div class="cre-timeline-dot"></div>
            <div class="cre-entry-body">
              <div class="cre-entry-head">
                <strong>{{ exp.position }}</strong>
                <span class="cre-date">{{ exp.startDate }}{{ (exp.startDate || exp.endDate || exp.isCurrent) ? '–' : '' }}{{ exp.isCurrent ? 'Present' : exp.endDate }}</span>
              </div>
              <p class="cre-entry-sub">{{ exp.company }}{{ exp.location ? ', ' + exp.location : '' }}</p>
              @if (exp.description) { <p class="cre-entry-text">{{ exp.description }}</p> }
            </div>
          </div>
        }
      </section>
    }

    @if (education().length) {
      <section class="cre-sec">
        <h2 class="cre-sec-title"><span class="cre-dot"></span>Education</h2>
        @for (edu of education(); track $index) {
          <div class="cre-entry">
            <div class="cre-timeline-dot"></div>
            <div class="cre-entry-body">
              <div class="cre-entry-head">
                <strong>{{ edu.degree }}{{ edu.field ? ', ' + edu.field : '' }}</strong>
                <span class="cre-date">{{ edu.startYear }}{{ (edu.startYear || edu.endYear) ? '–' : '' }}{{ edu.endYear }}</span>
              </div>
              <p class="cre-entry-sub">{{ edu.institution }}{{ edu.grade ? ' · ' + edu.grade : '' }}</p>
            </div>
          </div>
        }
      </section>
    }

    @if (projects().length) {
      <section class="cre-sec">
        <h2 class="cre-sec-title"><span class="cre-dot"></span>Projects</h2>
        @for (proj of projects(); track $index) {
          <div class="cre-entry">
            <div class="cre-timeline-dot"></div>
            <div class="cre-entry-body">
              <div class="cre-entry-head">
                <strong>{{ proj.name }}</strong>
                @if (proj.startDate || proj.endDate) {
                  <span class="cre-date">{{ proj.startDate }}–{{ proj.endDate }}</span>
                }
              </div>
              @if (proj.technologies.length) {
                <p class="cre-entry-sub">{{ proj.technologies.join(' · ') }}</p>
              }
              @if (proj.description) { <p class="cre-entry-text">{{ proj.description }}</p> }
            </div>
          </div>
        }
      </section>
    }

    @if (certifications().length) {
      <section class="cre-sec">
        <h2 class="cre-sec-title"><span class="cre-dot"></span>Certifications</h2>
        @for (cert of certifications(); track $index) {
          <div class="cre-entry">
            <div class="cre-timeline-dot"></div>
            <div class="cre-entry-body">
              <div class="cre-entry-head">
                <strong>{{ cert.name }}</strong>
                @if (cert.date) { <span class="cre-date">{{ cert.date }}</span> }
              </div>
              @if (cert.issuer) { <p class="cre-entry-sub">{{ cert.issuer }}</p> }
            </div>
          </div>
        }
      </section>
    }

    @if (awards().length) {
      <section class="cre-sec">
        <h2 class="cre-sec-title"><span class="cre-dot"></span>Awards</h2>
        @for (award of awards(); track $index) {
          <div class="cre-entry">
            <div class="cre-timeline-dot"></div>
            <div class="cre-entry-body">
              <div class="cre-entry-head">
                <strong>{{ award.title }}</strong>
                @if (award.date) { <span class="cre-date">{{ award.date }}</span> }
              </div>
              @if (award.issuer) { <p class="cre-entry-sub">{{ award.issuer }}</p> }
              @if (award.description) { <p class="cre-entry-text">{{ award.description }}</p> }
            </div>
          </div>
        }
      </section>
    }
  </div>
</div>
  `,
  styles: [`
    .cre-page {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 9.5pt;
      width: 210mm;
      min-height: 297mm;
      background: #fff;
      box-sizing: border-box;
      color: #1a1a1a;
    }
    .cre-header {
      display: flex;
      min-height: 80mm;
    }
    .cre-accent-strip {
      width: 62mm;
      background: linear-gradient(160deg, #0f4c75 0%, #1b6ca8 60%, #118ab2 100%);
      color: #e8f4fd;
      padding: 20px 14px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .cre-avatar {
      width: 64px; height: 64px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      border: 2px solid rgba(255,255,255,0.5);
      color: #fff;
      font-size: 18pt; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 16px;
    }
    .cre-strip-section { margin-bottom: 12px; }
    .cre-strip-heading {
      font-size: 7pt; letter-spacing: 0.15em; text-transform: uppercase;
      color: rgba(255,255,255,0.6); margin: 0 0 4px; font-weight: 700;
    }
    .cre-strip-item { font-size: 8pt; margin: 2px 0; color: #e8f4fd; word-break: break-word; }
    .cre-prof { color: rgba(255,255,255,0.6); font-style: normal; font-size: 7.5pt; }
    .cre-contact-strip { margin-top: auto; }
    .cre-header-text {
      flex: 1;
      background: #f0f7ff;
      padding: 24px 20px 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .cre-name { font-size: 22pt; font-weight: 800; color: #0f4c75; margin: 0 0 4px; }
    .cre-job-title { font-size: 11pt; color: #1b6ca8; margin: 0 0 10px; font-weight: 500; }
    .cre-summary { font-size: 9.5pt; color: #374151; margin: 0; line-height: 1.5; }
    .cre-main { padding: 16px 20px 16px 20px; }
    .cre-sec { margin-bottom: 14px; }
    .cre-sec-title {
      font-size: 10pt; font-weight: 800; color: #0f4c75;
      margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.08em;
      display: flex; align-items: center; gap: 8px;
    }
    .cre-dot {
      width: 10px; height: 10px; border-radius: 50%;
      background: #1b6ca8; flex-shrink: 0; display: inline-block;
    }
    .cre-entry {
      display: flex; gap: 10px; margin-bottom: 8px;
      padding-left: 4px;
    }
    .cre-timeline-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #93c5fd; flex-shrink: 0; margin-top: 4px;
    }
    .cre-entry-body { flex: 1; }
    .cre-entry-head { display: flex; justify-content: space-between; align-items: baseline; }
    .cre-date { font-size: 8pt; color: #888; white-space: nowrap; }
    .cre-entry-sub { font-size: 8.5pt; color: #1b6ca8; margin: 1px 0 2px; }
    .cre-entry-text { font-size: 9pt; color: #374151; margin: 2px 0; white-space: pre-line; line-height: 1.4; }
  `],
})
export class ResumeCreativeTemplate implements OnChanges {
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

  initials = computed(() => {
    const n = this.p().fullName;
    const parts = n.split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : n.slice(0, 2).toUpperCase();
  });
}
