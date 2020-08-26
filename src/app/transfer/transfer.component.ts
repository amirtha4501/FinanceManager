import { Component, OnInit } from '@angular/core';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(
    private createService: CreateService
  ) { }

  ngOnInit(): void {
  }

  enableComponent() {
    this.createService.isTransfer = true;
    this.createService.isDesktop = false;
    this.createService.isCategory = false;
    this.createService.isUncategory = false;
    this.createService.isHistory = false;
    this.createService.isTemplate = false;
    this.createService.isRecurringPayment = false;
    this.createService.isPlannedTransaction = false;
    this.createService.createName = "New transfer";
  }

}
