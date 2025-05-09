import {
  Directive,
  OnInit,
  Input,
  ElementRef,
  SecurityContext,
} from '@angular/core';
import { take } from 'rxjs';
import { FileService } from '../../service/http/file.service';
import Author from '../../models/author.model';
import Book from '../../models/book.model';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[lazyCover]',
  standalone: true,
})
export class LazyCoverDirective implements OnInit {
  @Input({ required: true }) input!: Book | Author;

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    if ((this.input as Book).picture !== undefined)
      this.fileService
        .getBookCover(this.input as Book)
        .pipe(take(1))
        .subscribe({
          next: (src) => {
            this.el.nativeElement.src =
              this.sanitizer.sanitize(SecurityContext.URL, src) || '';
          },
          error: () => {
            this.el.nativeElement.src = '/no-image.png';
          },
        });
    else if ((this.input as Author).profilepicture !== undefined)
      this.fileService
        .getAuthorProfile(this.input as Author)
        .pipe(take(1))
        .subscribe({
          next: (src) => {
            this.el.nativeElement.src =
              this.sanitizer.sanitize(SecurityContext.URL, src) || '';
          },
          error: () => {
            this.el.nativeElement.src = '/no-image.png';
          },
        });
  }
}
