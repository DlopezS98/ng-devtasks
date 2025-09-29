import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LabelsService } from '../../../shared/services/labels.service';
import { Label, CreateLabel, UpdateLabel } from '../../../shared/models/task.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-labels.component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './labels.component.html',
  styleUrl: './labels.component.scss'
})
export class LabelsComponent {
  private labelsService = inject(LabelsService);
  private fb = inject(FormBuilder);

  labels = signal<Label[]>([]);
  form: FormGroup;
  editingLabel: Label | null = null;

  constructor() {
    this.form = this.fb.group({
      name: [''],
      color: [''],
    });
    this.loadLabels();
  }

  loadLabels() {
    this.labelsService.getLabels$().subscribe(labels => {
      this.labels.set(labels);
    });
  }

  submit() {
    if (this.editingLabel) {
      const update: UpdateLabel = {
        id: this.editingLabel.id,
        ...this.form.value
      };
      this.labelsService.updateLabel$(update).pipe(
        tap(() => {
          this.editingLabel = null;
          this.form.reset();
          this.loadLabels();
        })
      ).subscribe();
    } else {
      const create: CreateLabel = this.form.value;
      this.labelsService.createLabel$(create).pipe(
        tap(() => {
          this.form.reset();
          this.loadLabels();
        })
      ).subscribe();
    }
  }

  edit(label: Label) {
    this.editingLabel = label;
    this.form.patchValue({
      name: label.name,
      color: label.color || ''
    });
  }

  delete(label: Label) {
    this.labelsService.deleteLabel$(label.id).pipe(
      tap(() => this.loadLabels())
    ).subscribe();
  }

  cancelEdit() {
    this.editingLabel = null;
    this.form.reset();
  }
}
