import { AuthStore } from '../../shared/state/auth.state';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    MatToolbarModule,
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    AsyncPipe,
    RouterModule,
    MatIconModule
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  isHandset$: Observable<boolean>;
  currentRoute = signal<string>('');
  breakpointObserver: BreakpointObserver;
  router: Router;
  authStore: AuthStore;

  constructor() {
    this.breakpointObserver = inject(BreakpointObserver);
    this.router = inject(Router);
    this.authStore = inject(AuthStore);
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
    this.currentRoute.set(this.router.url);
    this.router.events.subscribe(() => {
      this.currentRoute.set(this.router.url);
    });
  }

  logout() {
    this.authStore.logout();
  }
// ...existing code...
}
