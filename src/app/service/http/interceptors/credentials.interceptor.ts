import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const credentialRequest = req.clone({
    withCredentials: true,
  });
  return next(credentialRequest);
};
