import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/http/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FileService } from '../../service/http/file.service';
import { BookService } from '../../service/http/book.service';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
import Book from '../../models/book.model';
import { ReaderComponent } from '../../components/reader/reader.component';
import {
  faAngleUp,
  faBars,
  faClose,
  faRotate,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavItem } from 'epubjs';

@Component({
  selector: 'app-reader-page',
  standalone: true,
  imports: [ReaderComponent, CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './reader-page.component.html',
})
export class ReaderPageComponent implements OnInit, OnDestroy {
  @ViewChild(ReaderComponent) reader?: ReaderComponent;

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
  faExpand = faAngleUp;
  faDefault = faRotate;
  selectedChapter: NavItem | undefined;
  bookChapters?: NavItem[];
  readerStyle?: any;

  currentExpandedSection?: string;
  settingsExpanded = false;
  styleSetting = [
    {
      name: 'Шрифт',
      topSection: '*',
      section: 'font-family',
      values: [
        {
          label: 'Times New Roman',
          value: 'Times New Roman !important',
        },
        {
          label: 'LiberEmb',
          value: 'LiberEmb !important',
        },
        {
          label: 'Lucida Console',
          value: '"Lucida Console" !important',
        },
        {
          label: 'Arial',
          value: 'Arial !important',
        },
        {
          label: 'Verdana',
          value: 'Verdana !important',
        },
        {
          label: 'Courier',
          value: 'Courier !important',
        },
        {
          label: 'FreeMono',
          value: 'FreeMono !important',
        },
      ],
    },
    {
      name: 'Размер текста',
      topSection: 'customSettings',
      section: 'font',
      values: [
        {
          label: 'Крошечный',
          value: '10px',
        },
        {
          label: 'Очень маленький',
          value: '12px',
        },
        {
          label: 'Маленький',
          value: '14px',
        },
        {
          label: 'Обычный',
          value: '16px',
        },
        {
          label: 'Большой',
          value: '18px',
        },
        {
          label: 'Очень большой',
          value: '20px',
        },
        {
          label: 'Огромный',
          value: '22px',
        },
      ],
    },
    {
      name: 'Интервал',
      topSection: 'body',
      section: 'line-height',
      values: [
        {
          label: '1',
          value: '1',
        },
        {
          label: '1.15',
          value: '1.15',
        },
        {
          label: '1.25',
          value: '1.25',
        },
        {
          label: '1.5',
          value: '1.5',
        },
        {
          label: '1.75',
          value: '1.75',
        },
        {
          label: '2',
          value: '2',
        },
        {
          label: '2.25',
          value: '2.25',
        },
        {
          label: '2.5',
          value: '2.5',
        },
        {
          label: '2.75',
          value: '2.75',
        },
        {
          label: '3',
          value: '3',
        },
      ],
    },
  ];
  isLoading = true;

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
  onBookContentCreated(content: NavItem[]) {
    this.bookChapters = content;
  }
}
