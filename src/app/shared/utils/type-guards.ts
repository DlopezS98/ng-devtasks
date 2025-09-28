import { TokenResponse } from "../models/token.model";

export const isNullOrUndefined = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
}

export const isTokenResponse = (value: unknown): value is TokenResponse => {
  if (isNullOrUndefined(value) || typeof value !== 'object') return false;

  const keys = ['accessToken', 'refreshToken', 'tokenExpiresAt', 'refreshTokenExpiresAt'];
  return keys.every(key => key in value);
}