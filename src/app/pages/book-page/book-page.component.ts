import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  catchError,
  finalize,
  first,
  map,
  Observable,
  of,
  Subscription,
} from 'rxjs';
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
import {
  faThumbsDown,
  faThumbsUp,
  faHeart as RegularHeart,
} from '@fortawesome/free-regular-svg-icons';
import { UserService } from '../../service/http/user.service';
import { SafeUrl } from '@angular/platform-browser';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { ReviewService } from '../../service/http/review.service';
import Review from '../../models/review.model';
import { ToUpOverlayComponent } from '../../shared/to-up-overlay/to-up-overlay.component';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule,
    SkeletonComponent,
    ToUpOverlayComponent,
  ],
  templateUrl: './book-page.component.html',
})
export class BookPageComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  router = inject(Router);
  bookService = inject(BookService);
  fileService = inject(FileService);
  userService = inject(UserService);
  reviewService = inject(ReviewService);
  paramSubscription!: Subscription;
  currentBook?: Book;
  bookModel$!: Observable<Book>;
  coverModel$!: Observable<SafeUrl>;
  currentUserReview$!: Observable<Review | undefined>;
  fetchingState = false;
  allReviewLoaded = false;
  reviews!: Review[];
  faBack = faArrowLeft;
  faStar = faStar;
  faHeart = faHeart;
  faLike = faThumbsUp;
  faDislike = faThumbsDown;
  faRegularHeart = RegularHeart;
  descriptionExpanded = false;
  currentUser = this.userService.CurrentUser();
  userAnswer: string = '';
  currentAnswerExpanded?: string;
  expandedReplies?: string;
  userReview: string = '';
  userRating: number = 1;
  selectedReviewSort: 'new' | 'old' = 'new';
  reviewWritingExpanded = false;

  userAnswerInput(target: EventTarget | null) {
    this.userAnswer = (target as HTMLInputElement).value;
  }
  userReviewInput(target: EventTarget | null) {
    this.userReview = (target as HTMLInputElement).value;
  }

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

  loadNextReviews(): void {
    if (!this.currentBook || this.fetchingState || this.allReviewLoaded) return;
    this.fetchingState = true;
    this.reviewService
      .getBookReviews(
        this.currentBook.id,
        15,
        this.reviews.length,
        this.selectedReviewSort
      )
      .pipe(
        finalize(() => (this.fetchingState = false)),
        first(),
        catchError((e) => of([] as Review[])),
        map((a) => {
          if (a.length === 0) this.allReviewLoaded = true;
          this.reviews.push(...a);
        })
      )
      .subscribe();
  }
  reloadBookModel(modelName: string) {
    this.bookModel$ = this.bookService.getBook(modelName).pipe(
      catchError(() => {
        this.router.navigate(['/notfound'], { skipLocationChange: true });
        return of(null);
      }),
      map((value) => {
        this.currentBook = value as Book;
        this.coverModel$ = this.fileService.getBookCover(this.currentBook);
        if (!this.reviews) {
          this.reviews = [];
          this.fetchingState = false;
          this.loadNextReviews();
        }
        this.currentUserReview$ = this.reviewService.getCurrentUserBookReview(
          this.currentBook.id
        );
        return this.currentBook;
      })
    );
  }
  deleteReview(reviewId: string) {
    this.reviewService
      .deleteReview(this.currentBook?.id ?? '', reviewId)
      .pipe(first())
      .subscribe();
  }
  sendReviewReply(reviewId: string) {
    this.reviewService
      .sendReviewReply(this.currentBook?.id ?? '', reviewId, this.userAnswer)
      .pipe(first())
      .subscribe((v) => {
        this.userAnswer = '';
        this.currentAnswerExpanded = undefined;
        this.reviews = this.reviews.map((i) => (i.id === v.id ? v : i));
      });
  }

  createReview() {
    if (!this.currentBook) return;

    this.reviewService
      .createReview(this.currentBook?.id, this.userReview, this.userRating)
      .pipe(first())
      .subscribe((a) => {
        if (this.currentBook)
          this.reloadBookModel(this.currentBook.translitname);
      });
  }

  OnSortSelected(event: Event) {
    this.reviews = [];
    this.fetchingState = false;
    this.allReviewLoaded = false;
    this.selectedReviewSort = (event.target as HTMLSelectElement).value as
      | 'new'
      | 'old';

    this.loadNextReviews();
  }

  onFavouritesSwitch() {}

  onBuyButtonClicked() {}

  @HostListener('window:scroll', [])
  onScroll() {
    if (!this.currentBook || this.fetchingState || this.allReviewLoaded) return;
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      window.innerHeight;
    if (pos >= (3 * document.documentElement.scrollHeight) / 4) {
      this.loadNextReviews();
    }
  }
}
