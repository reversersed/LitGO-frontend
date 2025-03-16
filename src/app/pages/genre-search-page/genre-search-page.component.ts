import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize, Subscription, take } from 'rxjs';
import { BookService } from '../../service/http/book.service';
import Book from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleLeft,
  faArrowLeft,
  faClose,
  faFilter,
  faSpinner,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { CategoryService } from '../../service/http/category.service';
import Category from '../../models/category.model';
import { ScrollMutexService } from '../../service/scroll-mutex.service';
import { SwitchboxComponent } from '../../shared/switchbox/switchbox.component';
import { ToUpOverlayComponent } from '../../shared/to-up-overlay/to-up-overlay.component';

@Component({
  selector: 'app-genre-search-page',
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
  templateUrl: './genre-search-page.component.html',
})
export class GenreSearchPageComponent implements OnInit, OnDestroy {
  paramSubscription?: Subscription;
  querySubscription?: Subscription;
  route = inject(ActivatedRoute);
  router = inject(Router);
  bookService = inject(BookService);
  genreService = inject(CategoryService);
  scrollService = inject(ScrollMutexService);
  bookSubscription?: Subscription;
  currentPage = 0;
  limitPerPage = 30;
  Books?: Book[];
  routeParam?: string | null;
  fetchingPipeError = false;
  fetchingState = false;
  faLoader = faSpinner;
  faStar = faStar;
  faBack = faAngleLeft;
  faClose = faClose;
  faFilter = faFilter;
  faArrowBack = faArrowLeft;
  highRatingFilter = false;
  oldURL: string | null = null;
  selectedSort: 'Popular' | 'Newest' = 'Popular';
  currentCategory?: Category;
  genreSearch: string = '';
  genreExtended = false;
  filterMenuOpen = false;
  selfLocked = false;

  ngOnInit(): void {
    this.querySubscription = this.route.queryParamMap.subscribe((params) => {
      this.oldURL = params.get('o');
      if (this.oldURL == 'new') this.selectedSort = 'Newest';
    });
    this.paramSubscription = this.route.paramMap.subscribe((params) => {
      this.routeParam = params.get('name');
      this.updateBook();
    });
  }
  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.querySubscription?.unsubscribe();
  }
  fetchBooks() {
    if (!this.routeParam || this.fetchingPipeError) return;
    this.genreService.getTree(this.routeParam).subscribe({
      next: (value) => (this.currentCategory = value),
      error: () =>
        this.router.navigate(['/notfound'], {
          skipLocationChange: true,
        }),
    });
    this.fetchingState = true;
    this.bookService
      .getByGenre(
        this.routeParam,
        this.selectedSort,
        this.highRatingFilter,
        this.limitPerPage,
        this.currentPage
      )
      .pipe(finalize(() => (this.fetchingState = false)))
      .subscribe({
        next: (value) => {
          if (this.Books === undefined) this.Books = value;
          else this.Books?.push(...value);
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
  OnSortSelected(event: Event) {
    this.selectedSort = (event.target as HTMLSelectElement).value as
      | 'Popular'
      | 'Newest';

    this.updateBook();
  }

  changeRatingFilter() {
    this.highRatingFilter = !this.highRatingFilter;
    this.updateBook();
  }
  updateBook() {
    this.currentPage = 0;
    this.Books = undefined;
    this.fetchingPipeError = false;
    this.extendGenre(false);
    this.fetchBooks();
  }
  categorySlice() {
    return this.genreExtended
      ? this.currentCategory?.genres?.filter((v) =>
          v.name.toLowerCase().includes(this.genreSearch.toLowerCase())
            ? v
            : null
        )
      : this.currentCategory?.genres?.slice(0, 10);
  }
  genreSearchUpdate($event: Event) {
    this.genreSearch = ($event.target as HTMLInputElement).value;
  }
  extendGenre(status: boolean | undefined) {
    this.genreSearch = '';
    this.genreExtended = status ?? !this.genreExtended;
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
