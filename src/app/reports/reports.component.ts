import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor() { }

  days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  incomeData: number[] = [1000, 300, 5000, 100, 200, 800, 50000, 300, 40000, 20, 7000];
  expenseData: number[] = [100, 3000, 500, 10, 2000, 8000, 90000, 3000, 10000, 2000, 1000];
  balanceData: number[] = [100, 200, 200, 200, 500, 2000, 500, 500, 600, 1000, 900];

  ngOnInit(): void {
    this.transactionChart("transaction-canvas", "line");
    this.balanceChart("balance-canvas", "line");
  }

  transactionChart(id, type) {
    var transactionCharts = new Chart(id, {
      type: type,
      data: {
        labels: this.days,
        datasets: [
          {
            label: 'Income',
            data: this.incomeData,
            backgroundColor: [
              'rgba(255, 255, 255, 0.2)'
            ],
            borderColor: [
              'green'
            ],
            borderWidth: 2
          },
          {
            label: 'Expense',
            data: this.expenseData,
            backgroundColor: [
              'rgba(255, 255, 255, 0.2)'
            ],
            borderColor: [
              'red'
            ],
            borderWidth: 2
          }
      ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  balanceChart(id, type) {
    var balanceCharts = new Chart(id, {
      type: type,
      data: {
        labels: this.days,
        datasets: [
          {
            label: 'Balance',
            data: this.balanceData,
            backgroundColor: [
              'rgba(255, 255, 255, 0.2)'
            ],
            borderColor: [
              'darkblue'
            ],
            borderWidth: 2
          }
      ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
