import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStore } from "../state/auth.state";

export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  if (authStore.isAuthenticated()) {
    return true;
  }

  return router.parseUrl('/login');
}