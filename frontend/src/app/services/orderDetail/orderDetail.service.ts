// src/app/services/OrderDetail/order-detail.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { OrderDetail } from '../../models/OrderDetail/OrderDetail';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  private apiUrl = environment.apiUrlOrderDetail;

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = this.getToken();
    return token
      ? new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      : new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  /** Obtener un OrderDetail por su ID */
  getById(orderDetailId: string): Observable<OrderDetail> {
    return this.http.get(`${this.apiUrl}/${orderDetailId}`, {
      responseType: 'text',
      headers: this.createAuthorizationHeader()
    }).pipe(map(json => JSON.parse(json)));
  }

  /** Obtener todos los OrderDetails de una orden */
  getByOrderId(orderId: string): Observable<OrderDetail[]> {
    return this.http.get(`${this.apiUrl}/order/${orderId}`, {
      responseType: 'text',
      headers: this.createAuthorizationHeader()
    }).pipe(map(json => JSON.parse(json)));
  }

  /** Crear un nuevo OrderDetail */
  create(detail: OrderDetail): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(this.apiUrl, JSON.stringify(detail), {
      headers: this.createAuthorizationHeader()
    });
  }

  /** Actualizar un OrderDetail por ID */
  update(orderDetailId: string, detail: OrderDetail): Observable<OrderDetail> {
    return this.http.put<OrderDetail>(`${this.apiUrl}/${orderDetailId}`, JSON.stringify(detail), {
      headers: this.createAuthorizationHeader()
    });
  }

  /** Eliminar un OrderDetail por ID */
  delete(orderDetailId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${orderDetailId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  /** Eliminar todos los OrderDetails de una orden */
  deleteByOrderId(orderId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/order/${orderId}`, {
      headers: this.createAuthorizationHeader()
    });
  }
}
