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
import { Task, TaskStatus } from '@shared/models/task.model';
import { MatIconModule } from '@angular/material/icon';
import { TasksService } from '@app/shared/services/tasks.service';
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
    MatDialogModule,
  ],
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
  tasks: Task[] = [];
  loading = signal(true);
  private tasksSub?: Subscription;
  private dialogSub?: Subscription;

  constructor(private tasksService: TasksService, private readonly dialog: MatDialog) {
    effect(() => this.fetchTasksByStatus());
  }

  ngOnDestroy() {
    if (this.tasksSub) {
      this.tasksSub.unsubscribe();
    }
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }

  private fetchTasksByStatus() {
    this.loading.set(true);
    this.tasksSub = this.tasksService.getTasksByStatus$(this.status()).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  openTaskDialog(task: Task | null) {
    const dialogRef = this.dialog.open(CardComponent, {
      // width: '400px',
      disableClose: true,
      data: { ...task, status: this.status() },
    });

    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
    this.dialogSub = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchTasksByStatus();
      }
    });
  }

  deleteTask(taskId: string) {
    this.tasksService.deleteTask$(taskId).subscribe(() => {
      this.fetchTasksByStatus();
    });
  }
}
