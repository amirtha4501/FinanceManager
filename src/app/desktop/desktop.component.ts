import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css'],
  encapsulation: ViewEncapsulation.None
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
