import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  req.headers.append('Content-Type', environment.serverContentType);
  req.headers.append('Access-Control-Expose-Headers', ['Cookie', 'Set-Cookie']);
  return next(req);
};
