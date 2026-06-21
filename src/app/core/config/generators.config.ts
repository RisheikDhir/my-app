// ─── Generator Registry ────────────────────────────────────────────────────────
// All 20 document generators are defined here as pure config data.
// The GeneratorEditorComponent reads this config — no new component per generator.

import {
  GeneratorDefinition,
  GeneratorSectionSchema,
  PERSONAL_INFO_FIELDS,
  SUMMARY_FIELDS,
  EXPERIENCE_FIELDS,
  EDUCATION_FIELDS,
  SKILLS_FIELDS,
  PROJECTS_FIELDS,
  CERTIFICATIONS_FIELDS,
  LANGUAGES_FIELDS,
  AWARDS_FIELDS,
  REFERENCES_FIELDS,
} from '../models/generator.models';

// ─── Shared section builders ───────────────────────────────────────────────────

const personalSection = (overrides?: Partial<GeneratorSectionSchema>): GeneratorSectionSchema => ({
  id: 'personal', title: 'Personal Information', titleHi: 'व्यक्तिगत जानकारी',
  icon: '👤', defaultOpen: true, fields: PERSONAL_INFO_FIELDS,
  completionFields: ['firstName', 'lastName', 'email', 'phone'],
  ...overrides,
});

const summarySection = (label = 'Professional Summary'): GeneratorSectionSchema => ({
  id: 'summary', title: label, icon: '✍️', optional: true,
  fields: SUMMARY_FIELDS, completionFields: ['summary'],
});

const experienceSection = (overrides?: Partial<GeneratorSectionSchema>): GeneratorSectionSchema => ({
  id: 'experience', title: 'Work Experience', titleHi: 'कार्य अनुभव',
  icon: '💼', repeatable: true, addButtonLabel: 'Add Work Experience',
  addButtonLabelHi: 'काम का अनुभव जोड़ें', dragReorderable: true,
  fields: EXPERIENCE_FIELDS, completionFields: ['company', 'position'],
  ...overrides,
});

const educationSection = (overrides?: Partial<GeneratorSectionSchema>): GeneratorSectionSchema => ({
  id: 'education', title: 'Education', titleHi: 'शिक्षा',
  icon: '🎓', repeatable: true, addButtonLabel: 'Add Education',
  addButtonLabelHi: 'शिक्षा जोड़ें', dragReorderable: true,
  fields: EDUCATION_FIELDS, completionFields: ['institution', 'degree'],
  ...overrides,
});

const skillsSection = (): GeneratorSectionSchema => ({
  id: 'skills', title: 'Skills', titleHi: 'कौशल', icon: '⚡',
  fields: SKILLS_FIELDS, completionFields: ['technicalSkills'],
});

const projectsSection = (): GeneratorSectionSchema => ({
  id: 'projects', title: 'Projects', titleHi: 'परियोजनाएँ', icon: '🚀',
  optional: true, repeatable: true, addButtonLabel: 'Add Project',
  addButtonLabelHi: 'परियोजना जोड़ें', dragReorderable: true,
  fields: PROJECTS_FIELDS, completionFields: ['name'],
});

const certificationsSection = (): GeneratorSectionSchema => ({
  id: 'certifications', title: 'Certifications', titleHi: 'प्रमाणपत्र', icon: '📜',
  optional: true, repeatable: true, addButtonLabel: 'Add Certification',
  dragReorderable: true, fields: CERTIFICATIONS_FIELDS,
});

const languagesSection = (): GeneratorSectionSchema => ({
  id: 'languages', title: 'Languages', titleHi: 'भाषाएँ', icon: '🌍',
  optional: true, repeatable: true, addButtonLabel: 'Add Language',
  fields: LANGUAGES_FIELDS,
});

const awardsSection = (): GeneratorSectionSchema => ({
  id: 'awards', title: 'Awards & Achievements', icon: '🏆',
  optional: true, repeatable: true, addButtonLabel: 'Add Award',
  dragReorderable: true, fields: AWARDS_FIELDS,
});

const referencesSection = (): GeneratorSectionSchema => ({
  id: 'references', title: 'References', icon: '🤝',
  optional: true, repeatable: true, addButtonLabel: 'Add Reference',
  fields: REFERENCES_FIELDS,
});

// ─── 1. Resume Generator ───────────────────────────────────────────────────────

const RESUME_GENERATOR: GeneratorDefinition = {
  id: 'resume',
  name: 'Resume Generator',
  nameHi: 'रेज़ुमे जनरेटर',
  slug: 'resume',
  category: 'resume',
  seoLandingRoute: '/resume-generator',
  description: 'Build a professional, ATS-optimised resume in minutes. Choose from modern templates, fill your details, and download a print-ready PDF.',
  shortDescription: 'Create a professional resume instantly',
  icon: '📄',
  color: '#3B82F6',
  tags: ['resume', 'professional', 'job search', 'ATS'],
  seoKeywords: ['resume builder online', 'free resume maker', 'create resume', 'resume generator india', 'online cv maker'],
  isPremium: false,
  isPopular: true,
  formSchema: {
    estimatedMinutes: 15,
    steps: [
      personalSection(),
      summarySection('Professional Summary'),
      experienceSection(),
      educationSection(),
      skillsSection(),
      projectsSection(),
      certificationsSection(),
      languagesSection(),
      awardsSection(),
      {
        id: 'hobbies', title: 'Interests & Hobbies', icon: '🎨', optional: true,
        fields: [{ id: 'hobbies', type: 'tags', label: 'Hobbies & Interests', fullWidth: true, placeholder: 'Photography, Chess, Trekking…' }],
      },
      referencesSection(),
    ],
  },
  supportedTemplateIds: ['resume-modern', 'resume-ats', 'resume-professional', 'resume-minimal', 'resume-executive', 'resume-creative'],
  freeTemplateIds: ['resume-minimal', 'resume-ats'],
  relatedGeneratorIds: ['fresher-resume', 'experienced-resume', 'ats-resume', 'one-page-resume'],
};

// ─── 2. CV Generator ──────────────────────────────────────────────────────────

