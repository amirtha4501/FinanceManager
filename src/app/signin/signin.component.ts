import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.signIn();
  }

  ngOnInit(): void {
  }

  signIn() {
    this.signInForm = this.fb.group({
      email:['', [Validators.email]],
      password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  onSubmit() {
    const tok = 'mysecrettoken';
    localStorage.setItem('token', JSON.stringify(tok));
    console.log("submitted", this.signInForm.value);
    this.router.navigate(['/desktop']);
  }

}
