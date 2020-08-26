import { Component, OnInit } from '@angular/core';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  val: number = 1;
  searchToggler: boolean = false;
  transactions: any = [
    {
      "title": "car",
      "category": "electronics"
    },
    {
      "title": "car",
      "category": "electronics"
    },
    {
      "title": "car",
      "category": "electronics"
    }
  ];

  constructor(
    private createService: CreateService
  ) { }

  ngOnInit(): void {
  }

  searchToggle() {
    this.searchToggler = !this.searchToggler;
  }

  expContent(val: number) {
    this.val = val;
    return this.val;
  }

  enableComponent() {
    this.createService.isCategory = true;
    this.createService.isDesktop = false;
    this.createService.isUncategory = false;
    this.createService.isHistory = false;
    this.createService.isTemplate = false;
    this.createService.isRecurringPayment = false;
    this.createService.isPlannedTransaction = false;
    this.createService.isTransfer = false;
    this.createService.createName = "New category";
  }
  
}
