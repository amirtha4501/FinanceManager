import { Component, OnInit } from '@angular/core';
import { CreateService } from '../services/create.service';
import { TransferService } from '../services/transfer.service';
import * as moment from 'moment';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  transfers: any = [];

  constructor(
    private createService: CreateService,
    private transferService: TransferService
  ) { }

  ngOnInit(): void {
    this.getTransfers();
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

  getTransfers() {
    this.transferService.getTransfers().subscribe(
      (transfers) => {
        console.log(transfers);
        this.transfers = transfers;

        this.transfers.forEach((transfer: { date: string | number | Date; }) => {
          transfer.date = moment(new Date(transfer.date)).format('MMM D, YYYY');
        });
      }
    )
  }
}
