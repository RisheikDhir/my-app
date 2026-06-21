// ─── Template / Renderer Domain Models ────────────────────────────────────────

import { GeneratorCategory } from './generator.models';

export type PageSize = 'A4' | 'Letter';
export type PageOrientation = 'portrait' | 'landscape';
export type HeaderLayout = 'centered' | 'left' | 'split' | 'banner';
export type PhotoShape = 'circle' | 'square' | 'rounded';
export type PhotoPosition = 'header-left' | 'header-right' | 'sidebar-top' | 'none';
export type SectionHeaderStyle = 'underline' | 'filled' | 'plain' | 'bordered' | 'pill' | 'none';

export interface PageMargins {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export interface PrintSettings {
  pageSize: PageSize;
  orientation: PageOrientation;
  margins: PageMargins;
  headerOnEveryPage: boolean;
  showPageNumbers: boolean;
  scale?: number;           // 0.9 = 90% for tighter fit
}

export interface TemplateTypographyConfig {
  fontPrimary: string;      // Google Font name, e.g. 'Inter'
  fontSecondary?: string;   // Optional for headers
  fontSizeBase: number;     // in pt for print (10, 11, 12)
  lineHeight: number;       // e.g. 1.5
  headingWeight: 600 | 700 | 800;
  letterSpacingHeadings?: string; // e.g. '0.05em'
}

export interface TemplateThemeConfig {
  primaryColor: string;     // hex, e.g. '#1a56db'
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  mutedColor: string;
  borderColor: string;
  sectionHeaderStyle: SectionHeaderStyle;
  sectionHeaderColor?: string; // if different from primary
}

export interface TemplateLayoutConfig {
  columns: 1 | 2;
  headerLayout: HeaderLayout;
  showPhoto: boolean;
  photoShape: PhotoShape;
  photoPosition: PhotoPosition;
  sidebarWidth?: string;    // e.g. '35%' for 2-col layouts
  pageMargins: PageMargins;
  sectionSpacing: 'compact' | 'normal' | 'relaxed';
}

export interface DocumentTemplate {
  id: string;
  name: string;
  slug: string;
  category: GeneratorCategory | 'universal';
  description: string;
  isPremium: boolean;
  isAtsOptimized?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  thumbnailUrl: string;     // path to template preview image
  tags: string[];
  typography: TemplateTypographyConfig;
  layout: TemplateLayoutConfig;
  theme: TemplateThemeConfig;
  supportedSections: string[]; // sectionIds this template knows how to render
  printSettings: PrintSettings;
  rendererClass: string;    // CSS class applied to the .document-page root
  fontImports: string[];    // Google Fonts URL parts to preload
}

// ─── Template feature flag utility ────────────────────────────────────────────

export function isTemplateFree(template: DocumentTemplate): boolean {
  return !template.isPremium;
}

export function getTemplatesByCategory(
  templates: DocumentTemplate[],
  category: GeneratorCategory | 'universal',
): DocumentTemplate[] {
  return templates.filter(t => t.category === category || t.category === 'universal');
}
