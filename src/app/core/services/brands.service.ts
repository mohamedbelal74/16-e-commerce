import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/brands'; // غير اللينك حسب API بتاعك

  constructor(private http: HttpClient) {}

  // كل الكاتيجوريز
  getBrands(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // كاتيجوري معينة
  getSpecificbrands(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
