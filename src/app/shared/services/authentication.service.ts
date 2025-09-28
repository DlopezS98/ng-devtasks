import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { delay, Observable, of } from "rxjs";
import { TokenResponse } from "../models/token.model";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private fakeUser : User = {
    id: '1',
    email: 'user@example.com',
    displayName: 'John Doe',
    createdAt: new Date(),
  }

  validateToken(token: string): Observable<User | null> {
    return of(this.fakeUser).pipe(delay(500));
  }

  login(email: string, password: string): Observable<{ token: TokenResponse, user: User } | null> {
    const token: TokenResponse = {
      accessToken: 'fake-jwt-token',
      refreshToken: 'fake-refresh-token',
      tokenExpiresAt: new Date(Date.now() + 3600 * 1000), // 1 hour
      refreshTokenExpiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000), // 7 days
    };
    // retrieve the token response and then the user info (two different endpoints in a real app)
    return of({ token, user: this.fakeUser }).pipe(delay(500));
  }

  getUserFromToken(token: string): Observable<User | null> {
    return of(this.fakeUser).pipe(delay(500));
  }
}