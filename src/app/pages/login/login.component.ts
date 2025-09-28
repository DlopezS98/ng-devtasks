import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthStore } from '../../shared/state/auth.state';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  public readonly form: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(
    // private readonly authService: AuthenticationService,
    private readonly authStore: AuthStore,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public login() {
    console.log(this.form);
    if (this.form.invalid) return;

    const { email, password } = this.form.getRawValue();
    this.authStore
      .login(email!, password!)
      .then(() => {
        // this.router.navigateByUrl('/dashboard');
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
  }
}
