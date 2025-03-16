import { inject, Injectable } from '@angular/core';
import { catchError, first, map, Observable, of } from 'rxjs';
import Category from '../../models/category.model';
import { GenreClient, GenresGetAllResponse } from './gen/generated';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiClient = inject(GenreClient);

  public getAll(): Observable<Category[]> {
    return this.apiClient.getAll().pipe(
      first(),
      catchError(() => of([] as Category[])),
      map((value) => {
        if (value instanceof GenresGetAllResponse)
          return value.categories as Category[];
        return value;
      })
    );
  }
  public getTree(query: string): Observable<Category> {
    return this.apiClient.getTree(query).pipe(
      first(),
      map((value) => value.category as unknown as Category)
    );
  }
}
