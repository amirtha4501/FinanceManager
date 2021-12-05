import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import * as urlParse from 'url-parse';
import { AuthService } from '../services/auth.service';
declare type providers = 'google' | 'facebook';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.css']
})
export class SocialAuthComponent implements OnInit, OnDestroy {
  @Output() authCode: EventEmitter<any> = new EventEmitter();
  public provider: providers;
  private pollTimer: any;

  private oAuthUrls: any = {
    google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${environment.GOOGLE_CLIENT_ID}`
      + `&response_type=code&state=financemanager&scope=profile%20email&access_type=offline&prompt=consent&redirect_uri=${environment.GOOGLE_REDIRECT_URL}`
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  openPopup(provider: providers) {
    let url: any;
    let title: string;
    let callback_url: string;
    this.provider = provider;
    if (this.provider === 'google' && this.oAuthUrls.google) {
      callback_url = this.oAuthUrls.google.split('redirect_uri=')[1];
      url = this.oAuthUrls.google;
      title = 'Finance Manager - Google Auth';
    } else if (this.provider === 'facebook' && this.oAuthUrls.facebook) {
      callback_url = this.oAuthUrls.facebook.split('redirect_uri=')[1];
      url = this.oAuthUrls.facebook;
      title = 'Finance Manager - Facebook Auth';
    } else {
      return;
    }
    this.displayPopup(url, title, callback_url);
  }

  displayPopup(url: string, title: string, callback_url: string): void {
    const popup = window.open(url, title, 'width=800,height=600,centerscreen=yes')
    popup.opener = null;
    this.pollTimer = setInterval(() => {
      try {
        if (popup.document.URL.indexOf(callback_url) !== -1) {
          window.clearInterval(this.pollTimer);
          const authorizationCode = urlParse(popup.document.URL, true).query.code;
          this.authCode.emit({provider: this.provider, authorizationCode});
          popup.close();
        }
        if (popup.closed) {
          window.clearInterval(this.pollTimer);
          this.pollTimer = null;
        }
        if (popup.document.URL === undefined) {
          clearInterval(this.pollTimer);
        }
      } catch (e) {
        if (typeof e.message === 'string' && !e.message.includes('accessing a cross-origin frame')) {
          clearInterval(this.pollTimer);
        }
      }
    }, 1_000);
  }

  ngOnDestroy(): void {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
    }
  }
}
