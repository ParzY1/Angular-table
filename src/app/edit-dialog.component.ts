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
    <h2 mat-dialog-title>Edit Element</h2>
    <div mat-dialog-content>
      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="data.name" />
      </mat-form-field>

      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Weight</mat-label>
        <input matInput type="number" [(ngModel)]="data.weight" />
      </mat-form-field>

      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Symbol</mat-label>
        <input matInput [(ngModel)]="data.symbol" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="dialogRef.close()">Cancel</button>
      <button mat-button color="primary" (click)="dialogRef.close(data)">Save</button>
    </div>
  `,
})
export class EditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement
  ) {}
}