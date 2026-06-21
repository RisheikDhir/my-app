import { Component, inject, computed } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DocumentsFacade } from '../../../core/facades/documents.facade';

@Component({
  selector: 'app-download-history',
  standalone: true,
  imports: [DatePipe, UpperCasePipe, RouterLink],
  templateUrl: './download-history.component.html',
  styleUrl: './download-history.component.scss',
})
export class DownloadHistoryComponent {
  private docs = inject(DocumentsFacade);

  readonly downloads = computed(() =>
    this.docs.getDownloads().slice().reverse()
  );

  docTitle(docId: string): string {
    return this.docs.getById(docId)?.title ?? docId;
  }
}
