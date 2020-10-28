import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

    createAccountForm: FormGroup;
    accountForm: FormGroup;
    createAccountDetail = {}
    viewAccountDetail = {}
    error: any;
    accounts: any = [];
    
    ordersData = [];

  get ordersFormArray() {
    return this.accountForm.controls.orders as FormArray;
  }

    constructor(
        private fb: FormBuilder,
        private accountService: AccountService
    ) { 
        this.createAccount();
        this.viewAccount();
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

    viewAccount() {
        this.accountForm = this.fb.group({
            orders: new FormArray([])
          });
      
          // async orders
          of(this.getOrders()).subscribe(orders => {
            this.ordersData = orders;
            this.addCheckboxes();
          });
      
          // synchronous orders
          // this.ordersData = this.getOrders();
          // this.addCheckboxes();
    }

    private addCheckboxes() {
        this.ordersData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
      }
    
      getOrders() {
        return [
          { id: 100, name: 'order 1' },
          { id: 200, name: 'order 2' },
          { id: 300, name: 'order 3' },
          { id: 400, name: 'order 4' }
        ];
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

    onViewAccount() {
        const selectedOrderIds = this.accountForm.value.orders
      .map((checked, i) => checked ? this.ordersData[i].id : null)
      .filter(v => v !== null);

    console.log(selectedOrderIds);
    }

    getAccounts() {
        this.accountService.getAccounts().subscribe(
            (accounts) => {
                this.accounts = accounts;
            },
            (err) => {
                if (err.status=='404') { alert('Accounts not found') }      
            }
        );
    }

}
