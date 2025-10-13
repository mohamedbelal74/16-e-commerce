import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorductsService {
  constructor(private http:HttpClient){}


    getProducts(pageNumber:number = 1):Observable<any>{
      return this.http.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNumber}`)
    }
    getSpecificPorduct(id:string):Observable<any>{
      return this.http.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

  
}
