import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { KanbanService } from '../kanban.service';
import { TaskResponseDto, TaskStatuses } from '../models/task.model';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    MatCardModule,
    MatChipsModule,
    MatToolbarModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent {
  statuses = Object.values(TaskStatuses);
  tasksByStatus: { [key: string]: TaskResponseDto[] } = {};

  constructor(private kanbanService: KanbanService) {
    this.statuses.forEach(status => {
      this.tasksByStatus[status] = this.kanbanService.getTasksByStatus(status as TaskStatuses);
    });
  }
}
