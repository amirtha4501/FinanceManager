import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ToastService } from '../services/toast.service';

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
        private userService: UserService
    ) {
        this.signUp();
    }

    ngOnInit(): void {
    }

    signUp() {
        this.signUpForm = this.fb.group({
            // name: [''],
            // email: [''],
            // password: ['']
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
                // alert('Hi' + ', you\'re signed up successfully!');
                // this.router.navigate(['/desktop']);
            },
            (err) => {
                if (err.status == 401) {
                    // this.error = 'Sign up failed. Try with correct email and password';
                    // alert(this.error);
                    this.toastService.error('Sign up failed. Try with correct email and password');
                    this.signUpForm.reset();
                }
                else {
                    this.toastService.error('Something went wrong, please try again!');
                    // this.error = 'Something went wrong, please try again!';
                    // alert(this.error);
                    this.signUpForm.reset();
                }
            }
        )
    }
}
