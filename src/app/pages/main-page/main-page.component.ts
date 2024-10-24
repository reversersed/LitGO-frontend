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
    name: 'Эрагон',
    translitname: 'eragon-12768341',
    description: 'описание',
    picture:
      'https://content.img-gorod.ru/pim/products/images/49/ea/018ed64b-6f97-7974-8afa-d2b5066649ea.jpg?width=0&height=1200&fit=bounds',
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
  };
}
