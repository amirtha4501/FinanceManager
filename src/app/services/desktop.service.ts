import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DesktopService {

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

    getTransactions() {
        return this.http.get(`${environment.api}/transactions`, this.getHeader());
    }

    getCategorizedTransactions() {
        return this.http.get(`${environment.api}/transactions/review`, this.getHeader());
    }

    getMonthlyTransactions(): Observable<any> {
        return this.http.get(`${environment.api}/transactions/monthly-transactions`, this.getHeader());
    }

    getReports(): Observable<any> {
        return this.http.get(`${environment.api}/transactions/reports`, this.getHeader());
    }

    getTransactionById(id: number) {
        return this.http.get(`${environment.api}/transactions/` + id, this.getHeader());
    }

    deleteTransaction(id: number) {
        return this.http.delete(`${environment.api}/transactions/` + id, this.getHeader());
    }

}
