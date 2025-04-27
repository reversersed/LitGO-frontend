import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Book from '../../../models/book.model';
import Author from '../../../models/author.model';
import { AuthorService } from '../../../service/http/author.service';
import { BookService } from '../../../service/http/book.service';
import { catchError, combineLatest, map, Observable, of } from 'rxjs';
import { FileService } from '../../../service/http/file.service';
import { LazyCoverDirective } from '../../../shared/directives/cover.lazy';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontAwesomeModule, CommonModule, RouterLink, LazyCoverDirective],
  templateUrl: './searchbar.component.html',
})
export class SearchbarComponent {
  trackBook = (idx: number, book: Book) => book.id;
  trackAuthor = (idx: number, author: Author) => author.id;

  constructor(private location: Location) {}
  searchRedirect() {
    this.location.go('search', 'query=' + this.query);
  }
  searchsuggestionBooks(event: Event) {
    clearTimeout(this.searchTimer);
    this.query = (event.target as HTMLInputElement).value;

    if (this.query.length > 0) {
      this.searchTimer = setTimeout(() => {
        let author$ = this.authorService.getSuggestion(this.query);
        let book$ = this.bookService.getSuggestion(this.query);

        this.data$ = combineLatest([
          book$.pipe(catchError(() => of([]))),
          author$.pipe(catchError(() => of([]))),
        ]).pipe(
          map(([book, author]) => ({
            book,
            author,
          }))
        );
      }, 500);
    }
  }
  searchTimer?: NodeJS.Timeout;
  data$!: Observable<{
    book: Book[];
    author: Author[];
  }>;
  fileService = inject(FileService);
  authorService = inject(AuthorService);
  bookService = inject(BookService);
  query: string = '';
  suggestionOpen = false;
  faSearch = faSearch;
}
