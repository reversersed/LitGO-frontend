import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Author from '../../models/author.model';
import {
  catchError,
  finalize,
  first,
  map,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { AuthorService } from '../../service/http/author.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToUpOverlayComponent } from '../../shared/to-up-overlay/to-up-overlay.component';
import { FileService } from '../../service/http/file.service';
import { BookService } from '../../service/http/book.service';
import Book from '../../models/book.model';
import { BookCardComponent } from "../../components/book-card/book-card.component";

@Component({
  selector: 'app-author-page',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    SkeletonComponent,
    ToUpOverlayComponent,
    RouterLink,
    BookCardComponent
],
  templateUrl: './author-page.component.html',
})
export class AuthorPageComponent implements OnInit {
  faBack = faArrowLeft;

  authorModel$!: Observable<Author>;
  coverModel$!: Observable<SafeUrl>;
  noImage = false;
  currentAuthor?: Author;

  authorService = inject(AuthorService);
  bookService = inject(BookService);
  fileService = inject(FileService);
  router = inject(Router);
  paramSubscription?: Subscription;
  route = inject(ActivatedRoute);
  fetchingPipeError: boolean = false;
  fetchingState: boolean = false;
  limitPerPage = 20;
  currentPage = 0;
  Books: Book[] = [];

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params) => {
      this.authorModel$ = this.authorService.getAuthor(params['name']).pipe(
        first(),
        catchError(() => {
          this.router.navigate(['/notfound'], { skipLocationChange: true });
          return of(null as unknown as Author);
        }),
        map((value) => {
          this.coverModel$ = this.fileService.getAuthorProfile(value).pipe(
            first(),
            catchError((e, v) => {
              this.noImage = true;
              return v;
            })
          );
          this.currentAuthor = value;
          this.fetchBooks();
          return value;
        })
      );
    });
  }
  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }
  fetchBooks() {
    if (this.fetchingPipeError || !this.currentAuthor) return;

    this.fetchingState = true;
    this.bookService
      .getBookByAuthor(
        this.currentAuthor?.id,
        this.limitPerPage,
        this.currentPage
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
}
