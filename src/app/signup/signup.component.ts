import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    signUpForm: FormGroup;
    detail = {}
    error: any;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private userService: UserService
    ) {
        this.signUp();
    }

    ngOnInit(): void {
    }

    signUp() {
        this.signUpForm = this.fb.group({
            name: ['', [Validators.name]],
            email: ['', [Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
        });
    }

    onSubmit() {
        this.detail = this.signUpForm.value;
        this.userService.signIn(this.detail).subscribe(
            (res) => {
                localStorage.setItem('token', JSON.stringify(res));
                this.signUpForm.reset();
                alert('Hi' + ', you\'re signed up successfully!');
                this.router.navigate(['/desktop']);
            },
            (err) => {
                if (err.status == 401) {
                    this.error = 'Authentication failed. Try with correct email and password';
                    alert(this.error);
                    this.signUpForm.reset();
                }
                else {
                    this.error = 'Something went wrong, please try again!';
                    alert(this.error);
                    this.signUpForm.reset();
                }
            }
        )
    }
}
