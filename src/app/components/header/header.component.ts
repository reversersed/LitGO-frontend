import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  SimpleChanges,
} from '@angular/core';
import {
  NavigationSkipped,
  NavigationStart,
  Router,
  RouterLink,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAreaChart,
  faBars,
  faBook,
  faBookBookmark,
  faBookReader,
  faCartShopping,
  faClose,
  faHome,
  faNewspaper,
  faSpinner,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../shared/modal/modal.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { UserService } from '../../service/http/user.service';
import { InputComponent } from '../../shared/input/input.component';
import HttpError, { HttpCodes } from '../../models/httperror.model';
import { CheckboxComponent } from '../../shared/checkbox/checkbox.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { UserLoginModel } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { NotFoundPageComponent } from '../../pages/not-found-page/not-found-page.component';
import { ScrollMutexService } from '../../service/scroll-mutex.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    ModalComponent,
    SearchbarComponent,
    InputComponent,
    CheckboxComponent,
    CatalogueComponent,
    NotFoundPageComponent,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  userService = inject(UserService);
  scrollService = inject(ScrollMutexService);

  userState: Signal<UserLoginModel | null> = signal(null);
  faClose = faClose;
  faBook = faBook;
  faBars = faBars;
  faSpinner = faSpinner;
  logoutModalOpen = false;
  loginModalOpen = false;
  loginAttemptingState = false;
  logoutAttemptingState = false;
  catalogueOpen = false;
  sideMenuOpen = false;
  bottomMenuVisible = true;

  loginValue: string = '';
  loginError?: string;
  passwordValue: string = '';
  passwordError?: string;
  loginGeneralError?: string;
  rememberMe: boolean = false;

  bottomLinks: {
    links: { link: string; label: string; icon: IconDefinition }[];
    more?: { link: string; label: string; icon: IconDefinition }[];
  } = {
    links: [
      { link: 'new', label: 'Новинки', icon: faNewspaper },
      { link: 'popular', label: 'Популярное', icon: faAreaChart },
    ],
  };
  links: {
    link?: string;
    label: string;
    icon: IconDefinition;
    visible: 'All' | 'Auth' | 'Unauth';
    addClass?: string;
    action?: (() => boolean) | (() => void);
  }[] = [
    {
      link: '/',
      label: 'Главная',
      icon: faHome,
      visible: 'All',
      addClass: 'flex sm:hidden',
    },
    {
      link: '/',
      label: 'Отложенные',
      icon: faBookBookmark,
      visible: 'Auth',
    },
    {
      link: '/',
      label: 'Корзина',
      icon: faCartShopping,
      visible: 'Auth',
    },
    {
      link: '/',
      label: 'Мои книги',
      icon: faBookReader,
      visible: 'Auth',
    },
    {
      // Modal for large screens
      action: () => {
        this.loginError = undefined;
        this.loginValue = '';
        this.passwordError = undefined;
        this.passwordValue = '';
        this.rememberMe = false;
        this.loginModalOpen = !this.loginModalOpen;
        this.loginGeneralError = undefined;
      },
      addClass: 'hidden sm:flex',
      label: 'Войти',
      icon: faUser,
      visible: 'Unauth',
    },
    {
      // Page for small screens
      link: '/login',
      addClass: 'flex sm:hidden',
      label: 'Войти',
      icon: faUser,
      visible: 'Unauth',
    },
    {
      action: () => (this.logoutModalOpen = !this.logoutModalOpen),
      label: 'Выйти',
      icon: faUser,
      visible: 'Auth',
    },
  ];
  eventSubscribe?: Subscription;
  ngOnInit(): void {
    this.userState = this.userService.CurrentUser();
    this.eventSubscribe = this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationStart ||
        event instanceof NavigationSkipped
      ) {
        this.logoutModalOpen = false;
        this.loginModalOpen = false;
        this.loginAttemptingState = false;
        this.logoutAttemptingState = false;
        this.catalogueOpen = false;
        this.sideMenuOpen = false;

        this.loginValue = '';
        this.loginError = undefined;
        this.passwordValue = '';
        this.passwordError = undefined;
        this.loginGeneralError = undefined;
        this.rememberMe = false;

        this.scrollService.Unlock();
      }
    });
  }
  ngOnDestroy(): void {
    this.scrollService.Unlock();
    this.eventSubscribe?.unsubscribe();
  }
  logoutUser() {
    this.logoutAttemptingState = true;
    this.userService.LogoutUser().subscribe(() => {
      this.logoutAttemptingState = false;
      this.logoutModalOpen = false;
    });
  }
  switchCatalogue() {
    this.catalogueOpen = !this.catalogueOpen;
    if (this.catalogueOpen) {
      this.scrollService.Lock();
    } else {
      this.scrollService.Unlock();
    }
  }
  loginUser() {
    this.loginGeneralError = undefined;
    if (this.loginValue.length == 0) {
      this.loginError = 'Укажите логин или почту';
    }
    if (this.passwordValue.length == 0) {
      this.passwordError = 'Укажите пароль';
    }
    if (
      (this.passwordError && this.passwordError.length > 0) ||
      (this.loginError && this.loginError.length > 0)
    )
      return;
    const timer = setTimeout(() => (this.loginAttemptingState = true), 100);
    this.loginError = undefined;
    this.passwordError = undefined;
    this.userService
      .Login(this.loginValue, this.passwordValue, this.rememberMe)
      .subscribe({
        next: () => {
          clearTimeout(timer);
          this.loginAttemptingState = false;
          this.loginModalOpen = false;
        },
        error: (err) => {
          if (
            (err as HttpError).code == HttpCodes.Internal ||
            (err as HttpError).code == HttpCodes.Unavailable
          ) {
            this.loginGeneralError = 'Сервис временно недоступен';
          } else {
            this.loginGeneralError = 'Неправильный логин или пароль';
            this.loginError = '';
            this.passwordError = '';
          }
          clearTimeout(timer);
          this.loginAttemptingState = false;
        },
      });
  }
  lastScrollPosition = 0;
  @HostListener('document:scroll', ['$event'])
  onScroll(event: Event) {
    this.bottomMenuVisible =
      this.lastScrollPosition - window.scrollY > 0 || window.scrollY === 0;

    this.lastScrollPosition = window.scrollY;
  }
}
