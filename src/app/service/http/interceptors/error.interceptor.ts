import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import {
  catchError,
  map,
  Observable,
  switchMap,
  throwError,
  timeout,
} from 'rxjs';
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

        if (errorMessage instanceof Blob) {
          return blobToText(errorMessage).pipe(
            switchMap((val) => throwError(() => JSON.parse(val) as HttpError))
          );
        }
        return throwError(() => errorMessage);
      }

      return throwError(() => error);
    })
  );
};

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('');
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = (event) => {
        observer.next((event.target as any).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
