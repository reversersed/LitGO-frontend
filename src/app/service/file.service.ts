import { Injectable } from '@angular/core';
import Book from '../models/book.model';
import Author from '../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  book_folder = 'books';
  book_cover_folder = 'book_covers';
  author_profile_picture_folder = '';
  constructor() {}

  getBookFile(book: Book) {
    return 'files/' + this.book_folder + '/' + book.filepath;
  }
  getBookCoverPath(book: Book) {
    if (
      book.picture.startsWith('http://') ||
      book.picture.startsWith('https://')
    )
      return book.picture;
    return 'files/' + this.book_cover_folder + '/' + book.picture;
  }
  getAuthorProfilePath(author: Author) {
    if (
      author.profilepicture.startsWith('http://') ||
      author.profilepicture.startsWith('https://')
    )
      return author.profilepicture;
    return (
      'files/' +
      this.author_profile_picture_folder +
      '/' +
      author.profilepicture
    );
  }
}
