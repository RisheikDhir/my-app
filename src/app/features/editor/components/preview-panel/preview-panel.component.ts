import { Component, inject, signal, ViewChild, ElementRef, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgStyle, NgClass } from '@angular/common';
import { BiodataService } from '../../../../core/services/biodata.service';
import { PdfService } from '../../../../core/services/pdf.service';
import { BiodataPreviewComponent } from '../biodata-preview/biodata-preview.component';
import { TemplateSwitcherComponent } from '../template-switcher/template-switcher.component';

@Component({
  selector: 'app-preview-panel',
  standalone: true,
  imports: [NgStyle, NgClass, BiodataPreviewComponent, TemplateSwitcherComponent],
  templateUrl: './preview-panel.component.html',
  styleUrl: './preview-panel.component.scss',
})
export class PreviewPanelComponent implements AfterViewInit {
  protected svc = inject(BiodataService);
  private pdfSvc = inject(PdfService);
  private platformId = inject(PLATFORM_ID);

  protected previewScale = signal(0.5);
  protected isDownloading = signal(false);
  protected showTemplateSwitcher = signal(false);

  @ViewChild('previewWrapper') previewWrapper!: ElementRef<HTMLElement>;
  @ViewChild(BiodataPreviewComponent) biodataPreview!: BiodataPreviewComponent;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.computeScale();
      const ro = new ResizeObserver(() => this.computeScale());
      ro.observe(this.previewWrapper.nativeElement);
    }
  }

  private computeScale(): void {
    const w = this.previewWrapper?.nativeElement?.offsetWidth ?? 400;
    // A4 width = 794px, leave 32px padding on each side
    this.previewScale.set(Math.min((w - 32) / 794, 1));
  }

  getPageElement(): HTMLElement {
    return this.biodataPreview.getPageElement();
  }

  async downloadPdf(): Promise<void> {
    this.isDownloading.set(true);
    try {
      await this.pdfSvc.downloadPdf(this.getPageElement(), this.svc.fullName());
    } finally {
      this.isDownloading.set(false);
    }
  }

  async downloadImage(): Promise<void> {
    this.isDownloading.set(true);
    try {
      await this.pdfSvc.downloadImage(this.getPageElement(), this.svc.fullName());
    } finally {
      this.isDownloading.set(false);
    }
  }

  toggleTemplateSwitcher(): void {
    this.showTemplateSwitcher.update(v => !v);
  }
}
