import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  searchToggler: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  searchToggle() {
    this.searchToggler = !this.searchToggler;
  }

}
