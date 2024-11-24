import { Component, inject, OnInit } from '@angular/core';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import Book from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { catchError, Observable, of } from 'rxjs';
import { BookService } from '../../service/http/book.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { FeedComponent } from '../../components/feed/feed.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    BookCardComponent,
    CommonModule,
    SkeletonComponent,
    FontAwesomeModule,
    RouterLink,
    FeedComponent,
  ],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {
  newestBooks$!: Observable<Book[]>;
  popularBooks$!: Observable<Book[]>;

  faAngleRight = faAngleRight;

  bookService = inject(BookService);
  ngOnInit(): void {
    this.newestBooks$ = this.bookService
      .find(null, 15, 0, 'Newest', 0.0)
      .pipe(catchError((err) => of([])));
    this.popularBooks$ = this.bookService
      .find(null, 15, 0, 'Popular', 0.0)
      .pipe(catchError((err) => of([])));
  }
  book: Book = {
    id: '3213132321',
    name: 'Эрагон',
    translitname: 'eragon-12768341',
    description: 'описание',
    picture:
      'https://content.img-gorod.ru/pim/products/images/49/ea/018ed64b-6f97-7974-8afa-d2b5066649ea.jpg',
    filepath: 'file.epub',
    genre: { name: 'игры', translitname: 'igry-211342', bookcount: 0 },
    category: { name: 'игра', translitname: 'igra-12414', genres: [] },
    authors: [
      {
        name: 'Кристофер Паолини',
        about: '',
        profilepicture: '',
        id: '21',
        translitname: '2',
        rating: 0,
      },
    ],
    rating: 4.5,
    reviews: 6254,
    price: 559,
    published: 0,
    written: 2007,
    pages: 381,
    favourite: true,
  };
  book2: Book = {
    id: '3213132321',
    name: 'Эрагон',
    translitname: 'eragon-12768341',
    description: 'описание',
    picture: 'https://cdn.litres.ru/pub/c/cover_415/71269759.webp',
    filepath: 'file.epub',
    genre: { name: 'игры', translitname: 'igry-211342', bookcount: 0 },
    category: { name: 'игра', translitname: 'igra-12414', genres: [] },
    authors: [
      {
        name: 'Хьюберт Блейн Вольфшлегельштайнхаузенбергедорф-старший',
        about: '',
        profilepicture: '',
        id: '21',
        translitname: '2',
        rating: 0,
      },
    ],
    rating: 4.5,
    reviews: 6254,
    price: 559,
    published: 0,
    written: 2007,
    pages: 381,
    favourite: false,
  };
}
