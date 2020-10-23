import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(
        private http: HttpClient
    ) { }

    createAccount(detail): Observable<Object> {
        return this.http.post(`${environment.api}/accounts`, {
            name: detail.name.toLowerCase() || detail.name,
            current_amount: detail.current_amount,
            date: detail.date
        });
    }

    getAccountById(id: number): Observable<Object> {
        return this.http.get(`${environment.api}/accounts/` + id);
    }

    getAccounts() {
        return this.http.get(`${environment.api}/accounts`);
    }

    updateAccount(id: number, detail) {
        return this.http.patch(`${environment.api}/accounts/` + id, {
            name: detail.name.toLowerCase() || detail.name,
            current_amount: detail.current_amount,
            date: detail.date
        });
    }

    deleteAccount(id: number) {
        return this.http.delete(`${environment.api}/accounts/` + id);
    }
}
