
import { CookieService } from 'ngx-cookie-service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService)

  

 if(cookieService.check('token')){
  if(req.url.includes('cart') || req.url.includes('wishlist')|| req.url.includes('orders')){
  

        req = req.clone({
    setHeaders:{
      token:cookieService.get('token')
    }
   }

   )  
  }               
 }
    return next(req);
};
