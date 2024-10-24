import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
import Book from '../../models/book.model';
import { BookService } from '../../service/http/book.service';
import { CommonModule } from '@angular/common';
import { FileService } from '../../service/file.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './book-page.component.html',
  styles: ``,
})
export class BookPageComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  router = inject(Router);
  bookService = inject(BookService);
  fileService = inject(FileService);
  paramSubscription!: Subscription;
  bookModel$!: Observable<Book>;
  verticalOffset = 0;
  faBack = faArrowLeft;
  faStar = faStar;

  reviewsToString = (number: number) =>
    Math.abs(number) % 100 >= 5 && Math.abs(number) % 100 <= 20
      ? 'отзывов'
      : (Math.abs(number) % 100) % 10 === 1
      ? 'отзыв'
      : (Math.abs(number) % 100) % 10 >= 2 && (Math.abs(number) % 100) % 10 <= 4
      ? 'отзыва'
      : 'отзывов';
  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params) =>
      this.reloadBookModel(params['name'])
    );
  }
  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }

  reloadBookModel(modelName: string) {
    this.bookModel$ = this.bookService.getBook(modelName).pipe(
      catchError(() => {
        this.router.navigate(['/notfound'], { skipLocationChange: true });
        return of(null);
      }),
      map((value) => value as Book)
    );
  }
  @HostListener('document:scroll', ['$event'])
  onScroll(event: Event) {
    this.verticalOffset = window.scrollY;
  }
}
