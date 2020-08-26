import { Component, OnInit } from '@angular/core';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-planned-transaction',
  templateUrl: './planned-transaction.component.html',
  styleUrls: ['./planned-transaction.component.css']
})
export class PlannedTransactionComponent implements OnInit {

  constructor(
    private createService: CreateService
  ) { }

  ngOnInit(): void {
  }

  enableComponent() {
    this.createService.isPlannedTransaction = true;
    this.createService.isDesktop = false;
    this.createService.isCategory = false;
    this.createService.isUncategory = false;
    this.createService.isHistory = false;
    this.createService.isTemplate = false;
    this.createService.isRecurringPayment = false;
    this.createService.isTransfer = false;
    this.createService.createName = "New transaction";
  }

}
