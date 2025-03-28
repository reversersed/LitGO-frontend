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
import { FileService } from '../../service/http/file.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faStar,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as RegularHeart } from '@fortawesome/free-regular-svg-icons';
import { UserService } from '../../service/http/user.service';
import { SafeUrl } from '@angular/platform-browser';

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
  userService = inject(UserService);
  paramSubscription!: Subscription;
  bookModel$!: Observable<Book>;
  coverModel$!: Observable<SafeUrl>;
  faBack = faArrowLeft;
  faStar = faStar;
  faHeart = faHeart;
  faRegularHeart = RegularHeart;
  descriptionExpanded = false;
  currentUser = this.userService.CurrentUser();

  reviewsToString = (number: number) =>
    Math.abs(number) % 100 >= 5 && Math.abs(number) % 100 <= 20
      ? 'отзывов'
      : (Math.abs(number) % 100) % 10 === 1
      ? 'отзыв'
      : (Math.abs(number) % 100) % 10 >= 2 && (Math.abs(number) % 100) % 10 <= 4
      ? 'отзыва'
      : 'отзывов';
  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params) => {
      this.reloadBookModel(params['name']);
    });
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
      map((value) => {
        const v = value as Book;
        this.coverModel$ = this.fileService.getBookCover(v);
        return v;
      })
    );
  }

  onFavouritesSwitch() {}

  onBuyButtonClicked() {}
}
