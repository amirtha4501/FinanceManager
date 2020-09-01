import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = null;

  constructor() { 
    // this.token = localStorage.getItem('token');
  }

  isUserLoggedIn() {
    this.token = localStorage.getItem('token');
    if(this.token) {
      alert('found');
      return true;
    }
    alert('not found');
    return false;
  }
}
