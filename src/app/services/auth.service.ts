import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    token = null;

    constructor(private router: Router) {
        // this.token = localStorage.getItem('token');
        if (this.isUserLoggedIn()) {
            router.navigate(['/desktop']);
        } 
        // else {
        //     router.navigate(['/']);
        // }
    }

    isUserLoggedIn() {
        this.token = localStorage.getItem('token');
        // console.log(this.token + "token auth service");

        if (this.token !== null) {
            return true;
        } else {
            return false;
        }
    }

}
