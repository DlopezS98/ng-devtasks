import { computed, Injectable, signal } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AuthState, initialAuthState } from '../models/auth.model';
import { firstValueFrom } from 'rxjs';
import { TokenResponse } from '../models/token.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { clearTokenFromStorage, getTokenFromStorage, saveTokenToStorage } from '../utils/token.utils';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly state = signal<AuthState>(initialAuthState);

  public readonly isAuthenticated = computed(() => this.state().isAuthenticated);
  public readonly user = computed(() => this.state().user);

  public getToken(): TokenResponse | null {
    return this.state().token ?? null;
  }

  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {
    this.initialize();
  }

  private async initialize() {
    const token = getTokenFromStorage();
    if (!token) return;

    try {
      const user = await firstValueFrom(this.authService.getUserFromToken(token.accessToken));
      if (!user) throw new Error('Invalid token');

      this.setAuthenticated(token, user);
    } catch (error) {
      console.error('AuthStore: Token validation failed', error);
      this.logout();
    }
  }

  public async login(email: string, password: string): Promise<void> {
    const result = await firstValueFrom(this.authService.login(email, password));
    if (!result) throw new Error('Invalid login');

    const { token, user } = result;
    saveTokenToStorage(token);
    this.setAuthenticated(token, user);
  }

  public setAuthenticated(token: TokenResponse, user: User): void {
    console.log('Setting authenticated user:', user);
    this.state.update((state) => ({ ...state, isAuthenticated: true, token, user }));
    this.router.navigateByUrl('/dashboard');
  }

  public logout(): void {
    clearTokenFromStorage();
    this.state.set(initialAuthState);
    this.router.navigateByUrl('/login');
  }
}
