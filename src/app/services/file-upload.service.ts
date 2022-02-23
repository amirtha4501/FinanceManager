import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

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

  uploadXlsxData(fileJson: any) {
    return this.http.post(`${environment.api}/fileload/uploadXlsxData`, { fileJson }, this.getHeader());
  }
}