const CV_GENERATOR: GeneratorDefinition = {
  id: 'cv',
  name: 'CV Generator',
  nameHi: 'सीवी जनरेटर',
  slug: 'cv',
  category: 'cv',
  seoLandingRoute: '/cv-generator',
  description: 'Generate a comprehensive Curriculum Vitae for academic, research, and senior professional roles. Multi-page, detailed, and perfectly formatted.',
  shortDescription: 'Create a detailed academic or professional CV',
  icon: '📋',
  color: '#8B5CF6',
  tags: ['cv', 'curriculum vitae', 'academic', 'research'],
  seoKeywords: ['cv generator', 'curriculum vitae maker', 'cv builder online india', 'academic cv', 'research cv'],
  isPremium: false,
  isPopular: true,
  formSchema: {
    estimatedMinutes: 25,
    steps: [
      personalSection({ fields: [...PERSONAL_INFO_FIELDS, { id: 'researchInterests', type: 'textarea', label: 'Research Interests', rows: 3, fullWidth: true }] }),
      summarySection('Research / Career Objective'),
      educationSection(),
      experienceSection({ title: 'Teaching / Work Experience' }),
      {
        id: 'publications', title: 'Publications', icon: '📚', optional: true,
        repeatable: true, addButtonLabel: 'Add Publication', dragReorderable: true,
        fields: [
          { id: 'title', type: 'text', label: 'Publication Title', required: true, fullWidth: true },
          { id: 'authors', type: 'text', label: 'Authors', placeholder: 'Sharma R., Patel A., et al.' },
          { id: 'journal', type: 'text', label: 'Journal / Conference' },
          { id: 'year', type: 'year', label: 'Year' },
          { id: 'doi', type: 'url', label: 'DOI / URL' },
          { id: 'type', type: 'select', label: 'Type', options: [
            { label: 'Journal Article', value: 'journal' },
            { label: 'Conference Paper', value: 'conference' },
            { label: 'Book Chapter', value: 'book-chapter' },
            { label: 'Thesis', value: 'thesis' },
            { label: 'Patent', value: 'patent' },
          ]},
        ],
      },
      projectsSection(),
      skillsSection(),
      awardsSection(),
      certificationsSection(),
      languagesSection(),
      referencesSection(),
    ],
  },
  supportedTemplateIds: ['cv-academic', 'cv-executive', 'cv-clean', 'resume-modern'],
  freeTemplateIds: ['cv-clean'],
  relatedGeneratorIds: ['resume', 'multi-section-cv'],
};

// ─── 3. Bio Data Generator ────────────────────────────────────────────────────

const BIODATA_GENERATOR: GeneratorDefinition = {
  id: 'biodata',
  name: 'Bio Data Generator',
  nameHi: 'बायो डेटा जनरेटर',
  slug: 'biodata',
  category: 'biodata',
  seoLandingRoute: '/biodata-generator',
  description: 'Create a professional bio data document for job applications in India. Traditional format accepted widely in government and private sectors.',
  shortDescription: 'Create a professional bio data for job applications',
  icon: '🪪',
  color: '#10B981',
  tags: ['biodata', 'bio data', 'job application', 'india'],
  seoKeywords: ['bio data format', 'biodata maker', 'bio data for job', 'biodata generator india', 'biodata format download'],
  isPremium: false,
  isPopular: true,
  formSchema: {
    estimatedMinutes: 12,
    steps: [
      {
        id: 'personal', title: 'Personal Information', icon: '👤', defaultOpen: true,
        completionFields: ['firstName', 'lastName', 'email', 'phone'],
        fields: [
          { id: 'firstName',    type: 'text',   label: 'First Name',          required: true },
          { id: 'lastName',     type: 'text',   label: 'Last Name',           required: true },
          { id: 'fatherName',   type: 'text',   label: "Father's Name",       required: false },
          { id: 'motherName',   type: 'text',   label: "Mother's Name",       required: false },
          { id: 'dob',          type: 'date',   label: 'Date of Birth',       required: true },
          { id: 'gender',       type: 'select', label: 'Gender', options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
          ]},
          { id: 'maritalStatus', type: 'select', label: 'Marital Status', options: [
            { label: 'Single', value: 'single' },
            { label: 'Married', value: 'married' },
            { label: 'Divorced', value: 'divorced' },
            { label: 'Widowed', value: 'widowed' },
          ]},
          { id: 'nationality',  type: 'text',   label: 'Nationality',        defaultValue: 'Indian' },
          { id: 'religion',     type: 'text',   label: 'Religion',           required: false },
          { id: 'caste',        type: 'text',   label: 'Caste / Category',   required: false },
          { id: 'address',      type: 'textarea', label: 'Permanent Address', rows: 3, fullWidth: true },
          { id: 'email',        type: 'email',  label: 'Email',              required: true },
          { id: 'phone',        type: 'phone',  label: 'Phone',              required: true },
          { id: 'photo',        type: 'photo',  label: 'Passport Photo',     fullWidth: false },
        ],
      },
      educationSection(),
      experienceSection({ title: 'Work Experience', optional: true }),
      skillsSection(),
      {
        id: 'declaration', title: 'Declaration', icon: '📝', optional: true,
        fields: [{
          id: 'declaration', type: 'textarea', label: 'Declaration', fullWidth: true, rows: 3,
          defaultValue: 'I hereby declare that all the information given above is true and correct to the best of my knowledge and belief.',
        }],
      },
    ],
  },
  supportedTemplateIds: ['biodata-classic', 'biodata-modern', 'biodata-simple'],
  freeTemplateIds: ['biodata-simple'],
};

// ─── 4. Marriage Biodata Generator ────────────────────────────────────────────

