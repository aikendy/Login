import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { ProductDetailsDialog } from '../product-details-dialog/product-details-dialog.component';
import { ProductEditDialogComponent } from '../product-edit-dialog/product-edit-dialog.component';

@Component({
  standalone: true,
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
})
export class ProductTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['index', 'productNumber', 'price', 'image', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  selectedFilter: string = 'name'; // Filtro por defecto: Nombre
  filterValue: string = ''; // Campo de filtro para texto
  priceMin: number = 0; // Precio mínimo por defecto
  priceMax: number = Infinity; // Precio máximo por defecto
  selectedSort: string = 'asc'; // Orden por defecto: Menor a mayor

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('Productos originales:', products); // Inspecciona el contenido
        this.dataSource.data = products.map(product => ({
          ...product,
          images: product.images.map((url: string) =>
            url.startsWith('http') ? url : `https://${url}`
          ),
        }));
        console.log('Datos procesados:', this.dataSource.data);
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      },
    });
  }
  

  applyAdvancedFilter(event: Event | null): void {
    const originalData = [...this.dataSource.data]; // Mantén una copia de los datos originales
  
    if (this.selectedFilter === 'name') {
      this.dataSource.filterPredicate = (data, filter) =>
        data.title.toLowerCase().includes(filter.toLowerCase());
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
    } else if (this.selectedFilter === 'price') {
      // Filtrar por rango de precios
      this.dataSource.data = originalData.filter((product) => {
        const price = product.price;
        return price >= this.priceMin && price <= this.priceMax;
      });
    }
  
    // Aplica orden después del filtrado
    this.applySort();
  
    // Refresca la tabla
    this.dataSource._updateChangeSubscription();
  }
  

  applySort(): void {
    if (this.selectedSort === 'asc') {
      this.dataSource.data.sort((a, b) => a.price - b.price); // Menor a mayor
    } else if (this.selectedSort === 'desc') {
      this.dataSource.data.sort((a, b) => b.price - a.price); // Mayor a menor
    }
  
    // Refresca la tabla
    this.dataSource._updateChangeSubscription();
  }
  

  openDetails(product: any): void {
    this.dialog.open(ProductDetailsDialog, {
      data: product,
      width: '400px',
    });
  }

  editProduct(product: any): void {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      data: product,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.findIndex((p) => p.id === product.id);
        if (index !== -1) {
          this.dataSource.data[index] = { ...this.dataSource.data[index], ...result };
          this.dataSource.data = [...this.dataSource.data];
        }
      }
    });
  }

  deleteProduct(product: any): void {
    if (confirm(`¿Estás seguro de que deseas eliminar el producto "${product.title}"?`)) {
      const index = this.dataSource.data.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
      }
    }
  }
  handleImageError(event: Event): void {
    // Asigna una imagen por defecto en caso de error
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
  }
  

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
