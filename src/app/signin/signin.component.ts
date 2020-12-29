import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

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
        this.createSignInForm();
    }

    ngOnInit(): void {
    }

    createSignInForm() {
        this.signInForm = this.fb.group({
            email: ['', [Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
        });
    }

    onSubmit() {
        this.detail = this.signInForm.value;
        this.userService.signIn(this.detail).subscribe(
            (res) => {
                localStorage.setItem('token', res["accessToken"]);
                this.signInForm.reset();

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
                    Swal.fire({
                        icon: 'warning',
                        title: 'Authentication failed!',
                        text: 'Try with correct email and password',
                        showClass: { popup: 'animate__animated animate__fadeInDown' },
                        hideClass: { popup: 'animate__animated animate__fadeOutUp'},
                        confirmButtonColor: '#593481'
                    })
                    this.signInForm.reset();
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: 'Something went wrong, please try again!',
                        timer: 1500,
                        showClass: { popup: 'animate__animated animate__fadeInDown' },
                        hideClass: { popup: 'animate__animated animate__fadeOutUp'},
                        confirmButtonColor: '#593481'
                    })
                    this.signInForm.reset();
                }
            }
        )
    }

}
