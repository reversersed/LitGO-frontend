import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../service/http/book.service';
import Book from '../../models/book.model';
import { Observable } from 'rxjs';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';

@Component({
  selector: 'app-my-books-page',
  standalone: true,
  imports: [CommonModule, BookCardComponent, SkeletonComponent],
  templateUrl: './my-books-page.component.html',
})
export class MyBooksPageComponent implements OnInit {
  bookService = inject(BookService);
  books$!: Observable<Book[]>;

  ngOnInit(): void {
    this.books$ = this.bookService.find(null, 2, 0, 'Newest', 0);
  }
}
