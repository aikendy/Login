import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/users'; // URL de la API

  constructor(private http: HttpClient) {}

  // Validar credenciales del usuario
  validateUser(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find((u) => u.email === email && u.password === password);
        return !!user; // Devuelve true si encuentra un usuario
      }),
      catchError((error) => {
        console.error('Error al validar usuario:', error);
        return of(false); // En caso de error, devuelve false
      })
    );
  }

  // Obtener información de un usuario por su correo
  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => users.find((user) => user.email === email)), // Buscar al usuario por email
      catchError((error) => {
        console.error('Error al obtener el usuario:', error);
        return of(null); // En caso de error, devuelve null
      })
    );
  }
  
}
