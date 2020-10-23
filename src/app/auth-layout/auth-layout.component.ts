import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

    createAccountForm: FormGroup;
    createAccountDetail = {}
    error: any;
    
    constructor(
        private fb: FormBuilder,
        private accountService: AccountService
    ) { }

    ngOnInit(): void {
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
            res => {
                this.createAccountForm.reset();
                alert('Account create!');
            },
            err => {
                this.error = 'Something went wrong. Please try again';
            }
        )
    }

}
