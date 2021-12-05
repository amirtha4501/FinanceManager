import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, of} from 'rxjs';
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

        if (this.token !== null) {
            return true;
        } else {
            return false;
        }
    }

}
