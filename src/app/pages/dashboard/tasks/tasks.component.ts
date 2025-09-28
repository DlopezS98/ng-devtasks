import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskResponseDto, TaskStatus } from '../../../shared/models/task.model';
import { KanbanService } from '../../../shared/services/kanban.service';
import { KanbanColumnComponent } from './components/kanban-column/kanban-column.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';

@Component({
  selector: 'app-tasks.component',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatToolbarModule,
    CommonModule,
    KanbanColumnComponent,
    MatTabsModule,
    MatIconModule,
    TasksListComponent
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TasksComponent {
  statuses = Object.values(TaskStatus);
  tasksByStatus: { [key: string]: TaskResponseDto[] } = {};

  constructor(private kanbanService: KanbanService) {
    this.statuses.forEach((status) => {
      this.tasksByStatus[status] = this.kanbanService.getTasksByStatus(status as TaskStatus);
    });
  }
}
