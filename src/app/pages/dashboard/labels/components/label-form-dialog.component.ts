import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
  MatCheckboxModule,
  ],
  templateUrl: './label-form-dialog.component.html',
  styleUrls: ['./label-form-dialog.component.scss'],
})
export class LabelFormDialogComponent {
  form: FormGroup;
  isEdit: boolean;
  randomColor = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LabelFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { label?: Label }
  ) {
    this.isEdit = !!data.label;
    this.form = this.fb.group({
      name: [data.label?.name || ''],
      color: [data.label?.color || '#000000'],
    });
  }

  submit() {
    if (this.form.valid) {
      let value = this.form.value;
      if (!this.isEdit && this.randomColor) {
        // Generate random color and do not send color to API
        value = { name: value.name };
      }
      this.dialogRef.close(value as CreateLabel);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
