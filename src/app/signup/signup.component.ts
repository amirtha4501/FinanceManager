import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';

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
        private toastService: ToastService,
        private userService: UserService,
        private authService: AuthService
    ) {
        this.signUp();
    }

    ngOnInit(): void {
    }

    signUp() {
        this.signUpForm = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
        });
    }

    onSubmit() {
        this.detail = this.signUpForm.value;
        this.userService.signUp(this.detail).subscribe(
            (res) => {
                localStorage.setItem('token', res["accessToken"]);
                this.signUpForm.reset();
                Swal.fire({
                    icon: 'success',
                    text: 'You\'re signed in successfully!',
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                    timer: 1500,
                    confirmButtonColor: '#593481'
                })
                this.router.navigate(['/desktop']);
            },
            (err) => {
                if (err.status == 401) {
                    this.toastService.error('Sign up failed. Try with correct email and password');
                    this.signUpForm.reset();
                }
                else {
                    this.toastService.error('Something went wrong, please try again!');
                    this.signUpForm.reset();
                }
            }
        )
    }

    oauthLogin(event: any): void {
        console.log(event);
        const oauthProvider: string = event.provider;
        const authorizationCode: string = event.authorizationCode;
        if (!authorizationCode) {
            this.toastService.error('Login Failed');
            this.toastService.error('Please try again!');
            return;
        }
        this.authService.oAuthLogin(oauthProvider, { code: authorizationCode }).subscribe(
            response => {
                this.toastService.success(`Logged in using ${oauthProvider} successfully!`);
                localStorage.setItem('token', response["accessToken"]);
                this.router.navigate(['/desktop']);
            },
            errorResponse => {
                this.toastService.error('Something went wrong');
            }
        );
    }
}
