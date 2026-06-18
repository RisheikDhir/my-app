export type FieldType = 'text' | 'number' | 'date' | 'dropdown' | 'textarea' | 'phone' | 'email';
export type PhotoShape = 'circular' | 'rectangular';
export type TemplateStyle = 'royal' | 'modern' | 'floral' | 'classic' | 'vibrant';

export interface BiodataField {
  id: string;
  label: string;
  value: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  visible: boolean;
  isCustom: boolean;
}

export interface BiodataSection {
  id: string;
  title: string;
  icon: string;
  fields: BiodataField[];
  visible: boolean;
  isCustom: boolean;
  collapsed: boolean;
}

export interface TemplateColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
  headerBg: string;
  headerText: string;
}

export interface FontPair {
  id: string;
  name: string;
  heading: string;
  body: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  style: TemplateStyle;
  defaultColors: TemplateColors;
  fontPairs: FontPair[];
  defaultFontPairId: string;
}

export interface BiodataData {
  headerSymbol: string;
  photo: string | null;
  photoShape: PhotoShape;
  sections: BiodataSection[];
}

export interface AppState {
  biodata: BiodataData;
  selectedTemplateId: string;
  customColors: Partial<TemplateColors> | null;
  selectedFontPairId: string | null;
  isDarkMode: boolean;
  hasOnboarded: boolean;
}

// ─── Templates ────────────────────────────────────────────────────────────────

export const TEMPLATES: Template[] = [
  {
    id: 'royal',
    name: 'Royal',
    description: 'Traditional maroon & gold with ornate design',
    style: 'royal',
    defaultColors: {
      primary: '#8B0000',
      secondary: '#5C0000',
      accent: '#D4AF37',
      background: '#FDF8F0',
      text: '#2C1810',
      border: '#D4AF37',
      headerBg: '#8B0000',
      headerText: '#D4AF37',
    },
    fontPairs: [
      { id: 'playfair-garamond', name: 'Playfair & Garamond', heading: "'Playfair Display', serif", body: "'EB Garamond', serif" },
      { id: 'cinzel-crimson', name: 'Cinzel & Crimson', heading: "'Cinzel', serif", body: "'Crimson Text', serif" },
    ],
    defaultFontPairId: 'playfair-garamond',
  },
  {
    id: 'modern',
    name: 'Modern Minimal',
    description: 'Clean and contemporary with bold accents',
    style: 'modern',
    defaultColors: {
      primary: '#2563EB',
      secondary: '#1E40AF',
      accent: '#DBEAFE',
      background: '#FFFFFF',
      text: '#1F2937',
      border: '#E5E7EB',
      headerBg: '#F8FAFF',
      headerText: '#1F2937',
    },
    fontPairs: [
      { id: 'inter', name: 'Inter', heading: "'Inter', sans-serif", body: "'Inter', sans-serif" },
      { id: 'plus-jakarta', name: 'Plus Jakarta Sans', heading: "'Plus Jakarta Sans', sans-serif", body: "'Plus Jakarta Sans', sans-serif" },
    ],
    defaultFontPairId: 'inter',
  },
  {
    id: 'floral',
    name: 'Floral Elegant',
    description: 'Soft pastels with delicate floral accents',
    style: 'floral',
    defaultColors: {
      primary: '#BE185D',
      secondary: '#9D174D',
      accent: '#FDF2F8',
      background: '#FFF5F9',
      text: '#831843',
      border: '#FBCFE8',
      headerBg: '#FCE7F3',
      headerText: '#9D174D',
    },
    fontPairs: [
      { id: 'cormorant-lato', name: 'Cormorant & Lato', heading: "'Cormorant Garamond', serif", body: "'Lato', sans-serif" },
      { id: 'gfs-didot-open-sans', name: 'Didot & Open Sans', heading: "'GFS Didot', serif", body: "'Open Sans', sans-serif" },
    ],
    defaultFontPairId: 'cormorant-lato',
  },
  {
    id: 'classic',
    name: 'Classic Serif',
    description: 'Timeless cream paper with elegant typography',
    style: 'classic',
    defaultColors: {
      primary: '#2C2C2C',
      secondary: '#4A4A4A',
      accent: '#C9A84C',
      background: '#FFFEF0',
      text: '#2C2C2C',
      border: '#C9A84C',
      headerBg: '#FFFEF0',
      headerText: '#2C2C2C',
    },
    fontPairs: [
      { id: 'baskerville-lora', name: 'Baskerville & Lora', heading: "'Libre Baskerville', serif", body: "'Lora', serif" },
      { id: 'merriweather', name: 'Merriweather', heading: "'Merriweather', serif", body: "'Merriweather', serif" },
    ],
    defaultFontPairId: 'baskerville-lora',
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    description: 'Bold gradient header with modern flair',
    style: 'vibrant',
    defaultColors: {
      primary: '#7C3AED',
      secondary: '#5B21B6',
      accent: '#F59E0B',
      background: '#FFFFFF',
      text: '#1F2937',
      border: '#E9D5FF',
      headerBg: '#7C3AED',
      headerText: '#FFFFFF',
    },
    fontPairs: [
      { id: 'poppins-nunito', name: 'Poppins & Nunito', heading: "'Poppins', sans-serif", body: "'Nunito', sans-serif" },
      { id: 'outfit', name: 'Outfit', heading: "'Outfit', sans-serif", body: "'Outfit', sans-serif" },
    ],
    defaultFontPairId: 'poppins-nunito',
  },
];

