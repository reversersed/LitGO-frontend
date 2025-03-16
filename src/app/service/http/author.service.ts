import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GenericService from './generic.service';
import { catchError, first, of } from 'rxjs';
import Author from '../../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService extends GenericService {
  constructor(private http: HttpClient) {
    super('authors');
  }

  getSuggestion(query: string) {
    return this.http
      .get<Author[]>(this.buildPath('search'), {
        params: new HttpParams().set('query', query).set('limit', 2),
      })
      .pipe(
        first(),
        catchError(() => of([]))
      );
  }
}
