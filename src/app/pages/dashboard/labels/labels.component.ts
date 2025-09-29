import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LabelsService } from '../../../shared/services/labels.service';
import { Label, CreateLabel, UpdateLabel } from '../../../shared/models/task.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LabelFormDialogComponent } from './components/label-form-dialog.component';
import { tap } from 'rxjs';
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatCardContent } from "../../../../../node_modules/@angular/material/card/index";

@Component({
  selector: 'app-labels.component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
],
  templateUrl: './labels.component.html',
  styleUrl: './labels.component.scss'
})
export class LabelsComponent {
  private labelsService = inject(LabelsService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);

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

  openLabelDialog(label?: Label) {
    const dialogRef = this.dialog.open(LabelFormDialogComponent, {
      data: { label },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result: CreateLabel | undefined) => {
      if (result) {
        if (label) {
          const update: UpdateLabel = { id: label.id, ...result };
          this.labelsService.updateLabel$(update).pipe(
            tap(() => this.loadLabels())
          ).subscribe();
        } else {
          this.labelsService.createLabel$(result).pipe(
            tap(() => this.loadLabels())
          ).subscribe();
        }
      }
    });
  }

  edit(label: Label) {
    this.openLabelDialog(label);
  }

  deleteLabel(label: Label) {
    this.labelsService.deleteLabel$(label.id).pipe(
      tap(() => this.loadLabels())
    ).subscribe();
  }

  cancelEdit() {}
}
