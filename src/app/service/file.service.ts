import { Injectable } from '@angular/core';
import Book from '../models/book.model';
import Author from '../models/author.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  book_folder = 'books';
  book_cover_folder = 'book_covers';
  author_profile_picture_folder = '';
  constructor() {}

  getBookFile(book: Book) {
    if (
      book.filepath.startsWith('http://') ||
      book.filepath.startsWith('https://')
    )
      return book.filepath;
    return (
      (environment.production ? '' : environment.fileServer + '/') +
      'files/' +
      this.book_folder +
      '/' +
      book.filepath
    );
  }
  getBookCoverPath(book: Book) {
    if (
      book.picture.startsWith('http://') ||
      book.picture.startsWith('https://')
    )
      return book.picture;
    return (
      (environment.production ? '' : environment.fileServer + '/') +
      'files/' +
      this.book_cover_folder +
      '/' +
      book.picture
    );
  }
  getAuthorProfilePath(author: Author) {
    if (
      author.profilepicture.startsWith('http://') ||
      author.profilepicture.startsWith('https://')
    )
      return author.profilepicture;
    return (
      (environment.production ? '' : environment.fileServer + '/') +
      'files/' +
      this.author_profile_picture_folder +
      '/' +
      author.profilepicture
    );
  }
}
