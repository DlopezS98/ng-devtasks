import { HttpInterceptorFn } from '@angular/common/http';
import { getTokenFromStorage } from '../utils/token.utils';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getTokenFromStorage();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });
    return next(cloned);
  }
  return next(req);
};
