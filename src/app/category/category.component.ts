import { Component, OnInit } from '@angular/core';

jQuery(function($) {
  $('li.search').find('a').on('click', function(e) {
      e.preventDefault();
      $(this).next('input').toggleClass('active');
  });
});

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  val: number = 1;

  constructor() { }

  expContent(val: number) {
    this.val = val;
    return this.val;
  }

  ngOnInit(): void {
  }

}
