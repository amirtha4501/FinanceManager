import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  oAuthUrls: object;
  token = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    if (this.isUserLoggedIn()) {
      this.router.navigate(['/desktop']);
    }
  }

  oAuthLogin(provider: any, body: any): Observable<any> {
    return this.http.post(`${environment.api}/auth/token/${provider}`, body);
  }

  isUserLoggedIn() {
    this.token = localStorage.getItem('token');
    let payload = JSON.parse(atob(this.token.split(".")[1]));

    if (payload.exp < (new Date().getTime() / 1000)) {
      return false;
    }
    return true;
  }

}
