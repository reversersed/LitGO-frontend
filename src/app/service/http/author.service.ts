import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GenericService from './generic.service';
import { first } from 'rxjs';
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
      .get<Author[]>(this.buildPath('suggest'), {
        headers: this.getHeaders(),
        params: new HttpParams().set('query', query),
      })
      .pipe(first());
  }
}
