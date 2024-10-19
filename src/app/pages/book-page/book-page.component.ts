import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
import Book from '../../models/book.model';
import { BookService } from '../../service/http/book.service';
import { CommonModule } from '@angular/common';
import { FileService } from '../../service/file.service';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [CommonModule],
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
}
