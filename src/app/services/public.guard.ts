import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class PublicGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        if (this.authService.isUserLoggedIn() === false) {
            return true;
        } else {
            return false;
        }
    }

}
