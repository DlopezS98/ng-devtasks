import { TokenResponse } from '../models/token.model';
import { isTokenResponse } from './type-guards';

export const AUTH_STORAGE_KEY = 'devtasks-auth';

export function getTokenFromStorage(): TokenResponse | null {
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

export const saveTokenToStorage = (token: TokenResponse): void => {
  const stringifiedToken = JSON.stringify(token);
  localStorage.setItem(AUTH_STORAGE_KEY, stringifiedToken);
};

export const clearTokenFromStorage = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
