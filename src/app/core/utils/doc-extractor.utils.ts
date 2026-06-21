// ─── Document Data Extractor Utilities ────────────────────────────────────────
// Helper functions that pull named field values out of DocumentSectionData[].
// Used by every template renderer component so they don't repeat this logic.

import { DocumentSectionData, DocumentSectionItem } from '../models/document.models';

/** Get the first item object from a non-repeatable section (e.g. personal info). */
export function getSection(
  sections: DocumentSectionData[],
  sectionId: string,
): DocumentSectionItem {
  return sections.find(s => s.sectionId === sectionId)?.items[0] ?? {};
}

/** Get ALL items from a repeatable section (e.g. experience, education). */
export function getSectionItems(
  sections: DocumentSectionData[],
  sectionId: string,
): DocumentSectionItem[] {
  return sections.find(s => s.sectionId === sectionId)?.items ?? [];
}

/** Read a field value as a string (handles string | string[] | boolean | null). */
export function str(item: DocumentSectionItem, fieldId: string): string {
  const val = item[fieldId];
  if (val === null || val === undefined) return '';
  if (typeof val === 'string')  return val;
  if (typeof val === 'boolean') return val ? 'Yes' : '';
  if (Array.isArray(val))       return val.join(', ');
  return String(val);
}

/** Read a field value as a string array (for tags/checkbox lists). */
export function arr(item: DocumentSectionItem, fieldId: string): string[] {
  const val = item[fieldId];
  if (Array.isArray(val)) return val as string[];
  if (typeof val === 'string' && val) return val.split(',').map(v => v.trim());
  return [];
}

/** Read a boolean field value. */
export function bool(item: DocumentSectionItem, fieldId: string): boolean {
  return !!item[fieldId];
}

// ── Convenience: common personal info fields ─────────────────────────────────

export interface PersonalInfo {
  firstName: string;
  lastName:  string;
  fullName:  string;
  jobTitle:  string;
  email:     string;
  phone:     string;
  location:  string;
  website:   string;
  linkedin:  string;
  github:    string;
  photo:     string;
}

export function getPersonalInfo(sections: DocumentSectionData[]): PersonalInfo {
  const p = getSection(sections, 'personal');
  const firstName = str(p, 'firstName');
  const lastName  = str(p, 'lastName');
  return {
    firstName,
    lastName,
    fullName:  [firstName, lastName].filter(Boolean).join(' ') || 'Your Name',
    jobTitle:  str(p, 'jobTitle'),
    email:     str(p, 'email'),
    phone:     str(p, 'phone'),
    location:  str(p, 'location'),
    website:   str(p, 'website'),
    linkedin:  str(p, 'linkedin'),
    github:    str(p, 'github'),
    photo:     str(p, 'photo'),
  };
}

export interface ExperienceItem {
  company:     string;
  position:    string;
  location:    string;
  startDate:   string;
  endDate:     string;
  isCurrent:   boolean;
  description: string;
}

export function getExperience(sections: DocumentSectionData[]): ExperienceItem[] {
  return getSectionItems(sections, 'experience').map(item => ({
    company:     str(item, 'company'),
    position:    str(item, 'position'),
    location:    str(item, 'location'),
    startDate:   str(item, 'startDate'),
    endDate:     str(item, 'endDate'),
    isCurrent:   bool(item, 'isCurrent'),
    description: str(item, 'description'),
  })).filter(e => e.company || e.position);
}

export interface EducationItem {
  institution: string;
  degree:      string;
  field:       string;
  startYear:   string;
  endYear:     string;
  grade:       string;
}

export function getEducation(sections: DocumentSectionData[]): EducationItem[] {
  return getSectionItems(sections, 'education').map(item => ({
    institution: str(item, 'institution'),
    degree:      str(item, 'degree'),
    field:       str(item, 'field'),
    startYear:   str(item, 'startYear'),
    endYear:     str(item, 'endYear'),
    grade:       str(item, 'grade'),
  })).filter(e => e.institution || e.degree);
}

export function getSummary(sections: DocumentSectionData[]): string {
  return str(getSection(sections, 'summary'), 'summary');
}

export function getSkills(sections: DocumentSectionData[]): string[] {
  const item = getSection(sections, 'skills');
  return [
    ...arr(item, 'technicalSkills'),
    ...arr(item, 'softSkills'),
    ...arr(item, 'tools'),
  ];
}

export function getLanguages(sections: DocumentSectionData[]): { language: string; proficiency: string }[] {
  // Structured repeatable section (language + proficiency entries)
  const fromSection = getSectionItems(sections, 'languages').map(item => ({
    language:    str(item, 'language'),
    proficiency: str(item, 'proficiency'),
  })).filter(l => l.language);

  if (fromSection.length) return fromSection;

  // Fall back to simple "Languages Known" tags field inside the skills section
  return arr(getSection(sections, 'skills'), 'languages')
    .map(l => ({ language: l, proficiency: '' }));
}

// ── Projects ──────────────────────────────────────────────────────────────

export interface ProjectItem {
  name:         string;
  role:         string;
  url:          string;
  startDate:    string;
  endDate:      string;
  technologies: string[];
  description:  string;
}

export function getProjects(sections: DocumentSectionData[]): ProjectItem[] {
  return getSectionItems(sections, 'projects').map(item => ({
    name:         str(item, 'name'),
    role:         str(item, 'role'),
    url:          str(item, 'url'),
    startDate:    str(item, 'startDate'),
    endDate:      str(item, 'endDate'),
    technologies: arr(item, 'technologies'),
    description:  str(item, 'description'),
  })).filter(p => p.name);
}

// ── Certifications ────────────────────────────────────────────────────────

export interface CertificationItem {
  name:         string;
  issuer:       string;
  date:         string;
  credentialId: string;
  url:          string;
}

export function getCertifications(sections: DocumentSectionData[]): CertificationItem[] {
  return getSectionItems(sections, 'certifications').map(item => ({
    name:         str(item, 'name'),
    issuer:       str(item, 'issuer'),
    date:         str(item, 'date'),
    credentialId: str(item, 'credentialId'),
    url:          str(item, 'url'),
  })).filter(c => c.name);
}

// ── Awards ────────────────────────────────────────────────────────────────

export interface AwardItem {
  title:       string;
  issuer:      string;
  date:        string;
  description: string;
}

export function getAwards(sections: DocumentSectionData[]): AwardItem[] {
  return getSectionItems(sections, 'awards').map(item => ({
    title:       str(item, 'title'),
    issuer:      str(item, 'issuer'),
    date:        str(item, 'date'),
    description: str(item, 'description'),
  })).filter(a => a.title);
}

// ── Hobbies ───────────────────────────────────────────────────────────────

export function getHobbies(sections: DocumentSectionData[]): string[] {
  return arr(getSection(sections, 'hobbies'), 'hobbies');
}

// ── References ────────────────────────────────────────────────────────────

export interface ReferenceItem {
  name:     string;
  position: string;
  company:  string;
  email:    string;
  phone:    string;
  relation: string;
}

export function getReferences(sections: DocumentSectionData[]): ReferenceItem[] {
  return getSectionItems(sections, 'references').map(item => ({
    name:     str(item, 'name'),
    position: str(item, 'position'),
    company:  str(item, 'company'),
    email:    str(item, 'email'),
    phone:    str(item, 'phone'),
    relation: str(item, 'relation'),
  })).filter(r => r.name);
}
