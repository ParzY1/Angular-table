import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { EditDialogComponent } from './edit-dialog.component';


export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    EditDialogComponent
  ],
  template: `
  <mat-toolbar color="primary" style="margin-bottom: 24px;">
    <span style="font-size: 1.3em;">Table</span>
  </mat-toolbar>
  <div style="padding: 20px; max-width: 900px; margin: auto;">
    <mat-card style="background: #fafbfc; border-radius: 18px; box-shadow: 0 4px 24px #0001; min-height: 300px; display: flex; align-items: center; justify-content: center;">
      <ng-container *ngIf="data().length === 0; else tableContent">
        <mat-progress-spinner color="primary" mode="indeterminate"></mat-progress-spinner>
      </ng-container>
      <ng-template #tableContent>
        <mat-form-field appearance="outline" style="width: 300px; margin-bottom: 20px;">
          <mat-label>Filter</mat-label>
          <input matInput (input)="applyFilter($event)" placeholder="Type to filter..." />
        </mat-form-field>

        <table mat-table [dataSource]="filteredData()" class="mat-elevation-z8" style="width: 100%; background: #fff; border-radius: 12px;">
          <ng-container matColumnDef="position" class="mat-column">
            <th mat-header-cell *matHeaderCellDef> No. </th>
            <td mat-cell *matCellDef="let element"> {{element.position}} </td>
          </ng-container>

          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef> Name </th>
            <td mat-cell *matCellDef="let element"> {{element.name}} </td>
          </ng-container>

          <ng-container matColumnDef="weight">
            <th mat-header-cell *matHeaderCellDef> Weight </th>
            <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
          </ng-container>

          <ng-container matColumnDef="symbol">
            <th mat-header-cell *matHeaderCellDef> Symbol </th>
            <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef> Actions </th>
            <td mat-cell *matCellDef="let element">
              <button mat-icon-button color="primary" (click)="editElement(element)">
                <mat-icon>edit</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="['position', 'name', 'weight', 'symbol', 'actions']"></tr>
          <tr mat-row *matRowDef="let row; columns: ['position', 'name', 'weight', 'symbol', 'actions'];"></tr>
        </table>
      </ng-template>
    </mat-card>
  </div>
`,
})
export class MainComponent {
  private dialog = inject(MatDialog);

  private _data = signal<PeriodicElement[]>([]);
  public data = computed(() => this._data());

  public filterValue = signal('');
  private filterSubject = new Subject<string>();

  public filteredData = computed(() => {
    const query = this.filterValue().toLowerCase();
    return this.data().filter(el =>
      Object.values(el).some(val => val.toString().toLowerCase().includes(query))
    );
  });

  constructor() {
    setTimeout(() => this._data.set(ELEMENT_DATA), 1000);

    this.filterSubject.pipe(debounceTime(2000)).subscribe(value => {
      this.filterValue.set(value);
    });
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterSubject.next(value);
  }

  editElement(element: PeriodicElement) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updated = this._data().map(e => e.position === element.position ? result : e);
        this._data.set(updated);
      }
    });
  }
}
