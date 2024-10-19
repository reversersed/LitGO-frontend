import { Injectable } from '@angular/core';
import GenericService from './generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import Book from '../../models/book.model';
import { catchError, first, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService extends GenericService {
  constructor(private http: HttpClient) {
    super('books');
  }
  getBook(query: string) {
    return this.http
      .get<Book>(this.buildPath(), {
        headers: this.getHeaders(),
        params: new HttpParams().set('query', query),
      })
      .pipe(first());
  }
  getSuggestion(query: string) {
    return this.http
      .get<Book[]>(this.buildPath('suggest'), {
        headers: this.getHeaders(),
        params: new HttpParams().set('query', query).set('limit', 2),
      })
      .pipe(
        first(),
        catchError(() => of([]))
      );
  }
}
