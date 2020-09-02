import { Component, OnInit } from '@angular/core';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-recurring-payment',
  templateUrl: './recurring-payment.component.html',
  styleUrls: ['./recurring-payment.component.css']
})
export class RecurringPaymentComponent implements OnInit {

  recurringPayments: any = [
    {
      "amount": 1000,
      "category": "car",
      "title": "title",
      "fromDate": "21-08-2020",
      "toDate": "10-12-2020",
      "duration": "every day",
      "type": "expense",
      "executionDate": "in 2 days"
    },
    {
      "amount": 5000,
      "category": "cinema & theatre",
      "title": "title",
      "fromDate": "21-08-2020",
      "toDate": "10-12-2020",
      "duration": "every day",
      "type": "income",
      "executionDate": "Tomorrow"
    },
    {
      "amount": 8000,
      "category": "car",
      "title": "title",
      "fromDate": "21-08-2020",
      "toDate": "10-12-2020",
      "duration": "every day",
      "type": "income",
      "executionDate": "Tomorrow"
    },
    {
      "amount": 1000,
      "category": "food",
      "title": "title",
      "fromDate": "21-08-2020",
      "toDate": "10-12-2020",
      "duration": "next week",
      "type": "expense",
      "executionDate": "In 5 days"
    },
  ];

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
