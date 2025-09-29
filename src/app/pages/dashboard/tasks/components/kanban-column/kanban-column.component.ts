import {
  Component,
  input,
  InputSignal,
  computed,
  effect,
  CUSTOM_ELEMENTS_SCHEMA,
  signal,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { Task, TaskStatus } from '../../../../../shared/models/task.model';
import { MatIconModule } from '@angular/material/icon';
import { KanbanService } from '../../../../../shared/services/kanban.service';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-kanban-column',
  imports: [
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss'],
})
export class KanbanColumnComponent {
  currentTask = signal<Task | null>(null);
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
  tasks: Task[] = [];
  loading = signal(true);
  private tasksSub?: Subscription;

  constructor(private kanbanService: KanbanService, private readonly dialog: MatDialog) {
    effect(() => {
      this.tasksSub = this.kanbanService.fetchTasksByStatus$(this.status()).subscribe((tasks) => {
        this.tasks = tasks;
        this.loading.set(false);
      });
    });
  }

  ngOnDestroy() {
    if (this.tasksSub) {
      this.tasksSub.unsubscribe();
    }
  }

  openTaskDialog(task: Task | null) {
    this.currentTask.set(task);
    const dialogRef = this.dialog.open(CardComponent, {
      // width: '400px',
      disableClose: true,
      data: task,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result from the dialog (e.g., save changes)
        console.log('Dialog result:', result);
      }
      this.currentTask.set(null);
    });
  }
}
