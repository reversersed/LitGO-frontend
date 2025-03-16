import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError, timeout } from 'rxjs';
import HttpError, { createNullError } from '../../../models/httperror.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    timeout(10000),
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        let errorMessage: HttpError;

        if (error.status === 0) {
          return throwError(() => createNullError());
        }

        try {
          errorMessage = error.error;
        } catch (e) {
          errorMessage = createNullError();
        }

        return throwError(() => errorMessage);
      }

      return throwError(() => error);
    })
  );
};
