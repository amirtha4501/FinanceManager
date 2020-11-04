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
    createAccountDetail = {}
    error: any;
    accounts: any = [];

    @ViewChild('closebutton') closebutton;
    form: FormGroup;

    overlay: boolean = false;
    sidebar: boolean = false;
    dismiss: boolean = false;
    collapseButton: boolean = true;

    constructor(
        private fb: FormBuilder,
        private accountService: AccountService
    ) {
        this.createAccount();
        this.accountForm();
    }

    ngOnInit(): void {
        this.getAccounts();
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

    accountForm() {
        this.form = this.fb.group({
            checkArray: this.fb.array([], [Validators.required])
        })
    }

    onCheckboxChange(e) {
        console.log("Checkbox changing");
        // const checkArray: FormArray = this.form.get('checkArray') as FormArray;
        // if (e.target.checked) {
        //     checkArray.push(new FormControl(e.target.value));
        // } else {
        //     let i: number = 0;
        //     checkArray.controls.forEach((item: FormControl) => {
        //         if (item.value == e.target.value) {
        //             checkArray.removeAt(i);
        //             return;
        //         }
        //         i++;
        //     });
        // }
    }

    submitForm() {
        console.log("submitted");
    }

    getAccounts() {
        this.accountService.getAccounts().subscribe(
            (accounts) => {
                this.accounts = accounts;
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
