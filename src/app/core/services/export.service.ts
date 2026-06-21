// ─── ExportService ─────────────────────────────────────────────────────────────
// Client-side PDF export using html2canvas + jsPDF.
// Orchestrates access check → Razorpay gate → watermark removal → PDF save.

import { Injectable, inject } from '@angular/core';
import { AccessControlService } from './access-control.service';
import { PaymentFacade } from '../facades/payment.facade';
import { DocumentsFacade } from '../facades/documents.facade';
import { DownloadRecord } from '../models/document.models';

declare const window: Window & typeof globalThis;

@Injectable({ providedIn: 'root' })
export class ExportService {
  private access  = inject(AccessControlService);
  private payment = inject(PaymentFacade);
  private docs    = inject(DocumentsFacade);

  /**
   * Full download flow: check access → pay if needed → remove watermark → export PDF.
   * Returns true if the download completed.
   */
  async downloadPdf(
    element: HTMLElement,
    docId: string,
    filename: string,
  ): Promise<boolean> {
    // Check if document is already unlocked or user is Pro
    if (!this.access.canDownloadWithoutPayment(docId)) {
      const paid = await this.payment.payForDownload(docId);
      if (!paid) return false;
    }

    await this.renderAndSave(element, filename);
    this.recordDownload(docId, filename);
    return true;
  }

  /** Download a watermarked preview PDF without payment. */
  async downloadWatermarked(element: HTMLElement, filename: string): Promise<void> {
    await this.renderAndSave(element, `[PREVIEW] ${filename}`);
  }

  /** Export for print (opens system print dialog). */
  printDocument(): void {
    window.print();
  }

  // ── Private ──────────────────────────────────────────────────────────────────

  private async renderAndSave(element: HTMLElement, filename: string): Promise<void> {
    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);

    // html2canvas produces doubled/overlapping text when a parent element has
    // transform: scale(). Temporarily disable the preview scaler's transform
    // before capturing so the DOM renders at 1:1 scale.
    const scaler = element.closest('.preview-scaler') as HTMLElement | null;
    if (scaler) scaler.style.transform = 'none';

    // Hide watermark overlay for the exported PDF
    const watermark = element.querySelector('.watermark-overlay') as HTMLElement | null;
    if (watermark) watermark.style.display = 'none';

    // Give the browser one frame to repaint without the transform
    await new Promise<void>(resolve => requestAnimationFrame(() => { requestAnimationFrame(() => resolve()); }));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    // Restore the scaler transform and watermark
    if (scaler) scaler.style.removeProperty('transform');
    if (watermark) watermark.style.removeProperty('display');

    const imgData   = canvas.toDataURL('image/jpeg', 0.95);
    const pdfWidth  = 210; // A4 mm
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    let yOffset = 0;
    const pageHeight = 297;

    while (yOffset < pdfHeight) {
      if (yOffset > 0) pdf.addPage();
      pdf.addImage(
        imgData, 'JPEG',
        0, -yOffset,
        pdfWidth, pdfHeight,
      );
      yOffset += pageHeight;
    }

    pdf.save(`${filename.replace(/[^a-z0-9-_]/gi, '_')}.pdf`);
  }

  private recordDownload(docId: string, filename: string): void {
    const doc = this.docs.getById(docId);
    if (!doc) return;
    const record: DownloadRecord = {
      id: `dl_${Date.now()}`,
      documentId: docId,
      profileId: doc.profileId,
      format: 'pdf',
      templateId: doc.templateId,
      generatorId: doc.generatorId,
      downloadedAt: new Date().toISOString(),
    };
    this.docs.recordDownload(record);
  }
}
