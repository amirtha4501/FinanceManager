import { Component, OnInit } from '@angular/core';
import { CreateService } from '../services/create.service';
import { DesktopService } from '../services/desktop.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  Math: any = Math;
  value: number = -1;
  show: boolean = false;
  categorizedTransactions: any = [];

  constructor(
    private createService: CreateService,
    private toastService: ToastService,
    private desktopService: DesktopService
  ) { }

  ngOnInit(): void {
    this.getCategorizedTransactions();
  }

  toggleOption(i: number) {
    this.value = i;
    this.show = !this.show;
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

  getCategorizedTransactions() {
    this.desktopService.getCategorizedTransactions().subscribe(
      (transactions) => {
        this.categorizedTransactions = transactions;
      },
      (err) => {
        if (err.status == '404') {
          this.toastService.error("Transactions not found");
        }
      }
    )
  }
}
