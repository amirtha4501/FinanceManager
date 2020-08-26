import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  isDesktop: boolean = this.createService.isDesktop;
  isUncategory: boolean = this.createService.isUncategory;
  isHistory: boolean = this.createService.isHistory;
  isTemplate: boolean = this.createService.isTemplate;
  isRecurringPayment: boolean = this.createService.isRecurringPayment;
  isPlannedTransaction: boolean = this.createService.isPlannedTransaction;
  isCategory: boolean = this.createService.isCategory;
  isTransfer: boolean = this.createService.isTransfer;

  createName: string = this.createService.createName; 

  constructor(
    private location: Location,
    private createService: CreateService
  ) { }

  ngOnInit(): void { }

  navigateBack() {
    this.location.back();
  }

}
