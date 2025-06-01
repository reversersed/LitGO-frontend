import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import Book from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { FileService } from '../../service/http/file.service';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faStar,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Observable } from 'rxjs';
import { UserService } from '../../service/http/user.service';
import { SafeUrl } from '@angular/platform-browser';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule, SkeletonComponent],
  templateUrl: './book-card.component.html',
})
export class BookCardComponent {
  @Input('model') bookModel!: Book;
  @Input('align') alignMode: 'auto' | 'row' | 'col' = 'auto';
  @Input('price') showPrice: boolean = true;
  @Input('favourite') showFavourite: boolean = true;
  @Input('reader') showReaderLink: boolean = false;

  fileService = inject(FileService);
  faStar = faStar;
  faEmptyHeart = faHeart;
  faSolidHeart = faHeartSolid;
  cover$ = computed(() => this.fileService.getBookCover(this.bookModel));

  user = inject(UserService).CurrentUser();

  changeFavouriteStatus() {
    this.bookModel.favourite = !this.bookModel.favourite;
  }
}
