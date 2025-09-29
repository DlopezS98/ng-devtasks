import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { passwordMatchValidator } from './validators/password-match.validator';

@Component({
  selector: 'app-register.component',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, passwordMatchValidator]],
      }
    );
  }

  register() {
    console.log(this.form.get('confirmPassword')?.errors);
    if (this.form.valid) {
      // Registration logic here
      const { email, password, confirmPassword } = this.form.value;
      if (password !== confirmPassword) {
        // Handle password mismatch
        return;
      }
      // Proceed with registration
    }
  }
}
