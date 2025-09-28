import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { TaskStatuses, TaskResponseDto } from '../../shared/models/task.model';
import { KanbanService } from '../../shared/services/kanban.service';

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
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
