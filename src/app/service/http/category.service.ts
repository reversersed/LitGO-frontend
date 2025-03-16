import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GenericService from './generic.service';
import { catchError, first, of } from 'rxjs';
import Category from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends GenericService {
  constructor(private http: HttpClient) {
    super('genres');
  }

  public getAll() {
    return this.http.get<Category[]>(this.buildPath('all'), {}).pipe(
      first(),
      catchError(() => of([]))
    );
  }
  public getTree(query: string) {
    return this.http
      .get<Category>(this.buildPath('tree'), {
        params: new HttpParams().set('query', query),
      })
      .pipe(first());
  }
}
