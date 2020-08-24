import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uncategorized',
  templateUrl: './uncategorized.component.html',
  styleUrls: ['./uncategorized.component.css']
})
export class UncategorizedComponent implements OnInit {

  searchToggler: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  searchToggle() {
    this.searchToggler = !this.searchToggler;
  }


}
