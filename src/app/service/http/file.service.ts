import { inject, Injectable } from '@angular/core';
import Book from '../../models/book.model';
import { FileClient } from './gen/generated';
import { first, map, shareReplay } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import Author from '../../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiClient = inject(FileClient);
  private sanitizer = inject(DomSanitizer);

  getBookCover(book: Book) {
    return this.apiClient.getBookCover(book.picture).pipe(
      first(),
      shareReplay(1),
      map((a) => this.convertToFile(a.file ?? '', a.mimetype ?? ''))
    );
  }
  getBookFile(book: Book) {
    return this.apiClient.getBookCover(book.filepath).pipe(
      first(),
      shareReplay(1),
      map((a) => this.convertToByteArray(a.file ?? ''))
    );
  }
  getAuthorProfile(author: Author) {
    return author.profilepicture;
  }

  private convertToByteArray(inputBlob: string) {
    const cleanBase64 = inputBlob.split(',')[1] || inputBlob;

    const byteCharacters = atob(cleanBase64);
    const byteArrays = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays[i] = byteCharacters.charCodeAt(i);
    }

    return byteArrays.buffer;
  }
  private convertToFile(inputBlob: string, mimetype: string) {
    const byteString = atob(inputBlob);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: mimetype });
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
  }
}
