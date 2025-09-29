import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map, Observable, switchMap } from 'rxjs';
import { TokenResponse } from '../models/token.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: TokenResponse; user: User } | null> {
    const loginObs = this.http.post<TokenResponse>(`${this.apiUrl}/authentication/login`, {
      email,
      password,
    });
    return loginObs.pipe(
      switchMap((token) =>
        this.getUserFromToken(token.accessToken).pipe(
          map((user) => (user ? { token, user } : null))
        )
      )
    );
  }

  getUserFromToken(token: string): Observable<User | null> {
    return this.http.post<User>(`${this.apiUrl}/authentication/validate-token`, { token });
  }
}
