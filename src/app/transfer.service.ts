import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TransferService {

  constructor(
    private http: HttpClient,
  ) { }

  getToken() {
    return localStorage.getItem('token');
  }

  getHeader() {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.getToken()}`)
    }
    return header;
  }

  getTransfers() {
    return this.http.get(`${environment.api}/transfer`, this.getHeader());
  }

}
