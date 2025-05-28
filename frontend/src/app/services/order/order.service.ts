import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../models/Order/Order';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = environment.apiUrlOrder;

  constructor(private http: HttpClient) {}

  // 🔐 Obtener token del localStorage
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 🔐 Crear headers con token
  private createAuthorizationHeader(): HttpHeaders {
    const token = this.getToken();
    return token
      ? new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      : new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  /** GET - Obtener una orden por ID */
  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  /** POST - Crear una nueva orden */
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, JSON.stringify(order), {
      headers: this.createAuthorizationHeader()
    });
  }

  /** PUT - Actualizar una orden existente */
  updateOrder(orderId: string, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}`, JSON.stringify(order), {
      headers: this.createAuthorizationHeader()
    });
  }

  /** DELETE - Eliminar una orden por ID */
  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${orderId}`, {
      headers: this.createAuthorizationHeader()
    });
  }
}
