import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import Category from '../../../models/category.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { first, Observable } from 'rxjs';
import { CategoryService } from '../../../service/http/category.service';
import { SkeletonComponent } from '../../skeleton/skeleton.component';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink, SkeletonComponent],
  templateUrl: './catalogue.component.html',
})
export class CatalogueComponent implements OnInit {
  currentCategory: Category | null = null;
  CategoryList$: Observable<Category[]> | undefined;
  totalGenres: number = 0;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  CategoryService = inject(CategoryService);

  ngOnInit(): void {
    this.CategoryList$ = this.CategoryService.getAll();
    this.CategoryList$.pipe(first()).subscribe((c) =>
      c.forEach((g) => (this.totalGenres += g.genres?.length ?? 0))
    );
  }
  getBookNoun = (number: number) =>
    Math.abs(number) % 100 >= 5 && Math.abs(number) % 100 <= 20
      ? 'книг'
      : (Math.abs(number) % 100) % 10 === 1
      ? 'книга'
      : (Math.abs(number) % 100) % 10 >= 2 && (Math.abs(number) % 100) % 10 <= 4
      ? 'книги'
      : 'книг';
  getGenreNoun = (number: number) =>
    Math.abs(number) % 100 >= 5 && Math.abs(number) % 100 <= 20
      ? 'жанров'
      : (Math.abs(number) % 100) % 10 === 1
      ? 'жанр'
      : (Math.abs(number) % 100) % 10 >= 2 && (Math.abs(number) % 100) % 10 <= 4
      ? 'жанра'
      : 'жанров';
}
