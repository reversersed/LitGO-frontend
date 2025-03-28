import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/http/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FileService } from '../../service/http/file.service';
import { BookService } from '../../service/http/book.service';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
import Book from '../../models/book.model';
import { ReaderComponent } from '../../components/reader/reader.component';
import { faBars, faClose, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-reader-page',
  standalone: true,
  imports: [ReaderComponent, CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './reader-page.component.html',
})
export class ReaderPageComponent implements OnInit, OnDestroy {
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  bookService = inject(BookService);
  fileService = inject(FileService);

  currentUser = this.userService.CurrentUser();

  currentBook$?: Observable<Book | undefined>;
  currentFile$?: Observable<ArrayBuffer>;
  allowUserReading = computed(() =>
    this.currentUser() === null ? false : true
  );
  routeSubscription?: Subscription;
  oldRoute?: string;
  isMenuOpen = false;
  faMenu = faBars;
  faClose = faClose;
  faSpinner = faSpinner;

  ngOnInit() {
    this.userService.Auth().subscribe();

    this.routeSubscription = this.route.queryParams.subscribe({
      next: (params) => {
        if (params['id'] === undefined || params['id'] === null)
          this.router.navigate(['/notfound']);
        if (this.currentBook$ === undefined)
          this.currentBook$ = this.bookService.getBook(params['id']).pipe(
            catchError(() => {
              this.router.navigate(['/notfound']);
              return of(undefined);
            }),
            map((a) => {
              if (a !== undefined)
                this.currentFile$ = this.fileService.getBookFile(a);
              return a;
            })
          );
        if (this.oldRoute === undefined)
          this.oldRoute = params['old'] ?? undefined;
      },
    });
  }
  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }
}
