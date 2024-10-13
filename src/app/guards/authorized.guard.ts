import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { UserService } from '../service/http/user.service';
import { map } from 'rxjs';

export const AuthorizedGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  return inject(UserService)
    .Auth()
    .pipe(
      map((user) => {
        if (user === null) {
          return new RedirectCommand(router.parseUrl('/notfound'), {
            skipLocationChange: true,
          });
        }
        let role = route.data['role'];
        if (role !== undefined) {
          if (user.roles.find((v) => v === role) === undefined)
            return new RedirectCommand(router.parseUrl('/notfound'), {
              skipLocationChange: true,
            });
        }
        return !!user;
      })
    );
};
