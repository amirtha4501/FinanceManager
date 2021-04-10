import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import { CreateService } from '../services/create.service';
import { DesktopService } from '../services/desktop.service';
import { ToastService } from '../services/toast.service';

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
        private toastService: ToastService,
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
                if (err.status == '404') {
                    this.toastService.error("Transactions not found");
                }
            }
        );
    }

    toggleOption(i: number) {
        this.value = i;
        this.show = !this.show;
    }

    deleteTransaction(id: number) {
        Swal.fire({
            title: 'Are you sure to delete the transaction?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#593481',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await this.desktopService.deleteTransaction(id).subscribe(() => {
                    Swal.fire({
                        icon: 'success',
                        text: 'Deleted successfully',
                        showClass: { popup: 'animate__animated animate__fadeInDown' },
                        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                        timer: 1500,
                        confirmButtonColor: '#593481'
                    });
                    this.getTransactions();
                }, () => {
                    this.toastService.error("Transaction deletion failed");
                }
                );
            }
        });
    }
}
