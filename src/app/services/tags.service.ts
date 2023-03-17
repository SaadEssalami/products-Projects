import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tags } from '../models/tags';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
baseUrl = "http://localhost:3000/tags"
  constructor(private http: HttpClient) { }

  getAllTags(){
   return this.http.get<Tags[]>(this.baseUrl);
  }

  postTag(data :Tags){
   return this.http.post<Tags>(this.baseUrl, data);
  }

  putTag(id :number |undefined , data:Tags){
   return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteTags(id: number |undefined){
   return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
