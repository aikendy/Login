import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [
    CommonModule, // Agregar CommonModule aquí
  ],
})
export class UserListComponent implements OnInit {
  user: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail'); // Recuperar el correo del usuario autenticado
    if (email) {
      this.userService.getUserByEmail(email).subscribe((user) => {
        this.user = user; // Asignar los datos del usuario
      });
    }
  }
}
