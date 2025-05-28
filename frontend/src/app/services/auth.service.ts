import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  // Comprobamos si el token está presente en el localStorage

  constructor(private http: HttpClient, private userService: UserService) {}

  
  private hasToken(): boolean {
    return !!localStorage.getItem('token');  // Devuelve true si existe el token
  }

  // Al iniciar sesión, almacenamos el email y el token
  login(email: string, password: string): Observable<string | null> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<{ token: string }>('https://modlabback-h8qv.onrender.com/modlab/User/login', { email, password }, { headers }).pipe(
      map(response => {
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('userEmail', email);
          this.isLoggedInSubject.next(true);
          return token;
        } else {
          return null;
        }
      }),
      catchError(error => {
        console.error('Login fallido en auth', error);
        return of(null);
      })
    );
  }
  


  // Al cerrar sesión, eliminamos el email y el token
  logout(): void {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);  // Actualizamos el estado a 'false'
  }

  // Obtener el email del usuario desde localStorage
  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  // Obtener el token del usuario desde localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verificar si el usuario está autenticado (comprobamos si hay un token)
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  // Este método puede ser llamado en el componente principal o en el guard para verificar el estado de la autenticación
  checkAuthentication(): void {
    this.isLoggedInSubject.next(this.hasToken());  // Actualizamos el estado de la autenticación
  }
}
