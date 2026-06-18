import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PdfService {

  async downloadPdf(element: HTMLElement, name: string): Promise<void> {
    const { default: html2canvas } = await import('html2canvas');
    const { jsPDF } = await import('jspdf');

    const scale = 2;
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: null,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });

    const pageW = 210;
    const pageH = 297;
    const imgW = canvas.width / scale;
    const imgH = canvas.height / scale;

    // px → mm at 96dpi: 1px = 0.2646mm
    const pxToMm = 0.2646;
    const docW = imgW * pxToMm;
    const docH = imgH * pxToMm;

    if (docH <= pageH) {
      // Single page
      pdf.addImage(imgData, 'JPEG', (pageW - docW) / 2, 0, docW, docH);
    } else {
      // Multi-page: slice canvas by page height
      const pageHeightPx = (pageH / pxToMm) * scale;
      let yOffset = 0;
      let page = 0;
      while (yOffset < canvas.height) {
        if (page > 0) pdf.addPage();
        const sliceH = Math.min(pageHeightPx, canvas.height - yOffset);
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceH;
        const ctx = sliceCanvas.getContext('2d')!;
        ctx.drawImage(canvas, 0, yOffset, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
        const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.98);
        const sliceDocH = (sliceH / scale) * pxToMm;
        pdf.addImage(sliceData, 'JPEG', (pageW - docW) / 2, 0, docW, sliceDocH);
        yOffset += sliceH;
        page++;
      }
    }

    const filename = name ? `${name.replace(/\s+/g, '-')}-Marriage-Biodata.pdf` : 'Marriage-Biodata.pdf';
    pdf.save(filename);
  }

  async downloadImage(element: HTMLElement, name: string): Promise<void> {
    const { default: html2canvas } = await import('html2canvas');

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: null,
    });

    const link = document.createElement('a');
    link.download = name ? `${name.replace(/\s+/g, '-')}-Biodata.png` : 'Marriage-Biodata.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}
