import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { UserService } from '../service/http/user.service';
import { catchError, EMPTY, map, of, tap } from 'rxjs';

export const UnauthorizedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  return inject(UserService)
    .Auth()
    .pipe(
      map((user) => {
        if (!user === false) {
          return new RedirectCommand(router.parseUrl('/notfound'), {
            skipLocationChange: true,
          });
        }
        return !user;
      })
    );
};
