import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faBook,
  faBookBookmark,
  faBookReader,
  faCartShopping,
  faClose,
  faHome,
  faSpinner,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../shared/modal/modal.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { UserService } from '../../service/http/user.service';
import { InputComponent } from '../../shared/input/input.component';
import HttpError from '../../models/httperror.model';
import { CheckboxComponent } from '../../shared/checkbox/checkbox.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { UserLoginModel } from '../../models/user.model';

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
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  userService = inject(UserService);

  userState: Signal<UserLoginModel | null> = signal(null);
  faClose = faClose;
  faBook = faBook;
  faBars = faBars;
  logoutModalOpen = false;
  loginModalOpen = false;
  loginAttemptingState = false;
  logoutAttemptingState = false;
  faSpinner = faSpinner;
  catalogueOpen = false;
  sideMenuOpen = false;

  loginValue: string = '';
  loginError?: string;
  passwordValue: string = '';
  passwordError?: string;
  loginGeneralError?: string;
  rememberMe: boolean = false;

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
  ngOnInit(): void {
    this.userState = this.userService.CurrentUser();
  }
  logoutUser() {
    this.logoutAttemptingState = true;
    this.userService.LogoutUser().subscribe(() => {
      this.logoutAttemptingState = false;
      this.logoutModalOpen = false;
    });
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
          if ((err as HttpError).code == 500) {
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
}
