import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

    createAccountForm: FormGroup;
    createAccountDetail = {};
    error: any;
    accounts: any = [];
    filteredAccounts: any = [];

    overlay: boolean = false;
    sidebar: boolean = false;
    dismiss: boolean = false;
    collapseButton: boolean = true;

    constructor(
        private fb: FormBuilder,
        private accountService: AccountService
    ) {
        this.createAccount();
    }

    ngOnInit(): void {
        this.getAccounts();
    }

    filterAccounts() {
        console.table(this.accounts);
    }

    signOut() {
        localStorage.removeItem('token');
    }

    createAccount() {
        this.createAccountForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            current_amount: ['', [Validators.required]],
            date: ['']
        });
    }

    onCreateAccount() {
        this.createAccountDetail = this.createAccountForm.value;
        this.accountService.createAccount(this.createAccountDetail).subscribe(
            (res) => {
                this.createAccountForm.reset();
                alert('Account created!');
            },
            (err) => {
                this.error = 'Something went wrong. Please try again';
                alert(this.error);
            }
        )
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

    sidebarToggler() {
        this.overlay = !this.overlay;
        this.sidebar = !this.sidebar;
        this.collapseButton = !this.collapseButton;
        this.dismiss = !this.dismiss;
    }
}
