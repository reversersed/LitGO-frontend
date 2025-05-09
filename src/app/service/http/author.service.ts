import { inject, Injectable } from '@angular/core';
import { catchError, first, map, Observable, of } from 'rxjs';
import { AuthorClient, AuthorsGetAuthorsResponse } from './gen/generated';
import Author from '../../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiClient = inject(AuthorClient);

  getSuggestion(query: string): Observable<Author[]> {
    return this.apiClient.findAuthors(query, 2, 0, 0).pipe(
      first(),
      catchError(() => of([] as Author[])),
      map((value) => {
        if (value instanceof AuthorsGetAuthorsResponse)
          return value.authors as Author[];
        return value;
      })
    );
  }

  getAuthor(name: string): Observable<Author> {
    return this.apiClient.getAuthors(undefined, [name]).pipe(
      map((v) => {
        if (v.authors) return v.authors[0] as Author;
        return {} as Author;
      })
    );
  }
}
