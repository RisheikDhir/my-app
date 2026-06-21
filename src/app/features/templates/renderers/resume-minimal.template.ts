import { Component, Input, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { DocumentSectionData } from '../../../core/models/document.models';
import {
  getPersonalInfo, getExperience, getEducation, getSummary,
  getSkills, getLanguages, getProjects, getCertifications,
  getAwards, getHobbies,
} from '../../../core/utils/doc-extractor.utils';

@Component({
  selector: 'tpl-resume-minimal',
  standalone: true,
  template: `
<div class="min-page">
  <header class="min-header">
    <h1 class="min-name">{{ p().fullName }}</h1>
    @if (p().jobTitle) { <p class="min-title">{{ p().jobTitle }}</p> }
    <div class="min-contact">
      @if (p().email)    { <span>{{ p().email }}</span> }
      @if (p().phone)    { <span>{{ p().phone }}</span> }
      @if (p().location) { <span>{{ p().location }}</span> }
      @if (p().linkedin) { <span>{{ p().linkedin }}</span> }
      @if (p().website)  { <span>{{ p().website }}</span> }
    </div>
  </header>

  @if (summary()) {
    <section class="min-sec">
      <h2 class="min-sec-label">Profile</h2>
      <p class="min-text">{{ summary() }}</p>
    </section>
  }

  @if (experience().length) {
    <section class="min-sec">
      <h2 class="min-sec-label">Experience</h2>
      @for (exp of experience(); track $index) {
        <div class="min-entry">
          <div class="min-row">
            <span class="min-bold">{{ exp.position }}</span>
            <span class="min-date">{{ exp.startDate }}{{ (exp.startDate || exp.endDate || exp.isCurrent) ? ' – ' : '' }}{{ exp.isCurrent ? 'Present' : exp.endDate }}</span>
          </div>
          <p class="min-sub">{{ exp.company }}{{ exp.location ? ', ' + exp.location : '' }}</p>
          @if (exp.description) { <p class="min-text">{{ exp.description }}</p> }
        </div>
      }
    </section>
  }

  @if (education().length) {
    <section class="min-sec">
      <h2 class="min-sec-label">Education</h2>
      @for (edu of education(); track $index) {
        <div class="min-entry">
          <div class="min-row">
            <span class="min-bold">{{ edu.degree }}{{ edu.field ? ', ' + edu.field : '' }}</span>
            <span class="min-date">{{ edu.startYear }}{{ (edu.startYear || edu.endYear) ? ' – ' : '' }}{{ edu.endYear }}</span>
          </div>
          <p class="min-sub">{{ edu.institution }}{{ edu.grade ? ' · ' + edu.grade : '' }}</p>
        </div>
      }
    </section>
  }

  @if (projects().length) {
    <section class="min-sec">
      <h2 class="min-sec-label">Projects</h2>
      @for (proj of projects(); track $index) {
        <div class="min-entry">
          <div class="min-row">
            <span class="min-bold">{{ proj.name }}{{ proj.role ? ' · ' + proj.role : '' }}</span>
            @if (proj.startDate || proj.endDate) {
              <span class="min-date">{{ proj.startDate }}{{ (proj.startDate || proj.endDate) ? ' – ' : '' }}{{ proj.endDate }}</span>
            }
          </div>
          @if (proj.technologies.length) { <p class="min-sub">{{ proj.technologies.join(', ') }}</p> }
          @if (proj.description) { <p class="min-text">{{ proj.description }}</p> }
        </div>
      }
    </section>
  }

  @if (skills().length || certifications().length || langs().length || hobbies().length) {
    <section class="min-sec">
      <h2 class="min-sec-label">Additional</h2>
      @if (skills().length) {
        <p class="min-text"><span class="min-bold">Skills:</span> {{ skills().join(', ') }}</p>
      }
      @if (langs().length) {
        <p class="min-text"><span class="min-bold">Languages:</span> {{ langs().map(l => l.language + (l.proficiency ? ' (' + l.proficiency + ')' : '')).join(', ') }}</p>
      }
      @if (certifications().length) {
        <p class="min-text"><span class="min-bold">Certifications:</span> {{ certifications().map(c => c.name + (c.issuer ? ', ' + c.issuer : '')).join(' · ') }}</p>
      }
      @if (awards().length) {
        <p class="min-text"><span class="min-bold">Awards:</span> {{ awards().map(a => a.title).join(' · ') }}</p>
      }
      @if (hobbies().length) {
        <p class="min-text"><span class="min-bold">Interests:</span> {{ hobbies().join(', ') }}</p>
      }
    </section>
  }
</div>
  `,
  styles: [`
    .min-page {
      font-family: 'Georgia', 'Times New Roman', serif;
      font-size: 10.5pt;
      color: #1a1a1a;
      width: 210mm;
      min-height: 297mm;
      padding: 20mm 22mm;
      box-sizing: border-box;
      background: #fff;
      line-height: 1.55;
    }
    .min-header { margin-bottom: 20px; padding-bottom: 14px; border-bottom: 2px solid #1a1a1a; }
    .min-name { font-size: 26pt; font-weight: 400; letter-spacing: 0.03em; margin: 0 0 3px; font-family: 'Georgia', serif; }
    .min-title { font-size: 11pt; color: #555; margin: 0 0 8px; font-style: italic; }
    .min-contact { display: flex; flex-wrap: wrap; gap: 4px 16px; font-size: 9pt; color: #555; font-family: Arial, sans-serif; }
    .min-sec { margin-bottom: 16px; padding-bottom: 2px; }
    .min-sec-label {
      font-size: 8pt; font-family: Arial, sans-serif; letter-spacing: 0.18em;
      text-transform: uppercase; font-weight: 700; color: #888;
      margin: 0 0 8px; padding-bottom: 4px; border-bottom: 1px solid #e0e0e0;
    }
    .min-entry { margin-bottom: 10px; }
    .min-row { display: flex; justify-content: space-between; align-items: baseline; }
    .min-bold { font-weight: 700; font-size: 10.5pt; }
    .min-date { font-size: 9pt; color: #777; font-family: Arial, sans-serif; white-space: nowrap; }
    .min-sub { font-size: 9.5pt; color: #666; margin: 1px 0 3px; font-style: italic; }
    .min-text { font-size: 10pt; color: #333; margin: 3px 0; white-space: pre-line; }
  `],
})
export class ResumeMinimalTemplate implements OnChanges {
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
}
