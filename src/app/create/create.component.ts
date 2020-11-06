import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { CreateService } from '../services/create.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

    mainForm: FormGroup;
    detail = {}
    error: any;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private location: Location,
        private createService: CreateService
    ) {
        this.createMainForm();
     }

    ngOnInit(): void { }

    navigateBack() {
        this.location.back();
    }

    createMainForm() {
        this.mainForm = this.fb.group({
            amount: ['', Validators.required],
            type: ['', Validators.required],
            category: [''],
            title: [''],
            tag: [''],
            note: [''],
            account: ['']
        });
    }

    onMainFormSubmit() {
        this.detail = this.mainForm.value;
        console.log(this.detail);
    }

}
