import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = "http://localhost:3000/products?_expand=category&_embed=tag&_expand=tag";
  baseUrl ="http://localhost:3000/products" ;

  constructor(private http: HttpClient) { }

  getAllProducts(){
   return this.http.get<Products[]>(this.url);
  }

  postProduct(data: Products){
   return this.http.post<Products>(this.baseUrl, data);
  }

  putProduct(id: number | undefined , data: Products){
   return this.http.put<Products>(`${this.baseUrl}/${id}`, data)
  }

  deletProduct(id: number | undefined){
   return this.http.delete<Products>(`${this.baseUrl}/${id}`)
  }
}
