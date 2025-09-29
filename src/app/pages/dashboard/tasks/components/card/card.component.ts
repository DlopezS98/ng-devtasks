import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TasksService } from '@app/shared/services/tasks.service';
import { Label, Task } from '@shared/models/task.model';
import { LabelsService } from '@shared/services/labels.service';

@Component({
  selector: 'app-card.component',
  imports: [
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA) as Task | null;
  isEditing = signal(!!this.data?.id);
  title = computed(() => (this.isEditing() ? 'Edit Task' : 'Create New Task'));
  form!: FormGroup;
  fb = inject(FormBuilder);
  labels = signal<Label[]>([]);

  constructor(
    private readonly dialog: MatDialogRef<CardComponent>,
    private readonly labelsService: LabelsService,
    private readonly tasksService: TasksService
  ) {
    this.labelsService.getLabels$().subscribe((labels) => {
      this.labels.set(labels);
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.data?.title ?? '', Validators.required],
      status: [this.data?.status ?? '', Validators.required],
      description: [this.data?.description ?? ''],
      priority: [this.data?.priority ?? 1, [Validators.required, Validators.min(1)]],
      labelIds: [this.data?.labels?.map((l) => l.id) ?? []],
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      if (this.isEditing() && this.data?.id) {
        this.tasksService.updateTask$(this.data.id, value).subscribe(() => this.dialog.close(true));
      } else {
        this.tasksService.createTask$(value).subscribe(() => this.dialog.close(true));
      }
    }
  }
}
