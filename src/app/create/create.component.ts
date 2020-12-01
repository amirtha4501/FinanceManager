import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CreateService } from '../services/create.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
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
    categoryForm: FormGroup;
    detail = {}
    error: any;

    accounts: any = [];

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private location: Location,
        private createService: CreateService,
        private accountService: AccountService
    ) {
        this.createMainForm();
        this.createCategoryForm();
    }

    ngOnInit(): void {
        this.getAccounts();
    }

    navigateBack() {
        this.location.back();
    }

    getAccounts() {
        this.accountService.getAccounts().subscribe(
            (accounts) => {
                this.accounts = accounts;
                this.accounts.forEach(element => {
                    element.isChecked = false;
                });
            },
            (err) => {
                if (err.status == '404') { alert('Accounts not found') }
            }
        );
    }

    createMainForm() {
        this.mainForm = this.fb.group({
            amount: ['', Validators.required],
            type: ['', Validators.required],
            category: [''],
            title: ['', Validators.required],
            tag: [''],
            note: [''],
            account: [''],
            date: ['', Validators.required],
        });
    }

    createCategoryForm() {
        this.categoryForm = this.fb.group({
            // category
            name: ['', Validators.required],
            parentName: [''],
            color: [''],
            type: ['', Validators.required]            
        });
    }

    onCreateTransaction() {
        let isAccountExist = false;
        this.accounts.forEach(account => {
            if(account.name === this.detail['account']) {
                isAccountExist = true;
                this.detail['account'] = account.id;
                this.createService.createTransaction(this.detail).subscribe(
                    (transaction) => {
                        alert("Transaction created");
                        this.router.navigate(['/desktop']);
                    },
                    (err) => {
                        alert(err.status + " " + err.message);
                    }
                );
            } 
        });
        if(isAccountExist === false) {
            alert("Account doesn't exist.");
        }
    }

    onCreateCategory() {
        this.detail = this.categoryForm.value;

        console.log("comp .ts");
        this.createService.createCategory(this.detail).subscribe(
            (category) => {
                alert("Category created");
                this.router.navigate(['/category']);
            },
            (err) => {
                alert(err.status + " " + err.message);
            }
        );
     }

}
