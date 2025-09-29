import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.parent?.get('password')?.value;
  const confirmPassword = control.parent?.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null; // Return null if either field is missing
  }

  if (password !== confirmPassword) {
    return { mismatch: true };
  }

  return null;
};
