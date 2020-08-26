import { Component, OnInit } from '@angular/core';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-uncategorized',
  templateUrl: './uncategorized.component.html',
  styleUrls: ['./uncategorized.component.css']
})
export class UncategorizedComponent implements OnInit {

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
    this.createService.isUncategory = true;
    this.createService.isDesktop = false;
    this.createService.isCategory = false;
    this.createService.isHistory = false;
    this.createService.isTemplate = false;
    this.createService.isRecurringPayment = false;
    this.createService.isPlannedTransaction = false;
    this.createService.isTransfer = false;
    this.createService.createName = "New transaction";
  }

}