const MARRIAGE_BIODATA_GENERATOR: GeneratorDefinition = {
  id: 'marriage-biodata',
  name: 'Marriage Biodata Generator',
  nameHi: 'विवाह बायो डेटा जनरेटर',
  slug: 'marriage-biodata',
  category: 'marriage-biodata',
  seoLandingRoute: '/marriage-biodata-generator',
  description: 'Create a beautiful, complete marriage biodata with personal details, family information, horoscope details, and partner preferences. Available in elegant templates for Indian matrimony.',
  shortDescription: 'Create a beautiful marriage biodata',
  icon: '💍',
  color: '#EC4899',
  tags: ['marriage biodata', 'matrimony', 'shaadi', 'vivah', 'kundli'],
  seoKeywords: ['marriage biodata', 'marriage biodata format', 'biodata for marriage', 'matrimonial biodata', 'shaadi biodata', 'marriage biodata generator'],
  isPremium: false,
  isPopular: true,
  formSchema: {
    estimatedMinutes: 20,
    steps: [
      {
        id: 'personal', title: 'Personal Details', titleHi: 'व्यक्तिगत विवरण',
        icon: '👤', defaultOpen: true,
        completionFields: ['firstName', 'lastName', 'dob', 'religion'],
        fields: [
          { id: 'firstName',     type: 'text',   label: 'First Name',           labelHi: 'पहला नाम',    required: true },
          { id: 'lastName',      type: 'text',   label: 'Last Name / Surname',  labelHi: 'उपनाम',       required: true },
          { id: 'dob',           type: 'date',   label: 'Date of Birth',        labelHi: 'जन्म तिथि',   required: true },
          { id: 'timeOfBirth',   type: 'text',   label: 'Time of Birth',        labelHi: 'जन्म समय',    placeholder: '06:30 AM' },
          { id: 'placeOfBirth',  type: 'text',   label: 'Place of Birth',       labelHi: 'जन्म स्थान' },
          { id: 'gender',        type: 'radio',  label: 'Gender',               labelHi: 'लिंग', options: [
            { label: 'Male / वर', value: 'male' },
            { label: 'Female / वधू', value: 'female' },
          ]},
          { id: 'height',        type: 'select', label: 'Height',               labelHi: 'ऊंचाई', options: [
            "4'8\"","4'9\"","4'10\"","4'11\"",
            "5'0\"","5'1\"","5'2\"","5'3\"","5'4\"","5'5\"","5'6\"","5'7\"","5'8\"","5'9\"","5'10\"","5'11\"",
            "6'0\"","6'1\"","6'2\"","6'3\"",
          ].map(h => ({ label: h, value: h })) },
          { id: 'weight',        type: 'text',   label: 'Weight (kg)',          labelHi: 'वजन' },
          { id: 'complexion',    type: 'select', label: 'Complexion',           labelHi: 'रंग', options: [
            { label: 'Fair', value: 'fair' },
            { label: 'Wheatish', value: 'wheatish' },
            { label: 'Dusky', value: 'dusky' },
          ]},
          { id: 'bloodGroup',    type: 'select', label: 'Blood Group',          labelHi: 'रक्त समूह', options: ['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => ({ label: b, value: b })) },
          { id: 'maritalStatus', type: 'select', label: 'Marital Status',       labelHi: 'वैवाहिक स्थिति', options: [
            { label: 'Never Married', value: 'never-married' },
            { label: 'Divorced',      value: 'divorced' },
            { label: 'Widowed',       value: 'widowed' },
            { label: 'Separated',     value: 'separated' },
          ]},
          { id: 'abilityStatus', type: 'text',   label: 'Physical Ability',     labelHi: 'शारीरिक स्थिति', placeholder: 'Normal' },
          { id: 'photo',         type: 'photo',  label: 'Photo',                labelHi: 'फ़ोटो', fullWidth: true },
        ],
      },
      {
        id: 'religion-community', title: 'Religion & Community', titleHi: 'धर्म और समुदाय', icon: '🕉️',
        completionFields: ['religion'],
        fields: [
          { id: 'religion',      type: 'text',   label: 'Religion',             labelHi: 'धर्म',         required: true, placeholder: 'Hindu' },
          { id: 'caste',         type: 'text',   label: 'Caste / Sub-caste',   labelHi: 'जाति',         required: false, hint: 'Optional — share only if you wish to' },
          { id: 'gotra',         type: 'text',   label: 'Gotra',                labelHi: 'गोत्र',        required: false },
          { id: 'subcaste',      type: 'text',   label: 'Sub-caste / Community', required: false },
          { id: 'motherTongue',  type: 'text',   label: 'Mother Tongue',        labelHi: 'मातृभाषा',     placeholder: 'Hindi' },
          { id: 'nativePlace',   type: 'text',   label: 'Native Place',         labelHi: 'मूल स्थान' },
        ],
      },
      {
        id: 'horoscope', title: 'Horoscope / Kundli Details', titleHi: 'कुंडली विवरण', icon: '⭐', optional: true,
        fields: [
          { id: 'rashi',         type: 'select', label: 'Rashi (Moon Sign)',   labelHi: 'राशि', options: [
            'Mesh','Vrishabha','Mithuna','Karka','Simha','Kanya','Tula','Vrishchika','Dhanu','Makara','Kumbha','Meena'
          ].map(r => ({ label: r, value: r.toLowerCase() })) },
          { id: 'nakshatra',     type: 'text',   label: 'Nakshatra',           labelHi: 'नक्षत्र' },
          { id: 'manglik',       type: 'radio',  label: 'Manglik',             labelHi: 'मांगलिक', options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No',  value: 'no' },
            { label: 'Partial', value: 'partial' },
          ]},
          { id: 'horoscopeAvailable', type: 'toggle', label: 'Horoscope available on request', defaultValue: true },
        ],
      },
      {
        id: 'education-career', title: 'Education & Career', titleHi: 'शिक्षा और करियर', icon: '🎓',
        completionFields: ['highestDegree'],
        fields: [
          { id: 'highestDegree', type: 'text',   label: 'Highest Qualification', labelHi: 'उच्चतम योग्यता', required: true, placeholder: 'B.Tech / MBA / MBBS' },
          { id: 'institution',   type: 'text',   label: 'Institution / University', required: false },
          { id: 'specialisation', type: 'text',  label: 'Specialisation',       placeholder: 'Computer Science' },
          { id: 'occupation',    type: 'text',   label: 'Occupation',           labelHi: 'व्यवसाय', required: true, placeholder: 'Software Engineer at Google' },
          { id: 'employedIn',    type: 'select', label: 'Employed In', options: [
            { label: 'Government', value: 'government' },
            { label: 'Private Company', value: 'private' },
            { label: 'Business / Self-employed', value: 'business' },
            { label: 'Defence', value: 'defence' },
            { label: 'Not Working', value: 'not-working' },
          ]},
          { id: 'annualIncome',  type: 'select', label: 'Annual Income', options: [
            'Below ₹2 LPA','₹2–4 LPA','₹4–6 LPA','₹6–10 LPA','₹10–15 LPA','₹15–25 LPA','₹25 LPA+',
          ].map(i => ({ label: i, value: i })) },
          { id: 'workLocation',  type: 'text',   label: 'Work Location',        placeholder: 'Bengaluru, India' },
        ],
      },
      {
        id: 'family', title: 'Family Details', titleHi: 'परिवार का विवरण', icon: '👨‍👩‍👧‍👦',
        completionFields: ['fatherName'],
        fields: [
          { id: 'fatherName',    type: 'text',   label: "Father's Name",       labelHi: 'पिता का नाम',  required: false },
          { id: 'fatherOcc',     type: 'text',   label: "Father's Occupation", placeholder: 'Retired / Businessman' },
          { id: 'motherName',    type: 'text',   label: "Mother's Name",       labelHi: 'माता का नाम' },
          { id: 'motherOcc',     type: 'text',   label: "Mother's Occupation", placeholder: 'Homemaker / Teacher' },
          { id: 'familyType',    type: 'select', label: 'Family Type', options: [
            { label: 'Nuclear',  value: 'nuclear' },
            { label: 'Joint',    value: 'joint' },
          ]},
          { id: 'familyValues',  type: 'select', label: 'Family Values', options: [
            { label: 'Traditional', value: 'traditional' },
            { label: 'Moderate',    value: 'moderate' },
            { label: 'Liberal',     value: 'liberal' },
          ]},
          { id: 'familyStatus',  type: 'select', label: 'Family Status', options: [
            { label: 'Middle Class',       value: 'middle-class' },
            { label: 'Upper Middle Class', value: 'upper-middle-class' },
            { label: 'Rich',               value: 'rich' },
            { label: 'Affluent',           value: 'affluent' },
          ]},
          { id: 'brothers',      type: 'number', label: 'Brothers',            placeholder: '1' },
          { id: 'brothersMarried', type: 'number', label: 'Brothers Married' },
          { id: 'sisters',       type: 'number', label: 'Sisters' },
          { id: 'sistersMarried', type: 'number', label: 'Sisters Married' },
          { id: 'familyDetails', type: 'textarea', label: 'Additional Family Info', rows: 3, fullWidth: true,
            placeholder: 'Ancestral home in Jaipur. Father is a retired bank manager. Two sisters, both married.' },
        ],
      },
      {
        id: 'contact', title: 'Contact Information', titleHi: 'संपर्क जानकारी', icon: '📞',
        completionFields: ['phone'],
        fields: [
          { id: 'phone',         type: 'phone',  label: 'Phone Number',        required: true },
          { id: 'altPhone',      type: 'phone',  label: 'Alternate Phone' },
          { id: 'email',         type: 'email',  label: 'Email Address' },
          { id: 'address',       type: 'textarea', label: 'Current Address',   rows: 3, fullWidth: true },
          { id: 'nativeAddress', type: 'textarea', label: 'Native / Hometown Address', rows: 2, fullWidth: true },
          { id: 'contactPerson', type: 'text',   label: 'Contact Person Name' },
          { id: 'contactRelation', type: 'text', label: 'Relation (e.g. Father, Brother)' },
        ],
      },
      {
        id: 'partner-preference', title: 'Partner Preferences', titleHi: 'जीवनसाथी की प्राथमिकताएँ', icon: '💑', optional: true,
        fields: [
          { id: 'preferredAgeFrom', type: 'number', label: 'Preferred Age From', placeholder: '24' },
          { id: 'preferredAgeTo',   type: 'number', label: 'Preferred Age To',   placeholder: '30' },
          { id: 'preferredHeight',  type: 'text',   label: 'Preferred Height',   placeholder: "5'2\" and above" },
          { id: 'preferredReligion', type: 'text',  label: 'Religion Preference', placeholder: 'Hindu' },
          { id: 'preferredCaste',    type: 'text',  label: 'Caste Preference',   hint: 'Optional' },
          { id: 'preferredEducation', type: 'text', label: 'Education Preference', placeholder: 'Graduate and above' },
          { id: 'preferredOccupation', type: 'text', label: 'Occupation Preference' },
          { id: 'preferredLocation', type: 'text',  label: 'Preferred Location' },
          { id: 'partnerExpectations', type: 'textarea', label: 'What are you looking for in a partner?',
            rows: 4, fullWidth: true, placeholder: 'Describe your ideal partner in a few sentences…', maxLength: 500 },
        ],
      },
    ],
  },
  supportedTemplateIds: ['biodata-royal', 'biodata-elegant', 'biodata-floral', 'biodata-modern', 'biodata-classic-serif', 'biodata-vibrant', 'biodata-simple'],
  freeTemplateIds: ['biodata-simple', 'biodata-classic-serif'],
};

// ─── 5. Cover Letter Generator ────────────────────────────────────────────────

const COVER_LETTER_GENERATOR: GeneratorDefinition = {
  id: 'cover-letter',
  name: 'Cover Letter Generator',
  nameHi: 'कवर लेटर जनरेटर',
  slug: 'cover-letter',
  category: 'cover-letter',
  seoLandingRoute: '/cover-letter-generator',
  description: 'Write a compelling cover letter that gets you noticed. Our guided form helps you craft a personalised, professional letter tailored to the job.',
  shortDescription: 'Write a professional cover letter in minutes',
  icon: '✉️',
  color: '#F59E0B',
  tags: ['cover letter', 'job application', 'letter', 'professional'],
  seoKeywords: ['cover letter generator', 'cover letter maker online', 'create cover letter', 'cover letter format india', 'free cover letter builder'],
  isPremium: false,
  formSchema: {
    estimatedMinutes: 10,
    steps: [
      {
        id: 'sender', title: 'Your Details', icon: '👤', defaultOpen: true,
        completionFields: ['firstName', 'email'],
        fields: [
          { id: 'firstName',    type: 'text',  label: 'Your Full Name',      required: true },
          { id: 'email',        type: 'email', label: 'Email',               required: true },
          { id: 'phone',        type: 'phone', label: 'Phone' },
          { id: 'address',      type: 'text',  label: 'City, State' },
          { id: 'date',         type: 'date',  label: 'Date', defaultValue: new Date().toISOString().split('T')[0] },
        ],
      },
      {
        id: 'recipient', title: 'Recipient Details', icon: '🏢',
        fields: [
          { id: 'hiringManager', type: 'text', label: 'Hiring Manager Name', placeholder: 'Mr. Arjun Mehta (if known)' },
          { id: 'jobTitle',      type: 'text', label: 'Job Title Applying For', required: true },
          { id: 'company',       type: 'text', label: 'Company Name',           required: true },
          { id: 'department',    type: 'text', label: 'Department' },
          { id: 'companyAddress', type: 'textarea', label: 'Company Address', rows: 2, fullWidth: true },
          { id: 'source',        type: 'text', label: 'Where did you find this job?', placeholder: 'LinkedIn, Naukri, Referral…' },
        ],
      },
      {
        id: 'content', title: 'Letter Content', icon: '✍️',
        completionFields: ['opening', 'body', 'closing'],
        fields: [
          { id: 'salutation',  type: 'select', label: 'Salutation', options: [
            { label: 'Dear Hiring Manager,', value: 'Dear Hiring Manager,' },
            { label: 'Dear Sir/Madam,', value: 'Dear Sir/Madam,' },
            { label: 'To Whom It May Concern,', value: 'To Whom It May Concern,' },
            { label: 'Dear [Name],', value: 'custom' },
          ]},
          { id: 'opening', type: 'textarea', label: 'Opening Paragraph', rows: 4, fullWidth: true, required: true,
            placeholder: 'I am writing to express my interest in the [role] position at [company]. With [X] years of experience in [field], I am confident I can contribute significantly…',
          },
          { id: 'body', type: 'textarea', label: 'Main Body (Skills & Achievements)', rows: 6, fullWidth: true, required: true,
            placeholder: 'In my previous role at [company], I [key achievement]. My expertise in [skill] has enabled me to [result]. I am particularly drawn to [company] because…',
          },
          { id: 'closing', type: 'textarea', label: 'Closing Paragraph', rows: 3, fullWidth: true, required: true,
            placeholder: 'I am excited about the opportunity and would welcome the chance to discuss how my background aligns with your needs. I look forward to hearing from you.',
          },
          { id: 'signature', type: 'text', label: 'Closing Signature', defaultValue: 'Sincerely,' },
        ],
      },
    ],
  },
  supportedTemplateIds: ['letter-professional', 'letter-minimal', 'letter-modern'],
  freeTemplateIds: ['letter-minimal'],
};

// ─── 6. Job Application Letter Generator ─────────────────────────────────────

const JOB_APPLICATION_LETTER_GENERATOR: GeneratorDefinition = {
  id: 'job-application-letter',
  name: 'Job Application Letter Generator',
  slug: 'job-application-letter',
  category: 'job-application',
  seoLandingRoute: '/job-application-letter-generator',
  description: 'Generate a formal job application letter in the traditional Indian format. Suitable for government, private sector, and walk-in applications.',
  shortDescription: 'Write a formal job application letter',
  icon: '📩',
  color: '#6366F1',
  tags: ['job application', 'formal letter', 'application', 'government'],
  seoKeywords: ['job application letter format', 'job application letter generator', 'application letter for job', 'formal job letter india'],
  isPremium: false,
  formSchema: {
    estimatedMinutes: 8,
    steps: COVER_LETTER_GENERATOR.formSchema.steps, // identical form, different template
  },
  supportedTemplateIds: ['letter-professional', 'letter-formal-india', 'letter-minimal'],
  freeTemplateIds: ['letter-formal-india'],
};

// ─── 7. Professional Summary Generator ───────────────────────────────────────

const PROFESSIONAL_SUMMARY_GENERATOR: GeneratorDefinition = {
  id: 'professional-summary',
  name: 'Professional Profile Summary',
  slug: 'professional-summary',
  category: 'professional-summary',
  seoLandingRoute: '/professional-summary-generator',
  description: 'Create a powerful one-page professional profile summary — ideal for LinkedIn "About" sections, networking events, and professional introductions.',
  shortDescription: 'Create a one-page professional summary',
  icon: '🪭',
  color: '#14B8A6',
  tags: ['summary', 'linkedin', 'profile', 'professional'],
  seoKeywords: ['professional summary generator', 'linkedin summary generator', 'profile summary maker'],
  isPremium: false,
  formSchema: {
    estimatedMinutes: 10,
    steps: [
      personalSection(),
      summarySection('Professional Summary'),
      skillsSection(),
      {
        id: 'highlights', title: 'Career Highlights', icon: '⭐', optional: true,
        repeatable: true, addButtonLabel: 'Add Highlight',
        fields: [
          { id: 'highlight', type: 'text', label: 'Key Career Highlight', required: true, fullWidth: true, placeholder: 'Managed ₹5 Cr product at startup, scaled to 1M users in 6 months' },
        ],
      },
      awardsSection(),
      referencesSection(),
    ],
  },
  supportedTemplateIds: ['summary-clean', 'summary-modern'],
  freeTemplateIds: ['summary-clean'],
};

// ─── 8. Fresher Resume Generator ─────────────────────────────────────────────

const FRESHER_RESUME_GENERATOR: GeneratorDefinition = {
  id: 'fresher-resume',
  name: 'Fresher Resume Generator',
  slug: 'fresher-resume',
  category: 'resume',
  seoLandingRoute: '/fresher-resume-generator',
  description: 'Build a standout fresher resume with no work experience. Highlight your education, projects, internships, and skills with professionally designed templates.',
  shortDescription: 'Build a winning first-job resume',
  icon: '🎓',
  color: '#3B82F6',
  tags: ['fresher', 'entry level', 'first job', 'college student'],
  seoKeywords: ['fresher resume', 'fresher resume format', 'resume for freshers', 'college student resume', 'first job resume'],
  isPremium: false,
  isNew: true,
  formSchema: {
    estimatedMinutes: 12,
    steps: [
      personalSection(),
      summarySection('Career Objective'),
      educationSection(),
      {
        id: 'internships', title: 'Internships', icon: '🏢', optional: true,
        repeatable: true, addButtonLabel: 'Add Internship', dragReorderable: true,
        completionFields: ['company'],
        fields: [
          { id: 'company',    type: 'text',     label: 'Company / Organisation', required: true },
          { id: 'role',       type: 'text',     label: 'Role / Designation',     required: true },
          { id: 'duration',   type: 'text',     label: 'Duration',               placeholder: 'June 2023 – Aug 2023' },
          { id: 'location',   type: 'text',     label: 'Location' },
          { id: 'description', type: 'textarea', label: 'Work Done & Learnings', rows: 4, fullWidth: true },
        ],
      },
      skillsSection(),
      projectsSection(),
      certificationsSection(),
      awardsSection(),
      languagesSection(),
    ],
  },
  supportedTemplateIds: ['resume-modern', 'resume-minimal', 'resume-ats', 'resume-creative'],
  freeTemplateIds: ['resume-minimal', 'resume-ats'],
};

// ─── 9. Experienced Resume Generator ──────────────────────────────────────────

const EXPERIENCED_RESUME_GENERATOR: GeneratorDefinition = {
  id: 'experienced-resume',
  name: 'Experienced Resume Generator',
  slug: 'experienced-resume',
  category: 'resume',
  seoLandingRoute: '/experienced-resume-generator',
  description: 'Craft a powerful resume for senior professionals with 3+ years of experience. Highlight leadership, achievements, and career progression.',
  shortDescription: 'Resume for senior & experienced professionals',
  icon: '💼',
  color: '#3B82F6',
  tags: ['experienced', 'senior', 'manager', 'leadership'],
  seoKeywords: ['experienced resume', 'senior resume format', 'professional resume for experienced', 'career change resume'],
  isPremium: false,
  formSchema: {
    estimatedMinutes: 20,
    steps: [
      personalSection(),
      summarySection('Executive Summary'),
      experienceSection(),
      educationSection(),
      skillsSection(),
      projectsSection(),
      certificationsSection(),
      awardsSection(),
      languagesSection(),
      referencesSection(),
    ],
  },
  supportedTemplateIds: ['resume-executive', 'resume-professional', 'resume-modern', 'resume-minimal'],
  freeTemplateIds: ['resume-minimal'],
};

// ─── 10. Teacher Resume Generator ─────────────────────────────────────────────

const TEACHER_RESUME_GENERATOR: GeneratorDefinition = {
  id: 'teacher-resume',
  name: 'Teacher Resume Generator',
  slug: 'teacher-resume',
  category: 'resume',
  seoLandingRoute: '/teacher-resume-generator',
  description: 'Create a professional teacher resume tailored for schools, colleges, and education institutions. Highlight your teaching philosophy and subject expertise.',
  shortDescription: 'Professional resume for teachers & educators',
  icon: '📚',
  color: '#3B82F6',
  tags: ['teacher', 'educator', 'school', 'teaching'],
  seoKeywords: ['teacher resume', 'teacher resume format', 'resume for teacher', 'educator resume template', 'teacher cv india'],
  isPremium: false,
  formSchema: {
    estimatedMinutes: 15,
    steps: [
      personalSection(),
      { id: 'objective', title: 'Teaching Objective', icon: '🎯', fields: [
        { id: 'objective', type: 'textarea', label: 'Teaching Objective / Philosophy', rows: 4, fullWidth: true,
          placeholder: 'Passionate educator with X years of experience in teaching [subjects] to [age group]. Committed to fostering critical thinking and inclusive learning environments…',
        },
      ]},
      educationSection(),
      {
        id: 'teaching-experience', title: 'Teaching Experience', icon: '🏫',
        repeatable: true, addButtonLabel: 'Add Teaching Position', dragReorderable: true,
        completionFields: ['school', 'subjects'],
        fields: [
          { id: 'school',      type: 'text',     label: 'School / College / Institution', required: true },
          { id: 'location',    type: 'text',     label: 'Location' },
          { id: 'subjects',    type: 'tags',     label: 'Subjects Taught',                required: true },
          { id: 'grades',      type: 'text',     label: 'Grades / Classes',               placeholder: 'Classes 9–12' },
          { id: 'role',        type: 'text',     label: 'Role / Designation' },
          { id: 'startDate',   type: 'date',     label: 'Start Date' },
          { id: 'isCurrent',   type: 'checkbox', label: 'Currently teaching here' },
          { id: 'endDate',     type: 'date',     label: 'End Date', showWhen: { fieldId: 'isCurrent', equals: false } },
          { id: 'description', type: 'textarea', label: 'Key Responsibilities & Achievements', rows: 4, fullWidth: true },
        ],
      },
      { id: 'skills', title: 'Skills & Competencies', icon: '⚡', fields: [
        { id: 'subjectExpertise', type: 'tags', label: 'Subject Expertise', fullWidth: true },
        { id: 'teachingMethods', type: 'tags', label: 'Teaching Methodologies', placeholder: 'Flipped Classroom, Project-based…' },
        { id: 'technology',      type: 'tags', label: 'EdTech & Tools',       placeholder: 'Google Classroom, Smart Board…' },
        { id: 'softSkills',      type: 'tags', label: 'Soft Skills' },
        { id: 'languages',       type: 'tags', label: 'Languages Known' },
      ]},
      certificationsSection(),
      awardsSection(),
      referencesSection(),
    ],
  },
  supportedTemplateIds: ['resume-professional', 'resume-modern', 'resume-minimal'],
  freeTemplateIds: ['resume-minimal'],
};

// ─── 11. Developer Resume Generator ───────────────────────────────────────────

const DEVELOPER_RESUME_GENERATOR: GeneratorDefinition = {
  id: 'developer-resume',
  name: 'Developer Resume Generator',
  slug: 'developer-resume',
  category: 'resume',
  seoLandingRoute: '/developer-resume-generator',
  description: 'Build a tech-focused resume for software developers, engineers, and IT professionals. Highlight your tech stack, GitHub projects, and open-source contributions.',
  shortDescription: 'Resume builder for developers & engineers',
  icon: '💻',
  color: '#3B82F6',
  tags: ['developer', 'software engineer', 'tech', 'coding', 'programming'],
  seoKeywords: ['developer resume', 'software engineer resume', 'programmer resume template', 'tech resume builder', 'it resume format'],
  isPremium: false,
  formSchema: {
    estimatedMinutes: 18,
    steps: [
      personalSection({ fields: [...PERSONAL_INFO_FIELDS.slice(0, -1),
        { id: 'github', type: 'url', label: 'GitHub Profile', required: false },
        { id: 'stackoverflow', type: 'url', label: 'Stack Overflow', required: false },
        { id: 'photo', type: 'photo', label: 'Profile Photo', fullWidth: true },
      ]}),
      summarySection('Technical Summary'),
      { id: 'tech-skills', title: 'Technical Skills', icon: '⚡',
        fields: [
          { id: 'languages',   type: 'tags', label: 'Programming Languages',  fullWidth: true, placeholder: 'TypeScript, Python, Java…' },
          { id: 'frameworks',  type: 'tags', label: 'Frameworks & Libraries', fullWidth: true, placeholder: 'Angular, React, Spring Boot…' },
          { id: 'databases',   type: 'tags', label: 'Databases',              fullWidth: true, placeholder: 'PostgreSQL, MongoDB, Redis…' },
          { id: 'devops',      type: 'tags', label: 'DevOps & Cloud',         fullWidth: true, placeholder: 'Docker, Kubernetes, AWS…' },
          { id: 'tools',       type: 'tags', label: 'Tools & Platforms',      fullWidth: true, placeholder: 'Git, Jira, Figma…' },
        ],
      },
      experienceSection(),
      projectsSection(),
      educationSection(),
      certificationsSection(),
      {
        id: 'opensource', title: 'Open Source & Contributions', icon: '🌐', optional: true,
        repeatable: true, addButtonLabel: 'Add Contribution',
        fields: [
          { id: 'project', type: 'text', label: 'Project Name', required: true },
          { id: 'url',     type: 'url',  label: 'GitHub / URL' },
          { id: 'contribution', type: 'textarea', label: 'Your Contribution', rows: 3, fullWidth: true },
        ],
      },
      awardsSection(),
    ],
  },
  supportedTemplateIds: ['resume-modern', 'resume-ats', 'resume-minimal', 'resume-creative'],
  freeTemplateIds: ['resume-ats', 'resume-minimal'],
};

// ─── 12. Designer Resume Generator ────────────────────────────────────────────

const DESIGNER_RESUME_GENERATOR: GeneratorDefinition = {
  id: 'designer-resume',
  name: 'Designer Resume Generator',
  slug: 'designer-resume',
  category: 'resume',
  seoLandingRoute: '/designer-resume-generator',
  description: 'Create a visually striking resume for UI/UX designers, graphic designers, and creative professionals. Show your aesthetic sense with premium templates.',
  shortDescription: 'Beautiful resume for creatives & designers',
  icon: '🎨',
  color: '#3B82F6',
  tags: ['designer', 'UI/UX', 'graphic design', 'creative', 'portfolio'],
  seoKeywords: ['designer resume', 'graphic designer resume', 'ui ux designer resume', 'creative resume template', 'portfolio resume'],
  isPremium: false,
  formSchema: {
    estimatedMinutes: 18,
    steps: [
      personalSection({ fields: [...PERSONAL_INFO_FIELDS.slice(0, -1),
        { id: 'behance',  type: 'url', label: 'Behance / Dribbble',  required: false },
        { id: 'portfolio', type: 'url', label: 'Portfolio Website',  required: false },
        { id: 'photo',    type: 'photo', label: 'Profile Photo', fullWidth: true },
      ]}),
      summarySection('Creative Statement'),
      { id: 'design-skills', title: 'Design Skills', icon: '⚡', fields: [
        { id: 'uxSkills',    type: 'tags', label: 'UX / Research Skills', fullWidth: true, placeholder: 'User Research, Wireframing, A/B Testing…' },
        { id: 'uiSkills',    type: 'tags', label: 'UI / Visual Skills',   fullWidth: true, placeholder: 'Typography, Color Theory, Branding…' },
        { id: 'tools',       type: 'tags', label: 'Design Tools',         fullWidth: true, placeholder: 'Figma, Adobe XD, Photoshop, Illustrator…' },
        { id: 'devSkills',   type: 'tags', label: 'Dev Handoff / Code',   fullWidth: true, placeholder: 'HTML, CSS, Zeplin…' },
      ]},
      experienceSection(),
      projectsSection(),
      educationSection(),
      certificationsSection(),
      awardsSection(),
    ],
  },
  supportedTemplateIds: ['resume-creative', 'resume-modern', 'resume-minimal'],
  freeTemplateIds: ['resume-minimal'],
};

// ─── 13. Simple Marriage Biodata Generator ────────────────────────────────────

const SIMPLE_MARRIAGE_BIODATA_GENERATOR: GeneratorDefinition = {
  id: 'simple-marriage-biodata',
  name: 'Simple Marriage Biodata',
  slug: 'simple-marriage-biodata',
  category: 'marriage-biodata',
  description: 'Quick, simple one-page marriage biodata with essential details — no frills, clean format, ready in 5 minutes.',
  shortDescription: 'Quick one-page marriage biodata',
  icon: '💒',
  color: '#EC4899',
  tags: ['marriage', 'biodata', 'simple', 'quick'],
  seoKeywords: ['simple marriage biodata', 'simple biodata format', 'basic marriage biodata'],
  isPremium: false,
  formSchema: {
    estimatedMinutes: 5,
    steps: MARRIAGE_BIODATA_GENERATOR.formSchema.steps.slice(0, 4), // only first 4 sections
  },
  supportedTemplateIds: ['biodata-simple', 'biodata-classic-serif'],
  freeTemplateIds: ['biodata-simple', 'biodata-classic-serif'],
};

// ─── 14. Modern Marriage Biodata Generator ────────────────────────────────────

const MODERN_MARRIAGE_BIODATA_GENERATOR: GeneratorDefinition = {
  id: 'modern-marriage-biodata',
  name: 'Modern Marriage Biodata',
  slug: 'modern-marriage-biodata',
  category: 'marriage-biodata',
  description: 'A contemporary styled marriage biodata with photos, coloured headers, and partner preferences. Perfect for modern Indian families.',
  shortDescription: 'Modern styled marriage biodata',
  icon: '💝',
  color: '#EC4899',
  tags: ['modern', 'marriage', 'biodata', 'coloured', 'styled'],
  seoKeywords: ['modern marriage biodata', 'stylish biodata for marriage', 'coloured biodata format'],
  isPremium: false,
  isNew: true,
  formSchema: MARRIAGE_BIODATA_GENERATOR.formSchema,
  supportedTemplateIds: ['biodata-royal', 'biodata-floral', 'biodata-vibrant', 'biodata-modern'],
  freeTemplateIds: ['biodata-modern'],
};

// ─── 15. Portfolio Resume Generator ───────────────────────────────────────────

const PORTFOLIO_RESUME_GENERATOR: GeneratorDefinition = {
  id: 'portfolio-resume',
  name: 'Portfolio Resume Generator',
  slug: 'portfolio-resume',
  category: 'portfolio-resume',
  seoLandingRoute: '/portfolio-resume-generator',
  description: 'Combine a professional resume with a visual portfolio summary. Ideal for designers, developers, and creatives who want to showcase work alongside credentials.',
  shortDescription: 'Resume + portfolio combined in one document',
  icon: '🖼️',
  color: '#8B5CF6',
  tags: ['portfolio', 'creative', 'resume', 'showcase'],
  seoKeywords: ['portfolio resume', 'portfolio resume template', 'resume with portfolio'],
  isPremium: true,
  formSchema: {
    estimatedMinutes: 20,
    steps: [
      personalSection(),
      summarySection('Creative Bio'),
      skillsSection(),
      {
        id: 'portfolio', title: 'Portfolio Highlights', icon: '🖼️',
        repeatable: true, addButtonLabel: 'Add Portfolio Item', dragReorderable: true,
        completionFields: ['title'],
        fields: [
          { id: 'title',       type: 'text',     label: 'Project / Work Title',   required: true },
          { id: 'category',    type: 'text',     label: 'Category',               placeholder: 'Brand Identity, UI Design, Web Dev…' },
          { id: 'url',         type: 'url',      label: 'Live URL / Case Study' },
          { id: 'description', type: 'textarea', label: 'Brief Description',      rows: 3, fullWidth: true },
        ],
      },
      experienceSection(),
      educationSection(),
      certificationsSection(),
    ],
  },
  supportedTemplateIds: ['resume-creative', 'resume-modern'],
  freeTemplateIds: [],
};

// ─── 16. Internship Resume Generator ──────────────────────────────────────────

const INTERNSHIP_RESUME_GENERATOR: GeneratorDefinition = {
  id: 'internship-resume',
  name: 'Internship Resume Generator',
  slug: 'internship-resume',
  category: 'resume',
  seoLandingRoute: '/internship-resume-generator',
  description: 'Create a polished internship resume that showcases your academic achievements, coursework, and side projects — even with no prior work experience.',
  shortDescription: 'Resume template for internship applications',
  icon: '🏃',
  color: '#3B82F6',
  tags: ['internship', 'student', 'part-time', 'college'],
  seoKeywords: ['internship resume', 'internship resume format', 'resume for internship', 'student internship cv'],
  isPremium: false,
  formSchema: FRESHER_RESUME_GENERATOR.formSchema,
  supportedTemplateIds: ['resume-modern', 'resume-minimal', 'resume-ats'],
  freeTemplateIds: ['resume-minimal', 'resume-ats'],
};

// ─── 17. ATS Resume Generator ─────────────────────────────────────────────────

const ATS_RESUME_GENERATOR: GeneratorDefinition = {
  id: 'ats-resume',
  name: 'ATS-Friendly Resume Generator',
  slug: 'ats-resume',
  category: 'resume',
  seoLandingRoute: '/ats-resume-generator',
  description: 'Generate a resume optimised for Applicant Tracking Systems. Clean formatting, keyword-rich sections, and machine-readable layout to pass automated screening.',
  shortDescription: 'ATS-optimised resume to beat applicant tracking',
  icon: '🤖',
  color: '#3B82F6',
  tags: ['ATS', 'applicant tracking', 'keyword', 'job portal', 'Naukri', 'LinkedIn'],
  seoKeywords: ['ATS resume', 'ATS resume builder', 'ATS friendly resume', 'applicant tracking system resume', 'ATS resume format india'],
  isPremium: false,
  isPopular: true,
  isAtsOptimized: true,
  formSchema: RESUME_GENERATOR.formSchema,
  supportedTemplateIds: ['resume-ats', 'resume-minimal'],
  freeTemplateIds: ['resume-ats', 'resume-minimal'],
};

// ─── 18. One-Page Resume Generator ────────────────────────────────────────────

const ONE_PAGE_RESUME_GENERATOR: GeneratorDefinition = {
  id: 'one-page-resume',
  name: 'One-Page Resume Generator',
  slug: 'one-page-resume',
  category: 'resume',
  description: 'Distil your entire career onto a single A4 page. Tight layout, concise sections, and smart typography — ideal for experienced professionals applying at competitive firms.',
  shortDescription: 'Fit your whole career on one A4 page',
  icon: '📃',
  color: '#3B82F6',
  tags: ['one page', 'concise', 'single page resume'],
  seoKeywords: ['one page resume', 'single page resume template', '1 page resume format'],
  isPremium: false,
  formSchema: RESUME_GENERATOR.formSchema,
  supportedTemplateIds: ['resume-minimal', 'resume-ats'],
  freeTemplateIds: ['resume-minimal', 'resume-ats'],
};

// ─── 19. Multi-Section CV Generator ───────────────────────────────────────────

const MULTI_SECTION_CV_GENERATOR: GeneratorDefinition = {
  id: 'multi-section-cv',
  name: 'Multi-Section CV Generator',
  slug: 'multi-section-cv',
  category: 'cv',
  description: 'Build a comprehensive multi-page CV with unlimited sections — publications, grants, conferences, patents, teaching experience, and more.',
  shortDescription: 'Detailed multi-page CV for academics & senior leaders',
  icon: '📑',
  color: '#8B5CF6',
  tags: ['cv', 'multi-page', 'academic', 'comprehensive', 'professor'],
  seoKeywords: ['multi section cv', 'detailed cv format', 'academic cv template', 'professor cv'],
  isPremium: true,
  formSchema: CV_GENERATOR.formSchema,
  supportedTemplateIds: ['cv-academic', 'cv-executive', 'cv-clean'],
  freeTemplateIds: [],
};

// ─── 20. Custom Document Generator ────────────────────────────────────────────

const CUSTOM_GENERATOR: GeneratorDefinition = {
  id: 'custom',
  name: 'Custom Template Generator',
  slug: 'custom',
  category: 'resume',
  description: 'Start with a blank canvas and add exactly the sections you need. Build any document type with our flexible section editor.',
  shortDescription: 'Build any document with a fully custom layout',
  icon: '🎛️',
  color: '#64748B',
  tags: ['custom', 'flexible', 'custom template', 'blank'],
  seoKeywords: ['custom resume template', 'custom cv builder', 'custom document generator'],
  isPremium: true,
  formSchema: {
    estimatedMinutes: 20,
    steps: [
      personalSection(),
      summarySection(),
    ],
  },
  supportedTemplateIds: ['resume-modern', 'resume-minimal', 'resume-ats', 'cv-clean'],
  freeTemplateIds: [],
};

// ─── Master generator registry ─────────────────────────────────────────────────

export const GENERATORS: GeneratorDefinition[] = [
  RESUME_GENERATOR,              // 1
  CV_GENERATOR,                  // 2
  BIODATA_GENERATOR,             // 3
  MARRIAGE_BIODATA_GENERATOR,    // 4
  COVER_LETTER_GENERATOR,        // 5
  JOB_APPLICATION_LETTER_GENERATOR, // 6
  PROFESSIONAL_SUMMARY_GENERATOR, // 7
  FRESHER_RESUME_GENERATOR,      // 8
  EXPERIENCED_RESUME_GENERATOR,  // 9
  TEACHER_RESUME_GENERATOR,      // 10
  DEVELOPER_RESUME_GENERATOR,    // 11
  DESIGNER_RESUME_GENERATOR,     // 12
  SIMPLE_MARRIAGE_BIODATA_GENERATOR, // 13
  MODERN_MARRIAGE_BIODATA_GENERATOR, // 14
  PORTFOLIO_RESUME_GENERATOR,    // 15
  INTERNSHIP_RESUME_GENERATOR,   // 16
  ATS_RESUME_GENERATOR,          // 17
  ONE_PAGE_RESUME_GENERATOR,     // 18
  MULTI_SECTION_CV_GENERATOR,    // 19
  CUSTOM_GENERATOR,              // 20
];

export const GENERATOR_MAP = new Map<string, GeneratorDefinition>(
  GENERATORS.map(g => [g.id, g]),
);

export function getGeneratorById(id: string): GeneratorDefinition | undefined {
  return GENERATOR_MAP.get(id);
}

export function getGeneratorBySlug(slug: string): GeneratorDefinition | undefined {
  return GENERATORS.find(g => g.slug === slug);
}

export function getGeneratorsByCategory(category: string): GeneratorDefinition[] {
  return GENERATORS.filter(g => g.category === category);
}

export function getPopularGenerators(): GeneratorDefinition[] {
  return GENERATORS.filter(g => g.isPopular);
}

export function getFreeGenerators(): GeneratorDefinition[] {
  return GENERATORS.filter(g => !g.isPremium);
}
