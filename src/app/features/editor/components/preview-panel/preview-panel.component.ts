import { Component, inject, signal, ViewChild, ElementRef, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgStyle, NgClass } from '@angular/common';
import { BiodataService } from '../../../../core/services/biodata.service';
import { PdfService } from '../../../../core/services/pdf.service';
import { PaymentService } from '../../../../core/services/payment.service';
import { BiodataPreviewComponent } from '../biodata-preview/biodata-preview.component';
import { TemplateSwitcherComponent } from '../template-switcher/template-switcher.component';

type DownloadState = 'idle' | 'paying' | 'generating' | 'success' | 'error';

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
  protected paymentSvc = inject(PaymentService);
  private platformId = inject(PLATFORM_ID);

  protected previewScale = signal(0.5);
  protected downloadState = signal<DownloadState>('idle');
  protected errorMessage = signal('');
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
    this.previewScale.set(Math.min((w - 32) / 794, 1));
  }

  getPageElement(): HTMLElement {
    return this.biodataPreview.getPageElement();
  }

  async downloadPdf(): Promise<void> {
    await this.runWithPayment(async () => {
      await this.pdfSvc.downloadPdf(this.getPageElement(), this.svc.fullName());
    });
  }

  async downloadImage(): Promise<void> {
    await this.runWithPayment(async () => {
      await this.pdfSvc.downloadImage(this.getPageElement(), this.svc.fullName());
    });
  }

  private async runWithPayment(action: () => Promise<void>): Promise<void> {
    this.errorMessage.set('');

    // Payment step (skipped if already paid this session)
    if (!this.paymentSvc.isPaid()) {
      this.downloadState.set('paying');
      try {
        await this.paymentSvc.requestPayment(this.svc.fullName());
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg === 'cancelled') {
          this.downloadState.set('idle');
        } else {
          this.errorMessage.set(msg);
          this.downloadState.set('error');
          setTimeout(() => this.downloadState.set('idle'), 4000);
        }
        return;
      }
    }

    // Generate and download
    this.downloadState.set('generating');
    try {
      await action();
      this.downloadState.set('success');
      setTimeout(() => this.downloadState.set('idle'), 2500);
    } catch {
      this.errorMessage.set('Download failed. Please try again.');
      this.downloadState.set('error');
      setTimeout(() => this.downloadState.set('idle'), 4000);
    }
  }

  toggleTemplateSwitcher(): void {
    this.showTemplateSwitcher.update(v => !v);
  }
}
