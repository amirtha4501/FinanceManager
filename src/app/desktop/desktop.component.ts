import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CreateService } from '../services/create.service';
import { DesktopService } from '../services/desktop.service';

@Component({
    selector: 'app-desktop',
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DesktopComponent implements OnInit {

    val: number = 1;
    transactions: any = [];
    value: number = -1;
    show: boolean = false;

    constructor(
        private createService: CreateService,
        private desktopService: DesktopService
    ) { }

    ngOnInit(): void {
        this.getTransactions();
    }

    expNav(val: number) {
        this.val = val;
        return this.val;
    }

    enableComponent() {
        this.createService.isDesktop = true;
        this.createService.isCategory = false;
        this.createService.isUncategory = false;
        this.createService.isHistory = false;
        this.createService.isTemplate = false;
        this.createService.isRecurringPayment = false;
        this.createService.isPlannedTransaction = false;
        this.createService.isTransfer = false;
        this.createService.createName = "New transaction";
    }

    getTransactions() {
        this.desktopService.getTransactions().subscribe(
            (transactions) => {
                this.transactions = transactions;
            },
            (err) => {
                if (err.status == '404') { alert('Transactions not found') }
            }
        );
    }

    toggleOption(i: number) {
        this.value = i;
        this.show = !this.show;
    }

    deleteTransaction(id: number) {
        console.log(id, "id");
        this.desktopService.deleteTransaction(id).subscribe(
            (res) => {
                alert("Transaction deleted");
                this.getTransactions();
            },
            (err) => {
                alert("Deletion failed");
            }
        );
    }
}
