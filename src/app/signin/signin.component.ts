import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    WIDTH = 440;
    HEIGHT = 330;
    captures: string = null;
    isCaptured: boolean;
    isTwoFactor: boolean = false;

    @ViewChild("video")
    public video: ElementRef;

    @ViewChild("canvas")
    public canvas: ElementRef;

    signInForm: FormGroup;
    detail = {}
    error: any;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private toastrService: ToastrService
    ) {
        this.createSignInForm();
    }

    ngOnInit(): void {
    }

    async ngAfterViewInit() {
        await this.setupDevices();
    }

    async setupDevices() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true
                });
                if (stream) {
                    this.video.nativeElement.srcObject = stream;
                    this.video.nativeElement.play();
                    this.error = null;
                } else {
                    this.error = "You have no output video device";
                }
            } catch (e) {
                this.error = e;
            }
        }
    }

    capture() {
        this.drawImageToCanvas(this.video.nativeElement);
        this.captures = this.canvas.nativeElement.toDataURL("image/png");
        this.isCaptured = true;
    }

    recapture() {
        this.captures = null;
        this.isCaptured = false;
    }

    drawImageToCanvas(image: any) {
        this.canvas.nativeElement
            .getContext("2d")
            .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
    }


    createSignInForm() {
        this.signInForm = this.fb.group({
            email: ['', [Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
        });
    }

    onSubmit() {
        this.detail = this.signInForm.value;

        if (this.isTwoFactor && !this.captures) {
            this.toastrService.error("Image is required for authentication")
            return;
        }
        if (!this.isTwoFactor) {
            this.captures = null;
        }

        this.userService.signIn(this.detail, this.captures).subscribe(
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
                        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                        confirmButtonColor: '#593481'
                    })
                    this.signInForm.reset();
                } else {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        text: 'Something went wrong, please try again!',
                        timer: 1500,
                        showClass: { popup: 'animate__animated animate__fadeInDown' },
                        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                        confirmButtonColor: '#593481'
                    })
                    this.signInForm.reset();
                }
            }
        )
    }

    oauthLogin(event: any): void {
        console.log(event);
        const oauthProvider: string = event.provider;
        const authorizationCode: string = event.authorizationCode;
        if (!authorizationCode) {
            this.toastrService.error('Login Failed');
            this.toastrService.error('Please try again!');
            return;
        }
        this.authService.oAuthLogin(oauthProvider, { code: authorizationCode }).subscribe(
            response => {
                this.toastrService.success(`Logged in using ${oauthProvider} successfully!`);
                localStorage.setItem('token', response["accessToken"]);
                this.router.navigate(['/desktop']);
            },
            errorResponse => {
                this.toastrService.error('Something went wrong');
            }
        );
    }

    checkTwoFactor(event: any) {
        console.log(event.target.value);
        if (event.target.value) {
            event.target.value
            this.userService.isTwoFactor(event.target.value).subscribe(
                res => {
                    console.log("res", res);
                    res['isTwoFact'] ? this.isTwoFactor = true : this.isTwoFactor = false; console.log('oops')
                },
                err => {
                    console.log("err", err);
                }
            )
        }
    }
}
