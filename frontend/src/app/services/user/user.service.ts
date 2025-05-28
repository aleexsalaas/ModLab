import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';
import { User } from '../../models/User/User';
import { environment } from '../../../environments/environment.prod';

const baseUrl = environment.apiUrl; // Usar la URL del entorno

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient ) {}

  // Obtener usuario por ID
  getById(id: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`, { headers: this.createAuthorizationHeader() })
      .pipe(catchError(this.handleError));
  }

  // Crear un nuevo usuario
  newUser(user: User): Observable<User> {
    return this.http.post<User>(`${baseUrl}/users`, user)
      .pipe(catchError(this.handleError));
  }

  // Actualizar un usuario existente
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${baseUrl}/users/${user.userId}`, user, { headers: this.createAuthorizationHeader() })
      .pipe(catchError(this.handleError));
  }

  // Eliminar un usuario por ID
  deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/users/${id}`, { headers: this.createAuthorizationHeader() })
      .pipe(catchError(this.handleError));
  }

  // Login y guardar el token
  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post<any>(`${baseUrl}/login`, credentials);
  }


  private getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Token obtenido:', token);  // Verifica si el token es lo que esperas
    return token;
  }
  

  // Establecer el token en el encabezado de la solicitud
  private createAuthorizationHeader(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  // Obtener usuario por email con token en el encabezado
  getUserByEmail(email: string): Observable<User> {
    const headers = this.createAuthorizationHeader(); // Aseguramos que el token esté en el encabezado
    return this.http.get<User>(`${baseUrl}/email/${email}`, { headers })
      .pipe(catchError(this.handleError));  // Se maneja el error en caso de fallo
  }
  

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    // Podrías mostrar un mensaje de error o notificación al usuario si lo necesitas
    throw error;
  }
}
