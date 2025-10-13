import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http:HttpClient){}


  getCategories():Observable<any>{
    return this.http.get('https://ecommerce.routemisr.com/api/v1/categories')
  }


    getSpecificCategories(id:string):Observable<any>{
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }
}
