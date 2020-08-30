import { Component, OnInit } from '@angular/core';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  transactions: any = [
    {
      "title": "car",
      "category": "accessories",
      "amount": "45000",
      "type": "income"
    },
    {
      "title": "car",
      "category": "accessories",
      "amount": "45000",
      "type": "expense"
    },
    {
      "title": "car",
      "category": "accessories",
      "amount": "45000",
      "type": "expense"
    },
    {
      "title": "car",
      "category": "accessories",
      "amount": "45000",
      "type": "income"
    },
  ];

  constructor(
    private createService: CreateService
  ) { }

  ngOnInit(): void {
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
}
