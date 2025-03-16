import { inject, Injectable } from '@angular/core';
import Book from '../../models/book.model';
import { catchError, first, map, Observable, of } from 'rxjs';
import {
  BookClient,
  BooksFindBookResponse,
  BooksGetBookByGenreResponse,
} from './gen/generated';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiClient = inject(BookClient);

  getBook(query: string): Observable<Book> {
    return this.apiClient.getBook(query).pipe(
      first(),
      map((value) => value.book as unknown as Book)
    );
  }
  getSuggestion(query: string): Observable<Book[]> {
    return this.apiClient.findBook(query, 2, 0, 0, undefined).pipe(
      first(),
      map((value) => {
        if (value instanceof BooksFindBookResponse)
          return value.books as unknown as Book[];
        return value;
      })
    );
  }
  find(
    query: string | null,
    limit: number,
    page: number,
    sort: 'Popular' | 'Newest',
    rating: number
  ): Observable<Book[]> {
    return this.apiClient.findBook(query, limit, page, rating, sort).pipe(
      first(),
      catchError(() => of([] as Book[])),
      map((value) => {
        if (value instanceof BooksFindBookResponse)
          return value.books as unknown as Book[];
        return value;
      })
    );
  }
  getByGenre(
    query: string,
    sorttype: 'Newest' | 'Popular',
    onlyhighrating: boolean,
    limit: number,
    page: number
  ) {
    return this.apiClient
      .getBookByGenre(query, sorttype, onlyhighrating, limit, page)
      .pipe(
        first(),
        map((value) => {
          if (value instanceof BooksGetBookByGenreResponse)
            return value.books as unknown as Book[];
          return value;
        })
      );
  }
}
