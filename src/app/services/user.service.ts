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
        console.log("signin");
        console.log(this.http.post(`${environment.api}/auth/signin`, {
            id: detail.id,
            password: detail.password
        }));
        return this.http.post(`${environment.api}/auth/signin`, {
            id: detail.id,
            password: detail.password
        });
    }
}
