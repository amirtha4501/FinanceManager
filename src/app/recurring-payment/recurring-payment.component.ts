import { Component, OnInit } from '@angular/core';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-recurring-payment',
  templateUrl: './recurring-payment.component.html',
  styleUrls: ['./recurring-payment.component.css']
})
export class RecurringPaymentComponent implements OnInit {

  constructor(
    private createService: CreateService
  ) { }

  ngOnInit(): void {
  }

  enableComponent() {
    this.createService.isRecurringPayment = true;
    this.createService.isDesktop = false;
    this.createService.isCategory = false;
    this.createService.isUncategory = false;
    this.createService.isHistory = false;
    this.createService.isTemplate = false;
    this.createService.isPlannedTransaction = false;
    this.createService.isTransfer = false;
    this.createService.createName = "New recurring payment";
  }

}
