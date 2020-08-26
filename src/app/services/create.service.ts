import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  isDesktop: boolean = false;
  isUncategory: boolean = false;
  isHistory: boolean = false;
  isTemplate: boolean = false;
  isRecurringPayment: boolean = false;
  isPlannedTransaction: boolean = false;
  isCategory: boolean = false;
  isTransfer: boolean = false; 

  createName: string = "New transaction";
  
  constructor() { }

  ngOnInit() { }

}
