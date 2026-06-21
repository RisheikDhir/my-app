// ─── Generator Engine Domain Models ───────────────────────────────────────────

export type GeneratorCategory =
  | 'resume'
  | 'cv'
  | 'biodata'
  | 'marriage-biodata'
  | 'cover-letter'
  | 'job-application'
  | 'portfolio-resume'
  | 'professional-summary';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'rich-text'
  | 'email'
  | 'phone'
  | 'url'
  | 'date'
  | 'year'
  | 'number'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'toggle'
  | 'tags'
  | 'photo'
  | 'divider'
  | 'heading';

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
  customMessage?: string;
}

export interface GeneratorFieldSchema {
  id: string;
  type: FieldType;
  label: string;
  labelHi?: string;            // Hindi translation
  placeholder?: string;
  placeholderHi?: string;
  required?: boolean;
  options?: FieldOption[];     // for select / radio / checkbox
  maxLength?: number;
  hint?: string;
  hintHi?: string;
  group?: string;              // logical sub-grouping within a section
  defaultValue?: unknown;
  validation?: FieldValidation;
  showWhen?: FieldCondition;   // conditional display
  fullWidth?: boolean;         // span full row in 2-col layout
  rows?: number;               // textarea row count
}

export interface FieldCondition {
  fieldId: string;
  equals: string | boolean;
}

export interface GeneratorSectionSchema {
  id: string;
  title: string;
  titleHi?: string;
  description?: string;
  icon?: string;
  repeatable?: boolean;        // education, experience, projects, etc.
  addButtonLabel?: string;
  addButtonLabelHi?: string;
  minItems?: number;
  maxItems?: number;
  fields: GeneratorFieldSchema[];
  optional?: boolean;
  dragReorderable?: boolean;
  defaultOpen?: boolean;       // expanded by default in the stepper
  completionFields?: string[]; // field IDs that count toward completion %
}

export interface GeneratorFormSchema {
  steps: GeneratorSectionSchema[];
  estimatedMinutes?: number;   // form fill time hint
}

export interface GeneratorDefinition {
  id: string;
  name: string;
  nameHi?: string;
  slug: string;
  category: GeneratorCategory;
  description: string;
  descriptionHi?: string;
  shortDescription: string;
  icon: string;
  color: string;               // accent hex for the card
  tags: string[];
  seoKeywords: string[];
  isPremium: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  isAtsOptimized?: boolean;
  formSchema: GeneratorFormSchema;
  supportedTemplateIds: string[];
  freeTemplateIds: string[];
  seoLandingRoute?: string;    // e.g., '/resume-generator'
  relatedGeneratorIds?: string[];
}

// ─── Shared base section schemas (reused across generators) ───────────────────

export const PERSONAL_INFO_FIELDS: GeneratorFieldSchema[] = [
  { id: 'firstName',  type: 'text',  label: 'First Name',     labelHi: 'पहला नाम',    required: true,  placeholder: 'Raj' },
  { id: 'lastName',   type: 'text',  label: 'Last Name',      labelHi: 'अंतिम नाम',   required: true,  placeholder: 'Sharma' },
  { id: 'jobTitle',   type: 'text',  label: 'Job Title / Designation', labelHi: 'पद',required: false, placeholder: 'Software Engineer' },
  { id: 'email',      type: 'email', label: 'Email Address',  labelHi: 'ईमेल',        required: true,  placeholder: 'raj@email.com' },
  { id: 'phone',      type: 'phone', label: 'Phone Number',   labelHi: 'फ़ोन नंबर',    required: true,  placeholder: '+91 98765 43210' },
  { id: 'location',   type: 'text',  label: 'City, State',    labelHi: 'शहर, राज्य',  required: false, placeholder: 'Mumbai, Maharashtra' },
  { id: 'website',    type: 'url',   label: 'Portfolio / Website', labelHi: 'वेबसाइट', required: false },
  { id: 'linkedin',   type: 'url',   label: 'LinkedIn URL',   required: false },
  { id: 'github',     type: 'url',   label: 'GitHub URL',     required: false },
  { id: 'photo',      type: 'photo', label: 'Profile Photo',  labelHi: 'फ़ोटो',        required: false, fullWidth: true },
];

export const SUMMARY_FIELDS: GeneratorFieldSchema[] = [
  {
    id: 'summary', type: 'textarea', label: 'Professional Summary', labelHi: 'पेशेवर सारांश',
    placeholder: 'Write a compelling 2-3 sentence overview of your professional background, key skills, and career goals.',
    maxLength: 600, rows: 5, fullWidth: true, required: false,
  },
];

