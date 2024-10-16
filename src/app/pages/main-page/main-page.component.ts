import { Component } from '@angular/core';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import Book from '../../models/book.model';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {
  book: Book = {
    id: '3213132321',
    name: 'Книга о книгопечатании',
    translitname: 'kniga-o-kniga-23321',
    description: 'описание',
    picture: 'https://cdn.litres.ru/pub/c/cover_415/71141323.webp',
    filepath: 'file.epub',
    genre: { name: 'игры', translitName: 'igry-211342', bookCount: 0 },
    category: { name: 'игра', translitName: 'igra-12414', genres: [] },
    authors: [
      {
        name: 'Филлип Киркоров',
        about: '',
        profilepicture: '',
        id: '21',
        translitname: '2',
        rating: 0,
      },
      {
        name: 'Джастин Бибер',
        about: '',
        profilepicture: '',
        id: '2',
        translitname: '2',
        rating: 0,
      },
    ],
    rating: 4.5,
    reviews: 6254,
    price: 559,
  };
}
