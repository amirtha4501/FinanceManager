import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AccountService } from '../services/account.service';
import { ToastService } from '../services/toast.service';

declare const $: any;

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
    val: number = -1;
    show: boolean = false;

    overlay: boolean = false;
    sidebar: boolean = false;
    dismiss: boolean = false;
    collapseButton: boolean = true;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private toastService: ToastService,
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
        Swal.fire({
            title: 'Are you sure to sign out?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#593481',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, sign out!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await Swal.fire({
                    icon: 'success',
                    text: 'Signed out successfully',
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                    timer: 1500,
                    confirmButtonColor: '#593481'
                });
                localStorage.removeItem('token');
                this.router.navigate(['/']);
            }
        });
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
            () => {
                this.createAccountForm.reset();
                this.toastService.success('Account created!');
            },
            () => {
                this.toastService.error('Account creation failed');
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
                if (err.status == '404') { this.toastService.error('Account creation failed'); }
            }
        );
    }

    sidebarToggler() {
        this.overlay = !this.overlay;
        this.sidebar = !this.sidebar;
        this.collapseButton = !this.collapseButton;
        this.dismiss = !this.dismiss;
    }

    toggleOption(i: number) {
        this.val = i;
        this.show = !this.show;
    }
}
