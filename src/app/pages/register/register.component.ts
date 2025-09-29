import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { passwordMatchValidator } from './validators/password-match.validator';
import { AuthenticationService } from '@app/shared/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register.component',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;
  snackbar = inject(MatSnackBar);

  constructor(private fb: FormBuilder, private readonly authService: AuthenticationService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, passwordMatchValidator]],
    });
  }

  register() {
    console.log(this.form.get('confirmPassword')?.errors);
    if (this.form.valid) {
      // Registration logic here
      const { email, password, confirmPassword } = this.form.value;
      if (password !== confirmPassword) {
        return;
      }

      this.authService.register(email, password).subscribe(() => {
        this.snackbar.open('Registration successful! Please log in.', 'Close', {
          duration: 5000,
        });
        this.form.reset();
      });
    }
  }
}
