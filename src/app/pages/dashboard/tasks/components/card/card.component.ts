import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Task } from '../../../../../shared/models/task.model';

@Component({
  selector: 'app-card.component',
  imports: [MatButtonModule, MatDialogModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  data = inject(MAT_DIALOG_DATA) as Task | null;
  isEditing = signal(!!this.data?.id);
  title = computed(() => this.isEditing() ? 'Edit Task' : 'Create New Task');
  constructor() {
    console.log('CardComponent data:', this.data);
  }
}
