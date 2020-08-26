import { Component, OnInit } from '@angular/core';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  searchToggler: boolean = false;

  constructor(
    private createService: CreateService
  ) { }

  ngOnInit(): void {
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

}
