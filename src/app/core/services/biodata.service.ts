import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  AppState, BiodataData, BiodataField, BiodataSection, TemplateColors,
  TEMPLATES, Template, createDefaultState, generateId
} from '../models/biodata.models';

const STORAGE_KEY = 'biodata_app_state_v1';

@Injectable({ providedIn: 'root' })
export class BiodataService {
  private platformId = inject(PLATFORM_ID);

  private _state = signal<AppState>(this.loadOrDefault());

  // Public readable signals
  readonly state = this._state.asReadonly();
  readonly biodata = computed(() => this._state().biodata);
  readonly sections = computed(() => this._state().biodata.sections);
  readonly selectedTemplateId = computed(() => this._state().selectedTemplateId);
  readonly customColors = computed(() => this._state().customColors);
  readonly selectedFontPairId = computed(() => this._state().selectedFontPairId);
  readonly isDarkMode = computed(() => this._state().isDarkMode);
  readonly hasOnboarded = computed(() => this._state().hasOnboarded);
  readonly saveIndicator = signal<'saved' | 'saving' | 'idle'>('idle');

  readonly activeTemplate = computed((): Template => {
    const id = this._state().selectedTemplateId;
    return TEMPLATES.find(t => t.id === id) ?? TEMPLATES[0];
  });

  readonly effectiveColors = computed(() => {
    const template = this.activeTemplate();
    const custom = this._state().customColors;
    return { ...template.defaultColors, ...custom } as TemplateColors;
  });

  readonly activeFontPair = computed(() => {
    const template = this.activeTemplate();
    const fpId = this._state().selectedFontPairId ?? template.defaultFontPairId;
    return template.fontPairs.find(fp => fp.id === fpId) ?? template.fontPairs[0];
  });

  readonly fullName = computed(() => {
    const personal = this._state().biodata.sections.find(s => s.id === 'personal');
    return personal?.fields.find(f => f.id === 'full-name')?.value ?? 'Your Name';
  });

  constructor() {
    // Autosave with debounce-like effect — runs after state changes
    effect(() => {
      const state = this._state();
      if (isPlatformBrowser(this.platformId)) {
        this.saveIndicator.set('saving');
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {
          // ignore storage errors
        }
        // brief "Saved" flash
        setTimeout(() => this.saveIndicator.set('saved'), 200);
        setTimeout(() => this.saveIndicator.set('idle'), 1800);
      }
    });
  }

