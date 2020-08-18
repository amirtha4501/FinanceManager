import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

jQuery(function($) {
  $('li.search').find('a').on('click', function(e) {
      e.preventDefault();
      $(this).next('input').toggleClass('active');
      console.log("Button clicked");
  });
});

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
