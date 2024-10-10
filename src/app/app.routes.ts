import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/default-layout/default-layout.component').then(
        (c) => c.DefaultLayoutComponent
      ),
    children: [],
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
