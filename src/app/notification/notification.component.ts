import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications: any = [
    { 
      "date": "jun 19, 2019",
      "title": "Update the app",
      "content": "Please check our new feature - You can access data from web browser on any device",
    },
    { 
      "date": "jun 19, 2019",
      "title": "Update the app",
      "content": "Please check our new feature - You can access data from web browser on any device",
    },
    { 
      "date": "jun 19, 2019",
      "title": "Update the app",
      "content": "Please check our new feature - You can access data from web browser on any device",
    },
    { 
      "date": "jun 19, 2019",
      "title": "Update the app",
      "content": "Please check our new feature - You can access data from web browser on any device",
    }
  ];
  
  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  navigateBack() {
    this.location.back();
  }
}
