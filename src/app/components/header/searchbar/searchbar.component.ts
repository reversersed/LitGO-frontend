import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Book from '../../../models/book.model';
import Author from '../../../models/author.model';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterLink],
  templateUrl: './searchbar.component.html',
})
export class SearchbarComponent {
  constructor(private location: Location) {}
  searchRedirect() {
    this.location.go('search', 'query=' + this.query);
  }
  async searchsuggestionBooks(event: Event) {
    this.query = (event.target as HTMLInputElement).value;
  }
  query: string = '';
  suggestionOpen = false;
  faSearch = faSearch;
  suggestionBooks: Book[] = [];
  suggestionAuthors: Author[] = [];
}
