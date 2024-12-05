import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importa este módulo
import { MatInputModule } from '@angular/material/input'; // También importa MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Para los botones

@Component({
  standalone: true,
  selector: 'app-product-edit-dialog',
  template: `
    <h2 mat-dialog-title>Editar Producto</h2>
    <mat-dialog-content>
      <form [formGroup]="editForm">
        <mat-form-field appearance="fill">
          <mat-label>Nombre del Producto</mat-label>
          <input matInput formControlName="title" />
          <mat-error *ngIf="editForm.get('title')?.hasError('required')">
            El nombre es obligatorio.
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Precio</mat-label>
          <input matInput type="number" formControlName="price" />
          <mat-error *ngIf="editForm.get('price')?.hasError('required')">
            El precio es obligatorio.
          </mat-error>
          <mat-error *ngIf="editForm.get('price')?.hasError('min')">
            El precio debe ser mayor a 0.
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancelar</button>
      <button mat-button color="primary" (click)="save()">Guardar</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-form-field {
        width: 100%;
        margin-bottom: 16px;
      }
    `,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule, // Importado aquí
    MatInputModule, // Para los campos de entrada
    MatButtonModule, // Para los botones
  ],
})
export class ProductEditDialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      title: [data.title, Validators.required], // Nombre del producto
      price: [data.price, [Validators.required, Validators.min(0)]], // Precio del producto
    });
  }

  save(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value); // Devuelve los datos actualizados
    }
  }

  cancel(): void {
    this.dialogRef.close(); // Cierra el diálogo sin guardar
  }
}
