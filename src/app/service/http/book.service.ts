import { Injectable } from '@angular/core';
import GenericService from './generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import Book from '../../models/book.model';
import { catchError, first, of } from 'rxjs';
import { only } from 'node:test';

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
      .get<Book[]>(this.buildPath('search'), {
        headers: this.getHeaders(),
        params: new HttpParams().set('query', query).set('limit', 2),
      })
      .pipe(
        first(),
        catchError(() => of([]))
      );
  }
  find(
    query: string | null,
    limit: number,
    page: number,
    sort: 'Popular' | 'Newest',
    rating: number
  ) {
    let params = new HttpParams()
      .set('limit', limit)
      .set('page', page)
      .set('sorttype', sort)
      .set('rating', rating);
    if (query) {
      params.append('query', query);
    }

    return this.http
      .get<Book[]>(this.buildPath('search'), {
        headers: this.getHeaders(),
        params: params,
      })
      .pipe(first());
  }
  getByGenre(
    query: string,
    sorttype: 'Newest' | 'Popular',
    onlyhighrating: boolean,
    limit: number,
    page: number
  ) {
    return this.http
      .get<Book[]>(this.buildPath('genre/' + query), {
        headers: this.getHeaders(),
        params: new HttpParams()
          .set('sorttype', sorttype)
          .set('onlyhighrating', onlyhighrating)
          .set('limit', limit)
          .set('page', page),
      })
      .pipe(first());
  }
}
