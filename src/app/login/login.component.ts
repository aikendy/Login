import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../services/user.service'; // Importa el servicio
import { Router } from '@angular/router'; // Para redirigir después del login

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]], // Campo de confirmación de contraseña
      },
      {
        validators: this.passwordsMatch, // Validación personalizada
      }
    );
  }

  // Validación personalizada para verificar si las contraseñas coinciden
  passwordsMatch(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordsMismatch: true }; // Error si no coinciden
    }
    return null; // Sin errores si coinciden
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      this.userService.validateUser(email, password).subscribe({
        next: (isValid) => {
          if (isValid) {
            localStorage.setItem('userEmail', email); // Guardar el correo en localStorage
            alert('Inicio de sesión exitoso');
            this.router.navigate(['/dashboard']); // Redirigir al Dashboard
          } else {
            alert('Credenciales incorrectas. Inténtalo de nuevo.');
          }
        },
        error: (error) => {
          console.error('Error al validar las credenciales:', error);
          alert('Hubo un problema al validar las credenciales.');
        },
      });
    } else {
      alert('Por favor, completa el formulario correctamente.');
    }
  }
  
  
}
