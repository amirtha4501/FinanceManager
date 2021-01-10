import { Component, OnInit } from '@angular/core';
import { CreateService } from '../services/create.service';
import { DesktopService } from '../services/desktop.service';
import { ToastService } from '../services/toast.service';
import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  searchToggler: boolean = false;
  transactionHistory: any = [];
  histories: any = [
    {
      "amount": 1000,
      "category": "car",
      "title": "title",
      "tag": "tag",
      "date": "yesterday",
      "type": "expense"
    },
    {
      "amount": 1000,
      "category": "car",
      "title": "title",
      "tag": "tag",
      "date": "7th june, 2020",
      "type": "income"
    },
    {
      "amount": 1000,
      "category": "car",
      "title": "title",
      "tag": "tag",
      "date": "7th oct, 2020",
      "type": "income"
    },
    {
      "amount": 1000,
      "category": "car",
      "title": "title",
      "tag": "tag",
      "date": "7th aug, 2020",
      "type": "expense"
    }
  ];

  constructor(
    private createService: CreateService,
    private toastService: ToastService,
    private desktopService: DesktopService
  ) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  searchToggle() {
    this.searchToggler = !this.searchToggler;
  }

  enableComponent() {
    this.createService.isHistory = true;
    this.createService.isDesktop = false;
    this.createService.isCategory = false;
    this.createService.isUncategory = false;
    this.createService.isTemplate = false;
    this.createService.isRecurringPayment = false;
    this.createService.isPlannedTransaction = false;
    this.createService.isTransfer = false;
    this.createService.createName = "New transaction";
  }

  getTransactions() {
    this.desktopService.getTransactions().subscribe(
      (transactions) => {
        this.transactionHistory = transactions;
      },
      (err) => {
        // if (err.status == '404') { this.toastService.error("Transactions not found") }
      }
    );
  }

  get sortData() {
    this.transactionHistory.forEach(transaction => {
      transaction.date = moment(new Date(transaction.date)).format('MMM D, YYYY');
    });
    return this.transactionHistory.sort((a, b) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }
}
