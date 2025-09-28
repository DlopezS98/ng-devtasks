import { computed, Injectable, signal } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AuthState, initialAuthState } from '../models/auth.model';
import { firstValueFrom } from 'rxjs';
import { TokenResponse } from '../models/token.model';
import { User } from '../models/user.model';
import { isTokenResponse } from '../utils/type-guards';

const AUTH_STORAGE_KEY = 'devtasks-auth';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly state = signal<AuthState>(initialAuthState);

  public readonly isAuthenticated = computed(() => this.state().isAuthenticated);
  public readonly user = computed(() => this.state().user);

  constructor(private readonly authService: AuthenticationService) {
    this.initialize();
  }

  private async initialize() {
    const token = this.getTokenFromStorage();
    if (!token) return;

    try {
      const user = await firstValueFrom(this.authService.getUserFromToken(token.accessToken));
      if (!user) throw new Error('Invalid token');

      this.setAuthenticated(token, user);
    } catch (error) {
      this.logout();
    }
  }

  public async login(email: string, password: string): Promise<void> {
    const result = await firstValueFrom(this.authService.login(email, password));
    if (!result) throw new Error('Invalid login');

    const { token, user } = result;
    const stringifiedToken = JSON.stringify(token);
    localStorage.setItem(AUTH_STORAGE_KEY, stringifiedToken);
    this.setAuthenticated(token, user);
  }

  public setAuthenticated(token: TokenResponse, user: User): void {
    this.state.update((state) => ({ ...state, isAuthenticated: true, token, user }));
  }

  public logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this.state.set(initialAuthState);
  }

  private getTokenFromStorage(): TokenResponse | null {
    const tokenString = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!tokenString) return null;

    try {
      const parsedToken = JSON.parse(tokenString) as unknown;
      if (!isTokenResponse(parsedToken)) return null;

      return {
        accessToken: String(parsedToken.accessToken),
        refreshToken: String(parsedToken.refreshToken),
        tokenExpiresAt: new Date(parsedToken.tokenExpiresAt),
        refreshTokenExpiresAt: new Date(parsedToken.refreshTokenExpiresAt),
      };
    } catch {
      return null;
    }
  }
}
