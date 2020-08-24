import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  val: number = 1;
  searchToggler: boolean = false;

  constructor() { }

  expContent(val: number) {
    this.val = val;
    return this.val;
  }

  ngOnInit(): void {
  }

  searchToggle() {
    this.searchToggler = !this.searchToggler;
  }
  
}
