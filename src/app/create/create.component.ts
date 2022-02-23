import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CreateService } from '../services/create.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ToastService } from '../services/toast.service';

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
    transferForm: FormGroup;
    detail = {}
    error: any;

    accounts: any = [];
    categories: any = [];
    subCategories: any = [];
    isAccountExist: boolean = false;
    isCategoryExist: boolean = false;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private location: Location,
        private createService: CreateService,
        private categoryService: CategoryService,
        private accountService: AccountService,
        private toastService: ToastService
    ) {
        this.createMainForm();
        this.createCategoryForm();
        this.createTransferForm();
    }

    ngOnInit(): void {
        this.getAccounts();
        this.getCategories();
    }

    navigateBack() {
        this.location.back();
    }

    getAccounts() {
        this.accountService.getAccounts().subscribe(
            (accounts) => {
                this.accounts = accounts;
                this.accounts.forEach((element: { isChecked: boolean; }) => {
                    element.isChecked = false;
                });
            },
            (err) => {
                if (err.status == '404') { 
                    // alert('Accounts not found') 
                    this.toastService.error('Accounts not found');
                }
            }
        );
    }

    getCategories() {
        this.categoryService.getCategories().subscribe(
            (categories) => {
                this.categories = categories;
                this.categories.forEach((category: { subCategories: any[]; }) => {
                    category.subCategories.forEach((subCategory: any) => {
                        this.subCategories.push(subCategory);
                    });
                });
            },
            (err) => {
                alert(err + "error");
            }
        )
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
            start_date: [''],
            end_date: [''],
            frequency: [''],
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

    createTransferForm() {
        this.transferForm = this.fb.group({
            amount: ['', Validators.required],
            fromAccount: ['', Validators.required],
            toAccount: ['', Validators.required],
            title: ['', Validators.required],
            date: ['', Validators.required]
        })
        if (this.createService.fromTransferAccount) {
            this.transferForm.patchValue({
                fromAccount: this.createService.fromTransferAccount.charAt(0).toUpperCase() + this.createService.fromTransferAccount.slice(1) 
            });
        }
    }

    onCreateTransaction() {
        this.detail = this.mainForm.value;

        this.accounts.forEach((account: { name: string; id: any; }) => {
            if (account.name.toLowerCase() === this.detail['account'].toString().toLowerCase()) {
                this.isAccountExist = true;
                this.detail['account'] = account.id;
            }
        });

        this.categories.forEach((category: { subCategories: any[]; }) => {
            category.subCategories.forEach((subCategory: { name: string; id: any; }) => {
                if (subCategory.name.toLowerCase() === this.detail['category'].toString().toLowerCase()) {
                    this.isCategoryExist = true;
                    this.detail['category'] = subCategory.id;
                }
            })
        });

        if (this.isAccountExist === true && this.isCategoryExist === true) {
            if (this.isRecurringPayment) {
                this.createService.createRecurringPayment(this.detail).subscribe(
                    () => {
                        this.toastService.success("Recurring payment created");
                        this.router.navigate(['/desktop']);
                    },
                    (err) => {
                        this.toastService.error("Recurring payment creation failed");
                    }
                );
            } else {
                this.createService.createTransaction(this.detail).subscribe(
                    () => {
                        this.toastService.success("Transaction created");
                        this.router.navigate(['/desktop']);
                    },
                    (err) => {
                        this.toastService.error("Transaction creation failed");
                    }
                );
            }
        } else if (this.isAccountExist === false) {
            this.toastService.error("Account doesn't exist");
        } else {
            this.toastService.error("Category doesn't exist");
        }
    }

    onCreateCategory() {
        this.detail = this.categoryForm.value;

        this.createService.createCategory(this.detail).subscribe(
            () => {
                this.toastService.success("Category created");
                this.router.navigate(['/category']);
            },
            () => {
                this.toastService.success("Category creation failed");
            }
        );
    }

    onCreateTransfer() {
        console.log(this.transferForm);
        this.detail = this.transferForm.value;

        if (this.detail['fromAccount'] === this.detail['toAccount']) {
            this.toastService.warning("From and to account should not be same");
            return;
        }

        this.accounts.forEach((account: { name: any; id: any; }) => {
            if (account.name.toLowerCase() === this.detail['fromAccount'].toLowerCase()) {
                this.isAccountExist = true;
                this.detail['fromAccount'] = account.id;
            } else if (account.name.toLowerCase() === this.detail['toAccount'].toLowerCase()) {
                this.detail['toAccount'] = account.id;
            }
        });

        this.createService.createTransfer(this.detail).subscribe(
            () => {
                this.toastService.success("Transfer created");
                this.router.navigate(['/transfer']);
            }, 
            () => {
                this.toastService.error("Tranfer creation failed");
            }
        )
    }
}
