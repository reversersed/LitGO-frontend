import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import Category from '../../models/category.model';
import { Observable } from 'rxjs';
import { CategoryService } from '../../service/http/category.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';

@Component({
  selector: 'app-genre-observable-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule, SkeletonComponent],
  templateUrl: './genre-observable-page.component.html',
})
export class GenreObservablePageComponent implements OnInit {
  genres$!: Observable<Category[]>;
  categoryService = inject(CategoryService);
  faAngleRight = faAngleRight;
  ngOnInit(): void {
    this.genres$ = this.categoryService.getAll();
  }
}
