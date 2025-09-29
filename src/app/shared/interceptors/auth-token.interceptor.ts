import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthStore } from '../state/auth.state';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  // Try to get the token from the store
  const token = authStore.getToken();

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
