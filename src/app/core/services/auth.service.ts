import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    [key: string]: any;
  };
}

export interface RegisterResponse {
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
    [key: string]: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'https://ecommerce.routemisr.com/api/v1/auth';

  register(form: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/signup`, form);
  }

  login(form: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/signin`, form);
  }

  logOut(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('userId');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.get('token') && !!this.cookieService.get('userId');
  }

  submitVerifyEmail(data: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgotPasswords`, data);
  }

  submitVerifyCode(data: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/verifyResetCode`, data);
  }

submitResetPassword(data: object): Observable<any> {
  return this.http.put(`${this.baseUrl}/resetPassword`, data); 
}

}
