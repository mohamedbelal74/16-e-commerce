import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { IAllOrders } from '../interfaces/IAllOrders.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly baseUrl = 'https://ecommerce.routemisr.com/api/v1';

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.loadCartCountOnInit();
  }

  /** عند بداية التطبيق يجيب عدد المنتجات في الكارت من الـ API */
  private loadCartCountOnInit(): void {
    this.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartCountSubject.next(res.numOfCartItems || 0);
      },
      error: () => {
        this.cartCountSubject.next(0);
      }
    });
  }

  setCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }

  getAllOrders(): Observable<IAllOrders[]> {
    return this.httpClient.get<IAllOrders[]>(`${this.baseUrl}/orders`);
  }

  addProdctToCart(id: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/cart`, { productId: id });
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/cart`);
  }

  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/cart/${id}`);
  }

  updateCartCount(id: string, count: number): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/cart/${id}`, { count });
  }

  checkOutSession(id: string, data: object): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/orders/checkout-session/${id}?url=http://localhost:4200`,
      data
    );
  }

  checkOutSessionCash(id: string, data: object): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/orders/${id}`, data);
  }
}
