import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskResponseDto, TaskStatuses } from '../../../shared/models/task.model';
import { KanbanService } from '../../../shared/services/kanban.service';

@Component({
  selector: 'app-tasks.component',
  imports: [MatCardModule, MatChipsModule, MatListModule, MatToolbarModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  statuses = Object.values(TaskStatuses);
  tasksByStatus: { [key: string]: TaskResponseDto[] } = {};

  constructor(private kanbanService: KanbanService) {
    this.statuses.forEach(status => {
      this.tasksByStatus[status] = this.kanbanService.getTasksByStatus(status as TaskStatuses);
    });
  }
}
