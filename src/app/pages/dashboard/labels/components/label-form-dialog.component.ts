import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CreateLabel, Label } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-label-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './label-form-dialog.component.html',
  styleUrls: ['./label-form-dialog.component.scss'],
})
export class LabelFormDialogComponent {
  form: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LabelFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { label?: Label }
  ) {
    this.isEdit = !!data.label;
    this.form = this.fb.group({
      name: [data.label?.name || ''],
      color: [data.label?.color],
    });
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value as CreateLabel);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
