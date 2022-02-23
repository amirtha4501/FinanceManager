import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CreateService {

    isDesktop: boolean = false;
    isUncategory: boolean = false;
    isHistory: boolean = false;
    isTemplate: boolean = false;
    isRecurringPayment: boolean = false;
    isPlannedTransaction: boolean = false;
    isCategory: boolean = false;
    isTransfer: boolean = false;
    createName: string = "New transaction";
    fromTransferAccount: any;

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() { }

    getToken() {
        return localStorage.getItem('token');
    }

    getHeader() {
        var header = {
            headers: new HttpHeaders()
              .set('Authorization',  `Bearer ${this.getToken()}`)
          }
          return header;          
    }

    createTransaction(detail: any): Observable<Object> {
        return this.http.post(`${environment.api}/transactions`, {
            amount: detail.amount,
            type: detail.type,
            category_id: detail.category,
            title: detail.title,
            tag: detail.tag,
            note: detail.note,
            account_id: detail.account,
            date: detail.date
        }, this.getHeader());
    }

    createRecurringPayment(detail: any): Observable<Object> {
        return this.http.post(`${environment.api}/transactions/recurring-payments`, {
            amount: detail.amount,
            type: detail.type,
            category_id: detail.category,
            title: detail.title,
            tag: detail.tag,
            note: detail.note,
            account_id: detail.account,
            date: detail.date,
            start_date: detail.start_date,
            end_date: detail.end_date,
            frequency: detail.frequency
        }, this.getHeader());
    }

    createCategory(detail: any): Observable<Object> {
        return this.http.post(`${environment.api}/categories`, {
            name: detail.name,
            parent_name: detail.parentName,
            type: detail.type,
            color: detail.color
        }, this.getHeader());
    }

    createTransfer(detail: any): Observable<Object> {
        return this.http.post(`${environment.api}/transfers`, {
            amount: detail.amount,
            title: detail.title,
            from_account_id: detail.fromAccount,
            to_account_id: detail.toAccount,
            date: detail.date
        }, this.getHeader());
    }
}
