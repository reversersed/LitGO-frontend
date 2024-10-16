import {
  Component,
  HostListener,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import Book from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { FileService } from '../../service/file.service';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './book-card.component.html',
})
export class BookCardComponent {
  @Input('model') bookModel!: Book;
  @Input('animation') animationStyle: 'none' | 'scale' = 'none';
  @Input('align') alignMode: 'auto' | 'row' | 'col' = 'auto';

  fileService = inject(FileService);
  faStar = faStar;
}
