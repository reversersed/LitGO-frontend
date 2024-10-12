import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GenericService from './generic.service';
import { first } from 'rxjs';
import Category from '../../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends GenericService {
  constructor(private http: HttpClient) {
    super('genres');
  }

  public getAll() {
    return this.http
      .get<Category[]>(this.buildPath('all'), { headers: this.getHeaders() })
      .pipe(first());
  }
}
