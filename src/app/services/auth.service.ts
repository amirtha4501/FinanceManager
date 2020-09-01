import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isUserLoggedIn() {
    const token = localStorage.getItem('token');
    if(token) {
      alert('found');
      return true;
    }
    alert('not found');
    return false;
  }
}
