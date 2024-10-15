import { Routes } from '@angular/router';
import { UnauthorizedGuard } from './guards/unauthorized.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/default-layout/default-layout.component').then(
        (c) => c.DefaultLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/main-page/main-page.component').then(
            (c) => c.MainPageComponent
          ),
      },
      {
        path: 'genres',
        loadComponent: () =>
          import(
            './pages/genre-observable-page/genre-observable-page.component'
          ).then((c) => c.GenreObservablePageComponent),
      },
    ],
  },
  {
    path: 'signin',
    canActivate: [UnauthorizedGuard],
    loadComponent: () =>
      import('./layouts/login-layout/login-layout.component').then(
        (c) => c.LoginLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/registration-page/registration-page.component').then(
            (c) => c.RegistrationPageComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    canActivate: [UnauthorizedGuard],
    loadComponent: () =>
      import('./layouts/login-layout/login-layout.component').then(
        (c) => c.LoginLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/login-page/login-page.component').then(
            (c) => c.LoginPageComponent
          ),
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (c) => c.NotFoundPageComponent
      ),
  },
];
