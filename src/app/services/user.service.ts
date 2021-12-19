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

    signIn(detail: any, image?: string): Observable<Object> {
        return this.http.post(`${environment.api}/auth/signin`, {
            email: detail.email,
            password: detail.password,
            image: image ? image : null
        });
    }

    signUp(detail: any, image?: string): Observable<Object> {
        return this.http.post(`${environment.api}/auth/signup`, {
            name: detail.name,
            email: detail.email,
            password: detail.password,
            image: image ? image : null
        });
    }

    isTwoFactor(email: string): Observable<Object> {
        return this.http.post(`${environment.api}/auth/two-factor`, {
            email
        });
    }
}
