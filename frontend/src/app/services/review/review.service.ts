import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../../models/review/review';
import { environment } from '../../../environments/environment.prod';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = environment.apiUrlReview;

  constructor(private http: HttpClient, private authService: AuthService) {}

  addReview(review: Partial<Review>): Observable<Review> {
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;

    return this.http.post<Review>(this.baseUrl, review, { headers });
  }
  
  getReviewsByProductId(productId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/product/${productId}`);
  }
  
}
