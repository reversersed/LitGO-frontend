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
    console.log(this.input instanceof Book);
    if ((this.input as Book).picture !== undefined)
      this.fileService
        .getBookCover(this.input as Book)
        .pipe(take(1))
        .subscribe((src) => {
          this.el.nativeElement.src =
            this.sanitizer.sanitize(SecurityContext.URL, src) || '';
        });
  }
}
