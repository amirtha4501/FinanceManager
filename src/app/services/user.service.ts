import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    signIn(detail): Observable<Object> {
        return this.http.post(`${environment.api}/auth/signin`, {
            email: detail.email,
            password: detail.password
        });
    }

    signUp(detail): Observable<Object> {
        return this.http.post(`${environment.api}/auth/signup`, {
            name: detail.name,
            email: detail.email,
            password: detail.password
        });
    }
}
