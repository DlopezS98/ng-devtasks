import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TasksComponent } from './tasks/tasks.component';
import { LabelsComponent } from './labels/labels.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
        { path: 'tasks', component: TasksComponent },
        { path: 'labels', component: LabelsComponent },
        { path: '', redirectTo: 'tasks', pathMatch: 'full' }
    ],
  },
];
