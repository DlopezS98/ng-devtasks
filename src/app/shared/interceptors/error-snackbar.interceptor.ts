import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const errorSnackbarInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbar = inject(MatSnackBar);
  return next(req).pipe(
    tap({
      error: (error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        if (error.error?.message) {
          snackbar.open(error.error.message, 'Close', {
            // duration: ,
            panelClass: ['custom-snackbar-error'],
          });
        } else {
          snackbar.open('An unexpected error occurred.', 'Close', {
            duration: 5000,
            panelClass: ['custom-snackbar-error'],
          });
        }
      },
    })
  );
};
