import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }

  private getToken() {
    return localStorage.getItem('token');
  }

  private getHeader() {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.getToken()}`)
    }
    return header;
  }

  getCategories() {
    return this.http.get(`${environment.api}/categories`, this.getHeader());
  }

  getCategoryById(id: number) {
    return this.http.get(`${environment.api}/categories/` + id, this.getHeader());
  }

  updateCategory(id: number, detail) {
    return this.http.patch(`${environment.api}/categories/` + id, {
      name: detail.name,
      parent_name: detail.parent_name,
      starred: detail.starred,
      type: detail.type,
      color: detail.color
    }, this.getHeader());
  }

  deleteCategory(id: number) {
    return this.http.delete(`${environment.api}/categories/` + id, this.getHeader());
  }

}
