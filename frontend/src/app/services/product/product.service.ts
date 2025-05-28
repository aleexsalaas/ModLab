import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Product } from '../../models/Product/Product'; // Ajusta la ruta según tu estructura
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrlProduct; // Ajusta la URL base según tu backend

  constructor(private http: HttpClient) {}

  // Método para crear headers con token Authorization
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }) 
                 : new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  // Obtener producto por ID
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`, { headers: this.createAuthorizationHeader() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Manejo básico de errores
  private handleError(error: any): Observable<never> {
    console.error('Error en ProductService:', error);
    throw error;
  }
}
