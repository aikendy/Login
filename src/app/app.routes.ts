import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ProductTableComponent } from './components/product-table/product-table.component';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent }, // Página principal (Login)
  { path: 'dashboard', component: DashboardComponent }, // Dashboard principal
  { path: 'store', component: ProductTableComponent }, // Tienda
  { path: 'users', component: UserListComponent }, // Información del usuario
  { path: '**', redirectTo: '' }, // Redirección por defecto al Login
];
