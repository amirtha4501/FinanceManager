import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.css']
})
export class CaptureComponent implements OnInit {

  WIDTH = 505;
  HEIGHT = 380;
  signUpForm: FormGroup;
  detail = {}
  error: any;
  captures: string = null;
  isCaptured: boolean;

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

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
    console.log(this.router.url)
  }

  async ngAfterViewInit() {
    await this.setupDevices();
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
    this.userService.signUp(this.detail, this.captures).subscribe(
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