export const EXPERIENCE_FIELDS: GeneratorFieldSchema[] = [
  { id: 'company',    type: 'text',     label: 'Company Name',     required: true,  placeholder: 'Tech Corp Pvt. Ltd.' },
  { id: 'position',   type: 'text',     label: 'Job Title',        required: true,  placeholder: 'Senior Developer' },
  { id: 'location',   type: 'text',     label: 'Location',         required: false, placeholder: 'Bangalore, India' },
  { id: 'startDate',  type: 'date',     label: 'Start Date',       required: true },
  { id: 'isCurrent',  type: 'checkbox', label: 'Currently working here', defaultValue: false },
  { id: 'endDate',    type: 'date',     label: 'End Date',         required: false, showWhen: { fieldId: 'isCurrent', equals: false } },
  { id: 'description', type: 'textarea', label: 'Key Responsibilities & Achievements', rows: 5, fullWidth: true,
    placeholder: '• Led a team of 5 engineers to deliver the product 2 weeks ahead of schedule\n• Improved API response time by 40% through query optimisation',
  },
];

export const EDUCATION_FIELDS: GeneratorFieldSchema[] = [
  { id: 'institution', type: 'text', label: 'Institution / University', required: true, placeholder: 'IIT Bombay' },
  { id: 'degree',      type: 'text', label: 'Degree / Course',          required: true, placeholder: 'B.Tech Computer Science' },
  { id: 'field',       type: 'text', label: 'Field of Study',           required: false, placeholder: 'Information Technology' },
  { id: 'startYear',   type: 'year', label: 'Start Year' },
  { id: 'endYear',     type: 'year', label: 'End Year / Expected' },
  { id: 'grade',       type: 'text', label: 'CGPA / Percentage',        placeholder: '8.5 / 10' },
  { id: 'description', type: 'textarea', label: 'Activities & Achievements', rows: 3, fullWidth: true },
];

export const SKILLS_FIELDS: GeneratorFieldSchema[] = [
  { id: 'technicalSkills', type: 'tags', label: 'Technical Skills',  placeholder: 'React, Node.js, Python…',  fullWidth: true },
  { id: 'softSkills',      type: 'tags', label: 'Soft Skills',       placeholder: 'Leadership, Communication…' },
  { id: 'tools',           type: 'tags', label: 'Tools & Technologies', placeholder: 'Git, Docker, Figma…' },
  { id: 'languages',       type: 'tags', label: 'Languages Known',   placeholder: 'Hindi, English, Tamil…' },
];

export const PROJECTS_FIELDS: GeneratorFieldSchema[] = [
  { id: 'name',          type: 'text',    label: 'Project Name',        required: true },
  { id: 'role',          type: 'text',    label: 'Your Role',           required: false },
  { id: 'url',           type: 'url',     label: 'Live URL / GitHub',   required: false },
  { id: 'startDate',     type: 'date',    label: 'Start Date' },
  { id: 'endDate',       type: 'date',    label: 'End Date' },
  { id: 'technologies',  type: 'tags',    label: 'Tech Stack',          fullWidth: true },
  { id: 'description',   type: 'textarea', label: 'Description & Key Highlights', rows: 4, fullWidth: true },
];

export const CERTIFICATIONS_FIELDS: GeneratorFieldSchema[] = [
  { id: 'name',         type: 'text', label: 'Certification Name',   required: true },
  { id: 'issuer',       type: 'text', label: 'Issuing Organization', placeholder: 'Coursera, AWS, Google…' },
  { id: 'date',         type: 'date', label: 'Issue Date' },
  { id: 'expiryDate',   type: 'date', label: 'Expiry Date' },
  { id: 'credentialId', type: 'text', label: 'Credential ID' },
  { id: 'url',          type: 'url',  label: 'Credential URL' },
];

export const LANGUAGES_FIELDS: GeneratorFieldSchema[] = [
  { id: 'language',    type: 'text',   label: 'Language',    required: true, placeholder: 'Hindi' },
  { id: 'proficiency', type: 'select', label: 'Proficiency', options: [
    { label: 'Native',        value: 'native' },
    { label: 'Fluent',        value: 'fluent' },
    { label: 'Professional',  value: 'professional' },
    { label: 'Intermediate',  value: 'intermediate' },
    { label: 'Basic',         value: 'basic' },
  ]},
];

export const AWARDS_FIELDS: GeneratorFieldSchema[] = [
  { id: 'title',        type: 'text',     label: 'Award / Achievement Title', required: true },
  { id: 'issuer',       type: 'text',     label: 'Issuing Organisation' },
  { id: 'date',         type: 'date',     label: 'Date' },
  { id: 'description',  type: 'textarea', label: 'Description', rows: 2, fullWidth: true },
];

export const REFERENCES_FIELDS: GeneratorFieldSchema[] = [
  { id: 'name',        type: 'text',  label: 'Reference Name',    required: true },
  { id: 'position',    type: 'text',  label: 'Position / Title' },
  { id: 'company',     type: 'text',  label: 'Company / Organisation' },
  { id: 'email',       type: 'email', label: 'Email' },
  { id: 'phone',       type: 'phone', label: 'Phone' },
  { id: 'relation',    type: 'text',  label: 'Relationship to you', placeholder: 'Ex-Manager, Professor…' },
];
