import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    signInForm: FormGroup;
    detail = {}
    error: any;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private userService: UserService
    ) {
        this.signIn();
    }

    ngOnInit(): void {
    }

    signIn() {
        this.signInForm = this.fb.group({
            email: ['', [Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
        });
    }

    onSubmit() {
        this.detail = this.signInForm.value;
        this.userService.signIn(this.detail).subscribe(
            res => {
                localStorage.setItem('token', JSON.stringify(res));
                this.signInForm.reset();
                alert('Hi' + ', you\'re signed in successfully!');
                this.router.navigate(['/desktop']);
            },
            err => {
                if (err.status == 401) {
                    this.error = 'Authentication failed. Try with correct email and password';
                    alert(this.error);
                    this.signInForm.reset();
                }
                else {
                    this.error = 'Something went wrong, please try again!';
                    alert(this.error);
                    this.signInForm.reset();
                }
            }
        )
    }

}
