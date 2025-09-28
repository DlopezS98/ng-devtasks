import { Component, input, InputSignal, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TaskStatus } from '../../../../../shared/models/task.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kanban-column',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss']
})
export class KanbanColumnComponent {
  status: InputSignal<TaskStatus> = input.required();
  private iconsMap = {
    [TaskStatus.Draft]: 'drafts',
    [TaskStatus.ToDo]: 'list_alt',
    [TaskStatus.InProgress]: 'autorenew',
    [TaskStatus.Done]: 'check_circle'
  }
  icon = computed(() => this.iconsMap[this.status()]);
}