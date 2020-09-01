import { Component, OnInit } from '@angular/core';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  searchToggler: boolean = false;

  templates: any = [
    {
      "amount": 1000,
      "category": "car",
      "title": "title",
      "tag": "tag",
      "type": "expense"
    },
    {
      "amount": 1000,
      "category": "car",
      "title": "title",
      "tag": "tag",
      "type": "income"
    },
    {
      "amount": 1000,
      "category": "car",
      "title": "title",
      "tag": "tag",
      "type": "income"
    },
    {
      "amount": 1000,
      "category": "car",
      "title": "title",
      "tag": "tag",
      "type": "expense"
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

  enableComponent() {
    this.createService.isTemplate = true;
    this.createService.isDesktop = false;
    this.createService.isCategory = false;
    this.createService.isUncategory = false;
    this.createService.isHistory = false;
    this.createService.isRecurringPayment = false;
    this.createService.isPlannedTransaction = false;
    this.createService.isTransfer = false;
    this.createService.createName = "New template";
  }

}
