import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './service/http/interceptors/error.interceptor';
import { credentialsInterceptor } from './service/http/interceptors/credentials.interceptor';
import { environment } from '../environments/environment';
import { headersInterceptor } from './service/http/interceptors/headers.interceptor';
import { API_BASE_URL } from './service/http/gen/generated';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withViewTransitions({ skipInitialTransition: true })
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideHttpClient(
      withInterceptors([
        credentialsInterceptor,
        headersInterceptor,
        errorInterceptor,
      ])
    ),
    {
      provide: API_BASE_URL,
      useValue: environment.serverString,
    },
  ],
};
