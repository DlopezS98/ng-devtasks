import { TokenResponse } from "./token.model";
import { User } from "./user.model";

export interface AuthState {
  isAuthenticated: boolean;
  token: TokenResponse | null;
  user: User | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};