// ─── Default data ─────────────────────────────────────────────────────────────

export function createDefaultSections(): BiodataSection[] {
  return [
    {
      id: 'personal',
      title: 'Personal Details',
      icon: '👤',
      visible: true,
      isCustom: false,
      collapsed: false,
      fields: [
        { id: 'full-name', label: 'Full Name', value: 'Priya Sharma', type: 'text', placeholder: 'Enter your full name', visible: true, isCustom: false },
        { id: 'dob', label: 'Date of Birth', value: '15 March 1998', type: 'text', placeholder: 'DD Month YYYY', visible: true, isCustom: false },
        { id: 'tob', label: 'Time of Birth', value: '10:30 AM', type: 'text', placeholder: '10:30 AM', visible: true, isCustom: false },
        { id: 'pob', label: 'Place of Birth', value: 'Mumbai, Maharashtra', type: 'text', placeholder: 'City, State', visible: true, isCustom: false },
        { id: 'height', label: 'Height', value: "5'4\"", type: 'text', placeholder: "5'4\"", visible: true, isCustom: false },
        { id: 'weight', label: 'Weight', value: '55 kg', type: 'text', placeholder: '55 kg', visible: true, isCustom: false },
        { id: 'complexion', label: 'Complexion', value: 'Fair', type: 'dropdown', options: ['Very Fair', 'Fair', 'Wheatish', 'Dusky', 'Dark'], visible: true, isCustom: false },
        { id: 'blood-group', label: 'Blood Group', value: 'B+', type: 'dropdown', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], visible: true, isCustom: false },
        { id: 'marital-status', label: 'Marital Status', value: 'Never Married', type: 'dropdown', options: ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'], visible: true, isCustom: false },
        { id: 'mother-tongue', label: 'Mother Tongue', value: 'Hindi', type: 'text', placeholder: 'Hindi', visible: true, isCustom: false },
      ],
    },
    {
      id: 'religious',
      title: 'Religious / Cultural',
      icon: '🙏',
      visible: true,
      isCustom: false,
      collapsed: false,
      fields: [
        { id: 'religion', label: 'Religion', value: 'Hindu', type: 'text', placeholder: 'Hindu', visible: true, isCustom: false },
        { id: 'caste', label: 'Caste / Sub-caste', value: 'Brahmin / Kanyakubj', type: 'text', placeholder: 'Caste / Sub-caste', visible: true, isCustom: false },
        { id: 'gotra', label: 'Gotra', value: 'Kashyap', type: 'text', placeholder: 'Gotra name', visible: true, isCustom: false },
        { id: 'rashi', label: 'Rashi (Moon Sign)', value: 'Vrishabha (Taurus)', type: 'text', placeholder: 'Rashi', visible: true, isCustom: false },
        { id: 'nakshatra', label: 'Nakshatra', value: 'Rohini', type: 'text', placeholder: 'Nakshatra', visible: true, isCustom: false },
        { id: 'manglik', label: 'Manglik', value: 'No', type: 'dropdown', options: ['Yes', 'No', "Don't Know"], visible: true, isCustom: false },
      ],
    },
    {
      id: 'education',
      title: 'Education & Career',
      icon: '🎓',
      visible: true,
      isCustom: false,
      collapsed: false,
      fields: [
        { id: 'qualification', label: 'Highest Qualification', value: 'B.Tech (Computer Science)', type: 'text', placeholder: 'Degree & Field', visible: true, isCustom: false },
        { id: 'college', label: 'College / University', value: 'IIT Bombay', type: 'text', placeholder: 'Institution name', visible: true, isCustom: false },
        { id: 'occupation', label: 'Occupation', value: 'Software Engineer', type: 'text', placeholder: 'Job title', visible: true, isCustom: false },
        { id: 'company', label: 'Company', value: 'Infosys Pvt. Ltd.', type: 'text', placeholder: 'Company name', visible: true, isCustom: false },
        { id: 'income', label: 'Annual Income', value: '₹12 LPA', type: 'text', placeholder: '₹ per annum', visible: true, isCustom: false },
      ],
    },
    {
      id: 'family',
      title: 'Family Details',
      icon: '👨‍👩‍👧',
      visible: true,
      isCustom: false,
      collapsed: false,
      fields: [
        { id: 'father-name', label: "Father's Name", value: 'Ramesh Sharma', type: 'text', placeholder: "Father's full name", visible: true, isCustom: false },
        { id: 'father-occ', label: "Father's Occupation", value: 'Retired Govt. Officer', type: 'text', placeholder: 'Occupation', visible: true, isCustom: false },
        { id: 'mother-name', label: "Mother's Name", value: 'Sunita Sharma', type: 'text', placeholder: "Mother's full name", visible: true, isCustom: false },
        { id: 'mother-occ', label: "Mother's Occupation", value: 'Homemaker', type: 'text', placeholder: 'Occupation', visible: true, isCustom: false },
        { id: 'siblings', label: 'Siblings', value: '1 Brother (Married), 1 Sister (Unmarried)', type: 'text', placeholder: 'Brothers, Sisters', visible: true, isCustom: false },
        { id: 'family-type', label: 'Family Type', value: 'Nuclear', type: 'dropdown', options: ['Nuclear', 'Joint', 'Extended'], visible: true, isCustom: false },
        { id: 'native-place', label: 'Native Place', value: 'Lucknow, Uttar Pradesh', type: 'text', placeholder: 'City, State', visible: true, isCustom: false },
      ],
    },
    {
      id: 'contact',
      title: 'Contact Details',
      icon: '📞',
      visible: true,
      isCustom: false,
      collapsed: false,
      fields: [
        { id: 'phone', label: 'Phone', value: '+91 98765 43210', type: 'phone', placeholder: '+91 XXXXX XXXXX', visible: true, isCustom: false },
        { id: 'email', label: 'Email', value: 'priya.sharma@email.com', type: 'email', placeholder: 'email@example.com', visible: true, isCustom: false },
        { id: 'address', label: 'Address', value: '123, Andheri West, Mumbai - 400053', type: 'textarea', placeholder: 'Full address', visible: true, isCustom: false },
      ],
    },
    {
      id: 'about',
      title: 'Hobbies & About Me',
      icon: '✨',
      visible: true,
      isCustom: false,
      collapsed: false,
      fields: [
        { id: 'hobbies', label: 'Hobbies', value: 'Classical Dance, Reading, Cooking, Travelling', type: 'text', placeholder: 'Your hobbies', visible: true, isCustom: false },
        { id: 'about', label: 'About Me', value: 'A cheerful and family-oriented person with strong values. I believe in building a relationship based on trust, respect, and love.', type: 'textarea', placeholder: 'Write a few lines about yourself...', visible: true, isCustom: false },
      ],
    },
  ];
}

export function createDefaultState(): AppState {
  return {
    biodata: {
      headerSymbol: '॥ श्री गणेशाय नमः ॥',
      photo: null,
      photoShape: 'circular',
      sections: createDefaultSections(),
    },
    selectedTemplateId: 'royal',
    customColors: null,
    selectedFontPairId: null,
    isDarkMode: false,
    hasOnboarded: false,
  };
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}
