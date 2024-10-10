import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
} from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../shared/modal/modal.component';
import { SearchbarComponent } from "./searchbar/searchbar.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink, ModalComponent, SearchbarComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
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

  userState = { isAuthorized: true };
  links = [
    {
      link: '/',
      label: 'Главная',
      icon: faHome,
      visible: true,
      addClass: 'flex sm:hidden',
    },
    {
      link: '/',
      label: 'Отложенные',
      icon: faBookBookmark,
      visible: this.userState?.isAuthorized,
    },
    {
      link: '/',
      label: 'Корзина',
      icon: faCartShopping,
      visible: this.userState?.isAuthorized,
    },
    {
      link: '/',
      label: 'Мои книги',
      icon: faBookReader,
      visible: this.userState?.isAuthorized,
    },
    {
      // Modal for large screens
      action: () => (this.loginModalOpen = !this.loginModalOpen),
      addClass: 'hidden sm:flex',
      label: 'Войти',
      icon: faUser,
      visible: !this.userState?.isAuthorized,
    },
    {
      // Page for small screens
      link: '/login',
      addClass: 'flex sm:hidden',
      label: 'Войти',
      icon: faUser,
      visible: !this.userState?.isAuthorized,
    },
    {
      action: () => (this.logoutModalOpen = !this.logoutModalOpen),
      label: 'Выйти',
      icon: faUser,
      visible: this.userState?.isAuthorized,
    },
  ];

  logoutUser() {
    throw new Error('Method not implemented.');
  }
}
