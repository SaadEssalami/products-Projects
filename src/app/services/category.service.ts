import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = "http://localhost:3000/categories";

  constructor(private http: HttpClient) { }

  getAllCategorys(){
    return this.http.get<Category[]>(this.baseUrl);
  }

  postCategory(data: Category){
   return this.http.post<Category>(this.baseUrl , data);
  }

  putCategory(id : number | undefined , data: Category){
   return this.http.put<Category>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number | undefined){
   return this.http.delete<Category>(`${this.baseUrl}/${id}`);
  }
}
