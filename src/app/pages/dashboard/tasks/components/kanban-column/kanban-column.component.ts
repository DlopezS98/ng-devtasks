import { Component, input, InputSignal, computed, effect, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TaskResponseDto, TaskStatus } from '../../../../../shared/models/task.model';
import { MatIconModule } from '@angular/material/icon';
import { KanbanService } from '../../../../../shared/services/kanban.service';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-kanban-column',
  imports: [MatCardModule, MatIconModule, MatChipsModule, CommonModule, MatButtonModule, MatMenuModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss'],
})
export class KanbanColumnComponent {
  status: InputSignal<TaskStatus> = input.required();
  private readonly taskTitle = {
    [TaskStatus.Draft]: 'Drafts',
    [TaskStatus.ToDo]: 'To Do',
    [TaskStatus.InProgress]: 'In Progress',
    [TaskStatus.Done]: 'Completed',
  };
  private readonly iconsMap = {
    [TaskStatus.Draft]: 'drafts',
    [TaskStatus.ToDo]: 'list_alt',
    [TaskStatus.InProgress]: 'autorenew',
    [TaskStatus.Done]: 'check_circle',
  };
  icon = computed(() => this.iconsMap[this.status()]);
  title = computed(() => this.taskTitle[this.status()]);
  tasks: TaskResponseDto[] = [];
  constructor(private kanbanService: KanbanService) {
    effect(() => {
      this.tasks = this.kanbanService.getTasksByStatus(this.status());
    });
  }
}
