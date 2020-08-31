import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  navigateBack() {
    this.location.back();
  }
}
