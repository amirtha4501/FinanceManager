import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  val: number = 1;
  
  constructor() { }

  ngOnInit(): void {
  }

  expNav(val: number) {
    this.val = val;
    return this.val;
  }

}
