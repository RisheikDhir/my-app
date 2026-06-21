import { Component, Input, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { DocumentSectionData } from '../../../core/models/document.models';
import {
  getPersonalInfo, getExperience, getEducation, getSummary,
  getSkills, getLanguages, getProjects, getCertifications,
  getAwards, getHobbies, getReferences,
} from '../../../core/utils/doc-extractor.utils';

@Component({
  selector: 'tpl-resume-professional',
  standalone: true,
  template: `
<div class="pro-page">
  <!-- Blue header bar -->
  <header class="pro-header">
    <div class="pro-header-main">
      <h1 class="pro-name">{{ p().fullName }}</h1>
      @if (p().jobTitle) { <p class="pro-title">{{ p().jobTitle }}</p> }
    </div>
    <div class="pro-header-contact">
      @if (p().email)    { <span>{{ p().email }}</span> }
      @if (p().phone)    { <span>{{ p().phone }}</span> }
      @if (p().location) { <span>{{ p().location }}</span> }
      @if (p().linkedin) { <span>{{ p().linkedin }}</span> }
      @if (p().website)  { <span>{{ p().website }}</span> }
    </div>
  </header>

  <div class="pro-body">

    @if (summary()) {
      <section class="pro-sec">
        <h2 class="pro-sec-title">Professional Summary</h2>
        <p class="pro-text">{{ summary() }}</p>
      </section>
    }

    @if (experience().length) {
      <section class="pro-sec">
        <h2 class="pro-sec-title">Work Experience</h2>
        @for (exp of experience(); track $index) {
          <div class="pro-entry">
            <div class="pro-entry-top">
              <div>
                <span class="pro-pos">{{ exp.position }}</span>
                <span class="pro-company"> · {{ exp.company }}{{ exp.location ? ', ' + exp.location : '' }}</span>
              </div>
              <span class="pro-date">{{ exp.startDate }}{{ (exp.startDate || exp.endDate || exp.isCurrent) ? ' – ' : '' }}{{ exp.isCurrent ? 'Present' : exp.endDate }}</span>
            </div>
            @if (exp.description) { <p class="pro-text pro-desc">{{ exp.description }}</p> }
          </div>
        }
      </section>
    }

    @if (education().length) {
      <section class="pro-sec">
        <h2 class="pro-sec-title">Education</h2>
        @for (edu of education(); track $index) {
          <div class="pro-entry">
            <div class="pro-entry-top">
              <div>
                <span class="pro-pos">{{ edu.degree }}{{ edu.field ? ', ' + edu.field : '' }}</span>
                <span class="pro-company"> · {{ edu.institution }}{{ edu.grade ? ', ' + edu.grade : '' }}</span>
              </div>
              <span class="pro-date">{{ edu.startYear }}{{ (edu.startYear || edu.endYear) ? ' – ' : '' }}{{ edu.endYear }}</span>
            </div>
          </div>
        }
      </section>
    }

    <div class="pro-two-col">
      <div class="pro-col-main">
        @if (projects().length) {
          <section class="pro-sec">
            <h2 class="pro-sec-title">Projects</h2>
            @for (proj of projects(); track $index) {
              <div class="pro-entry">
                <div class="pro-entry-top">
                  <span class="pro-pos">{{ proj.name }}{{ proj.role ? ' — ' + proj.role : '' }}</span>
                  @if (proj.startDate || proj.endDate) {
                    <span class="pro-date">{{ proj.startDate }}–{{ proj.endDate }}</span>
                  }
                </div>
                @if (proj.technologies.length) {
                  <p class="pro-company">{{ proj.technologies.join(', ') }}</p>
                }
                @if (proj.description) { <p class="pro-text pro-desc">{{ proj.description }}</p> }
              </div>
            }
          </section>
        }

        @if (certifications().length) {
          <section class="pro-sec">
            <h2 class="pro-sec-title">Certifications</h2>
            @for (cert of certifications(); track $index) {
              <div class="pro-entry">
                <div class="pro-entry-top">
                  <span class="pro-pos">{{ cert.name }}</span>
                  @if (cert.date) { <span class="pro-date">{{ cert.date }}</span> }
                </div>
                @if (cert.issuer) { <p class="pro-company">{{ cert.issuer }}</p> }
              </div>
            }
          </section>
        }

        @if (awards().length) {
          <section class="pro-sec">
            <h2 class="pro-sec-title">Awards</h2>
            @for (award of awards(); track $index) {
              <div class="pro-entry">
                <div class="pro-entry-top">
                  <span class="pro-pos">{{ award.title }}</span>
                  @if (award.date) { <span class="pro-date">{{ award.date }}</span> }
                </div>
                @if (award.issuer) { <p class="pro-company">{{ award.issuer }}</p> }
                @if (award.description) { <p class="pro-text pro-desc">{{ award.description }}</p> }
              </div>
            }
          </section>
        }
      </div>

      <div class="pro-col-side">
        @if (skills().length) {
          <section class="pro-sec">
            <h2 class="pro-sec-title">Skills</h2>
            @for (skill of skills(); track skill) {
              <div class="pro-skill-row">
                <span class="pro-skill-dot">▸</span> {{ skill }}
              </div>
            }
          </section>
        }

        @if (langs().length) {
          <section class="pro-sec">
            <h2 class="pro-sec-title">Languages</h2>
            @for (l of langs(); track l.language) {
              <div class="pro-skill-row">
                <span class="pro-skill-dot">▸</span> {{ l.language }}@if (l.proficiency) { <em class="pro-prof"> ({{ l.proficiency }})</em> }
              </div>
            }
          </section>
        }

        @if (hobbies().length) {
          <section class="pro-sec">
            <h2 class="pro-sec-title">Interests</h2>
            <p class="pro-text">{{ hobbies().join(', ') }}</p>
          </section>
        }

        @if (references().length) {
          <section class="pro-sec">
            <h2 class="pro-sec-title">References</h2>
            @for (ref of references(); track $index) {
              <div class="pro-entry">
                <strong class="pro-pos">{{ ref.name }}</strong>
                @if (ref.position) { <p class="pro-company">{{ ref.position }}{{ ref.company ? ', ' + ref.company : '' }}</p> }
                @if (ref.email)    { <p class="pro-company">{{ ref.email }}</p> }
              </div>
            }
          </section>
        }
      </div>
    </div>

  </div>
</div>
  `,
  styles: [`
    .pro-page {
      font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
      font-size: 10pt;
      width: 210mm;
      min-height: 297mm;
      background: #fff;
      box-sizing: border-box;
      color: #1a1a1a;
    }
    .pro-header {
      background: #1e3a5f;
      color: #fff;
      padding: 20px 24px 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16px;
    }
    .pro-name { font-size: 22pt; font-weight: 700; margin: 0 0 3px; letter-spacing: 0.02em; }
    .pro-title { font-size: 10.5pt; color: #93c5fd; margin: 0; font-style: italic; }
    .pro-header-contact {
      display: flex; flex-direction: column; align-items: flex-end;
      gap: 2px; font-size: 8.5pt; color: #bfdbfe; text-align: right; white-space: nowrap;
    }
    .pro-body { padding: 16px 24px; }
    .pro-two-col { display: flex; gap: 20px; }
    .pro-col-main { flex: 1.6; }
    .pro-col-side { flex: 1; padding-left: 16px; border-left: 2px solid #e2e8f0; }
    .pro-sec { margin-bottom: 14px; }
    .pro-sec-title {
      font-size: 9pt; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: #1e3a5f;
      margin: 0 0 6px; padding-bottom: 3px;
      border-bottom: 2px solid #1e3a5f;
    }
    .pro-entry { margin-bottom: 8px; }
    .pro-entry-top { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 2px; }
    .pro-pos { font-weight: 700; font-size: 10pt; }
    .pro-company { font-size: 9pt; color: #555; margin: 1px 0 2px; }
    .pro-date { font-size: 8.5pt; color: #777; white-space: nowrap; }
    .pro-text { font-size: 9.5pt; color: #333; margin: 3px 0; white-space: pre-line; }
    .pro-desc { padding-left: 0; }
    .pro-skill-row { font-size: 9.5pt; padding: 1.5px 0; color: #1a1a1a; }
    .pro-skill-dot { color: #1e3a5f; font-size: 8pt; margin-right: 4px; }
    .pro-prof { color: #777; font-style: italic; font-size: 9pt; }
  `],
})
export class ResumeProfessionalTemplate implements OnChanges {
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
