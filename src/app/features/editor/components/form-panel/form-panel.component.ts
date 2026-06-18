import { Component, inject, signal, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { BiodataService } from '../../../../core/services/biodata.service';
import { BiodataSection, BiodataField, generateId } from '../../../../core/models/biodata.models';

@Component({
  selector: 'app-form-panel',
  standalone: true,
  imports: [NgClass, FormsModule, DragDropModule],
  templateUrl: './form-panel.component.html',
  styleUrl: './form-panel.component.scss',
})
export class FormPanelComponent {
  protected svc = inject(BiodataService);

  // UI state
  protected addFieldSectionId = signal<string | null>(null);
  protected newFieldLabel = signal('');
  protected newFieldType = signal<BiodataField['type']>('text');
  protected addingSectionTitle = signal(false);
  protected newSectionTitle = signal('');
  protected editingFieldId = signal<string | null>(null);

  protected fieldTypes: { value: BiodataField['type']; label: string }[] = [
    { value: 'text', label: 'Text' },
    { value: 'textarea', label: 'Long Text' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'phone', label: 'Phone' },
    { value: 'email', label: 'Email' },
  ];

  // ─── Section actions ────────────────────────────────────────────────────────

  toggleSection(id: string): void {
    this.svc.toggleSectionCollapsed(id);
  }

  toggleSectionVisibility(id: string, event: Event): void {
    event.stopPropagation();
    this.svc.toggleSectionVisibility(id);
  }

  deleteSection(id: string, event: Event): void {
    event.stopPropagation();
    this.svc.deleteSection(id);
  }

  onSectionTitleBlur(id: string, title: string): void {
    this.svc.updateSectionTitle(id, title);
  }

  dropSection(event: CdkDragDrop<BiodataSection[]>): void {
    const sections = [...this.svc.sections()];
    moveItemInArray(sections, event.previousIndex, event.currentIndex);
    this.svc.reorderSections(sections);
  }

  showAddSection(): void {
    this.addingSectionTitle.set(true);
    this.newSectionTitle.set('');
  }

  confirmAddSection(): void {
    const title = this.newSectionTitle().trim();
    if (title) this.svc.addCustomSection(title);
    this.addingSectionTitle.set(false);
  }

  cancelAddSection(): void {
    this.addingSectionTitle.set(false);
  }

  // ─── Field actions ──────────────────────────────────────────────────────────

  updateField(sectionId: string, fieldId: string, value: string): void {
    this.svc.updateField(sectionId, fieldId, value);
  }

  toggleFieldVisibility(sectionId: string, fieldId: string, event: Event): void {
    event.stopPropagation();
    this.svc.toggleFieldVisibility(sectionId, fieldId);
  }

  deleteField(sectionId: string, fieldId: string): void {
    this.svc.deleteField(sectionId, fieldId);
  }

  dropField(event: CdkDragDrop<BiodataField[]>, sectionId: string): void {
    const section = this.svc.sections().find(s => s.id === sectionId);
    if (!section) return;
    const fields = [...section.fields];
    moveItemInArray(fields, event.previousIndex, event.currentIndex);
    this.svc.reorderFields(sectionId, fields);
  }

  showAddField(sectionId: string): void {
    this.addFieldSectionId.set(sectionId);
    this.newFieldLabel.set('');
    this.newFieldType.set('text');
  }

  confirmAddField(): void {
    const label = this.newFieldLabel().trim();
    const sectionId = this.addFieldSectionId();
    if (label && sectionId) {
      this.svc.addCustomField(sectionId, label, this.newFieldType());
    }
    this.addFieldSectionId.set(null);
  }

  cancelAddField(): void {
    this.addFieldSectionId.set(null);
  }

  // ─── Photo ──────────────────────────────────────────────────────────────────

  onPhotoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => this.svc.setPhoto(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  removePhoto(): void {
    this.svc.setPhoto(null);
  }

  setPhotoShape(shape: 'circular' | 'rectangular'): void {
    this.svc.setPhotoShape(shape);
  }

  // ─── Header ─────────────────────────────────────────────────────────────────

  updateHeaderSymbol(value: string): void {
    this.svc.updateHeaderSymbol(value);
  }
}