  private loadOrDefault(): AppState {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw) as AppState;
      } catch {
        // ignore parse errors
      }
    }
    return createDefaultState();
  }

  // ─── State mutations ──────────────────────────────────────────────────────

  setOnboarded(name: string): void {
    this._state.update(s => {
      const sections = s.biodata.sections.map(section => {
        if (section.id !== 'personal') return section;
        return {
          ...section,
          fields: section.fields.map(f =>
            f.id === 'full-name' ? { ...f, value: name } : f
          ),
        };
      });
      return {
        ...s,
        hasOnboarded: true,
        biodata: { ...s.biodata, sections },
      };
    });
  }

  updateField(sectionId: string, fieldId: string, value: string): void {
    this._state.update(s => ({
      ...s,
      biodata: {
        ...s.biodata,
        sections: s.biodata.sections.map(sec =>
          sec.id !== sectionId ? sec : {
            ...sec,
            fields: sec.fields.map(f =>
              f.id !== fieldId ? f : { ...f, value }
            ),
          }
        ),
      },
    }));
  }

  updateFieldLabel(sectionId: string, fieldId: string, label: string): void {
    this._state.update(s => ({
      ...s,
      biodata: {
        ...s.biodata,
        sections: s.biodata.sections.map(sec =>
          sec.id !== sectionId ? sec : {
            ...sec,
            fields: sec.fields.map(f =>
              f.id !== fieldId ? f : { ...f, label }
            ),
          }
        ),
      },
    }));
  }

  toggleFieldVisibility(sectionId: string, fieldId: string): void {
    this._state.update(s => ({
      ...s,
      biodata: {
        ...s.biodata,
        sections: s.biodata.sections.map(sec =>
          sec.id !== sectionId ? sec : {
            ...sec,
            fields: sec.fields.map(f =>
              f.id !== fieldId ? f : { ...f, visible: !f.visible }
            ),
          }
        ),
      },
    }));
  }

  deleteField(sectionId: string, fieldId: string): void {
    this._state.update(s => ({
      ...s,
      biodata: {
        ...s.biodata,
        sections: s.biodata.sections.map(sec =>
          sec.id !== sectionId ? sec : {
            ...sec,
            fields: sec.fields.filter(f => f.id !== fieldId),
          }
        ),
      },
    }));
  }

  addCustomField(sectionId: string, label: string, type: BiodataField['type']): void {
    const newField: BiodataField = {
      id: generateId(),
      label,
      value: '',
      type,
      visible: true,
      isCustom: true,
    };
    this._state.update(s => ({
      ...s,
      biodata: {
        ...s.biodata,
        sections: s.biodata.sections.map(sec =>
          sec.id !== sectionId ? sec : {
            ...sec,
            fields: [...sec.fields, newField],
          }
        ),
      },
    }));
  }

  reorderFields(sectionId: string, fields: BiodataField[]): void {
    this._state.update(s => ({
      ...s,
      biodata: {
        ...s.biodata,
        sections: s.biodata.sections.map(sec =>
          sec.id !== sectionId ? sec : { ...sec, fields }
        ),
      },
    }));
  }

  toggleSectionVisibility(sectionId: string): void {
    this._state.update(s => ({
      ...s,
      biodata: {
        ...s.biodata,
        sections: s.biodata.sections.map(sec =>
          sec.id !== sectionId ? sec : { ...sec, visible: !sec.visible }
        ),
      },
    }));
  }

  toggleSectionCollapsed(sectionId: string): void {
    this._state.update(s => ({
      ...s,
      biodata: {
        ...s.biodata,
        sections: s.biodata.sections.map(sec =>
          sec.id !== sectionId ? sec : { ...sec, collapsed: !sec.collapsed }
        ),
      },
    }));
  }

  updateSectionTitle(sectionId: string, title: string): void {
    this._state.update(s => ({
      ...s,
      biodata: {
        ...s.biodata,
        sections: s.biodata.sections.map(sec =>
          sec.id !== sectionId ? sec : { ...sec, title }
        ),
      },
    }));
  }

  deleteSection(sectionId: string): void {
    this._state.update(s => ({
      ...s,
      biodata: {
        ...s.biodata,
        sections: s.biodata.sections.filter(sec => sec.id !== sectionId),
      },
    }));
  }

  addCustomSection(title: string): void {
    const newSection: BiodataSection = {
      id: generateId(),
      title,
      icon: '📝',
      fields: [],
      visible: true,
      isCustom: true,
      collapsed: false,
    };
    this._state.update(s => ({
      ...s,
      biodata: {
        ...s.biodata,
        sections: [...s.biodata.sections, newSection],
      },
    }));
  }

  reorderSections(sections: BiodataSection[]): void {
    this._state.update(s => ({
      ...s,
      biodata: { ...s.biodata, sections },
    }));
  }

  updateHeaderSymbol(symbol: string): void {
    this._state.update(s => ({
      ...s,
      biodata: { ...s.biodata, headerSymbol: symbol },
    }));
  }

  setPhoto(dataUrl: string | null): void {
    this._state.update(s => ({
      ...s,
      biodata: { ...s.biodata, photo: dataUrl },
    }));
  }

  setPhotoShape(shape: BiodataData['photoShape']): void {
    this._state.update(s => ({
      ...s,
      biodata: { ...s.biodata, photoShape: shape },
    }));
  }

  selectTemplate(id: string): void {
    this._state.update(s => ({
      ...s,
      selectedTemplateId: id,
      customColors: null,
      selectedFontPairId: null,
    }));
  }

  updateCustomColor(key: keyof TemplateColors, value: string): void {
    this._state.update(s => ({
      ...s,
      customColors: { ...(s.customColors ?? {}), [key]: value },
    }));
  }

  selectFontPair(id: string): void {
    this._state.update(s => ({ ...s, selectedFontPairId: id }));
  }

  toggleDarkMode(): void {
    this._state.update(s => ({ ...s, isDarkMode: !s.isDarkMode }));
  }

  reset(): void {
    const fresh = createDefaultState();
    fresh.hasOnboarded = false;
    this._state.set(fresh);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
