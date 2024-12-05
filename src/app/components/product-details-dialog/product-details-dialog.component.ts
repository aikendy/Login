import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  imports: [CommonModule, MatDialogModule], // Agregar MatDialogModule aquí
})
export class ProductDetailsDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
