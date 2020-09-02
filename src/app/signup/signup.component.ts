import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.signUp();
  }

  ngOnInit(): void {
  }

  signUp() {
    this.signUpForm = this.fb.group({
      email:['', [Validators.email]],
      password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  onSubmit() {
    const tok = 'mysecrettoken';
    localStorage.setItem('token', JSON.stringify(tok));
    console.log("submitted", this.signUpForm.value);
    this.router.navigate(['/desktop']);
  }

}
