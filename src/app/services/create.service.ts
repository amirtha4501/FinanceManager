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
        for (let key in detail){
            console.log( key + ": " + detail[key] + " type " + typeof detail[key]);
        }

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

    createCategory(detail: any): Observable<Object> {
        return this.http.post(`${environment.api}/categories`, {
            
        });
    }
}
