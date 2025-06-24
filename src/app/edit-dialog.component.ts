import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PeriodicElement } from './main.component';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div style="padding: 24px 16px 8px 16px; border-radius: 18px; background: #fff; min-width: 340px; box-shadow: 0 8px 32px #0002;">
      <h2 mat-dialog-title style="text-align:center; font-weight:700; margin-bottom: 18px;">Edit Element</h2>
      <div mat-dialog-content>
        <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 16px;">
          <mat-label>Name</mat-label>
          <input matInput [(ngModel)]="data.name" />
        </mat-form-field>

        <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 16px;">
          <mat-label>Weight</mat-label>
          <input matInput type="number" [(ngModel)]="data.weight" />
        </mat-form-field>

        <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 16px;">
          <mat-label>Symbol</mat-label>
          <input matInput [(ngModel)]="data.symbol" />
        </mat-form-field>
      </div>
      <div mat-dialog-actions style="display: flex; justify-content: flex-end; gap: 8px;">
        <button mat-stroked-button color="warn" (click)="dialogRef.close()">Cancel</button>
        <button mat-flat-button color="primary" (click)="dialogRef.close(data)">Save</button>
      </div>
    </div>
  `,
})
export class EditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement
  ) {}
}