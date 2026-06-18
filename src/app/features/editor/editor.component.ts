import { Component, inject, signal, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BiodataService } from '../../core/services/biodata.service';
import { SeoService } from '../../core/services/seo.service';
import { FormPanelComponent } from './components/form-panel/form-panel.component';
import { PreviewPanelComponent } from './components/preview-panel/preview-panel.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [NgClass, FormsModule, FormPanelComponent, PreviewPanelComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements OnInit {
  protected svc = inject(BiodataService);
  private seoSvc = inject(SeoService);

  protected mobileView = signal<'edit' | 'preview'>('edit');
  protected onboardingName = signal('');

  ngOnInit(): void {
    this.seoSvc.setPage({
      title: 'Create Your Marriage Biodata',
      description: 'Build and customize your marriage biodata with live preview. Choose from 5 beautiful templates and download as a perfect PDF.',
    });
  }

  completeOnboarding(): void {
    const name = this.onboardingName().trim();
    if (!name) return;
    this.svc.setOnboarded(name);
  }

  reset(): void {
    if (confirm('Reset all data and start fresh? This cannot be undone.')) {
      this.svc.reset();
    }
  }

  toggleDarkMode(): void {
    this.svc.toggleDarkMode();
  }
}
