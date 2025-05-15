import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  faSpinner,
  faAngleLeft,
  faClose,
  faFilter,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription, finalize } from 'rxjs';
import Book from '../../models/book.model';
import Category from '../../models/category.model';
import { BookService } from '../../service/http/book.service';
import { CategoryService } from '../../service/http/category.service';
import { ScrollMutexService } from '../../service/scroll-mutex.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { SwitchboxComponent } from '../../shared/switchbox/switchbox.component';
import { ToUpOverlayComponent } from '../../shared/to-up-overlay/to-up-overlay.component';

@Component({
  selector: 'app-popular-books-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BookCardComponent,
    FontAwesomeModule,
    SkeletonComponent,
    SwitchboxComponent,
    ToUpOverlayComponent,
  ],
  templateUrl: './popular-books-page.component.html',
  styles: ``,
})
export class PopularBooksPageComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  bookService = inject(BookService);
  genreService = inject(CategoryService);
  scrollService = inject(ScrollMutexService);
  bookSubscription?: Subscription;
  currentPage = 0;
  limitPerPage = 30;
  Books?: Book[];
  fetchingPipeError = false;
  fetchingState = false;
  faLoader = faSpinner;
  faBack = faAngleLeft;
  faClose = faClose;
  faFilter = faFilter;
  faArrowBack = faArrowLeft;
  highRatingFilter = false;
  currentCategory?: Category[];
  genreExtended = false;
  filterMenuOpen = false;
  selfLocked = false;

  ngOnInit(): void {
    this.updateBook();
  }
  fetchBooks() {
    if (this.fetchingPipeError) return;

    this.genreService.getAll().subscribe({
      next: (value) => (this.currentCategory = value),
      error: () => (this.currentCategory = []),
    });
    this.fetchingState = true;
    this.bookService
      .find(
        null,
        this.limitPerPage,
        this.currentPage,
        'Popular',
        this.highRatingFilter ? 4.0 : 0.0
      )
      .pipe(finalize(() => (this.fetchingState = false)))
      .subscribe({
        next: (value) => {
          if (this.Books === undefined) this.Books = value;
          else this.Books?.push(...value);
          if (value.length === 0) this.fetchingPipeError = true;
        },
        error: () => {
          this.fetchingPipeError = true;
        },
      });
  }
  @HostListener('window:scroll', [])
  onScroll() {
    if (this.fetchingPipeError || this.fetchingState) return;
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      window.innerHeight;
    if (pos >= (3 * document.documentElement.scrollHeight) / 4) {
      this.currentPage += 1;
      this.fetchBooks();
    }
  }

  changeRatingFilter() {
    this.highRatingFilter = !this.highRatingFilter;
    this.updateBook();
  }
  updateBook() {
    this.currentPage = 0;
    this.Books = undefined;
    this.fetchingPipeError = false;
    this.fetchBooks();
  }
  changeFilterState() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.filterMenuOpen = !this.filterMenuOpen;
    if (this.filterMenuOpen && !this.scrollService.isLocked()) {
      this.selfLocked = true;
      this.scrollService.Lock();
    } else if (!this.filterMenuOpen && this.selfLocked) {
      this.scrollService.Unlock();
      this.selfLocked = false;
    }
  }
}
