import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'node_modules/chart.js';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  report: any;
  years: any[];
  currentYear;
  months: any[];
  currentMonth;
  dates: any[];
  transactionReport: any;
  transactionCharts;
  constructor(
    private createService: CreateService,
    private route: ActivatedRoute
  ) {
    this.determineFont();
  }

  days: any[] //  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  incomeData: number[] = []; //= [1000, 0, 5000, 100, 200, 0, 50000, 300, 40000, 20, 7000];
  expenseData: number[] = []; //[100, 3000, 500, 10, 2000, 8000, 90000, 3000, 10000, 2000, 1000];
  balanceData: number[] = [100, 200, 200, 200, 500, 2000, 500, 500, 600, 1000, 900];
  totalExpenses: number = 60;
  totalIncomes: number = 60;
  categoryData: number[] = [200, 300, 100, 500, 3000, 600, 100];
  categoryLabel: string[] = ["Food", "Car", "Entertainment", "Outing", "Stuffs", "Clothing", "others"]
  fontSize: number = 10;

  ngOnInit(): void {
    this.report = this.route.snapshot.data["report"];

    this.getTransactionReport();
    this.determineFont();
    this.dateFilter();
    this.setData();
    this.transactionChart("transaction-canvas", "line");
    this.balanceChart("balance-canvas", "line");
    this.incomeExpenseChart("incomes-expenses-canvas", "doughnut");
    this.categoryChart("category-canvas", "bar");
  }

  dateFilter() {
    this.years = Object.keys(this.transactionReport).reverse();
    this.currentYear = this.years[0]
    this.months = Object.keys(this.transactionReport[this.currentYear]).reverse();
    this.currentMonth = this.months[0]
    this.dates = this.transactionReport[this.currentYear][this.currentMonth]
    // this.days = Object.keys(this.dates);
    // console.log(this.dates)
    this.daysInMonth(this.currentMonth, this.currentYear);
  }

  setData() {
    let dateKeys = Object.keys(this.dates).map(Number);

    this.days.forEach((day) => {
      if (dateKeys.includes(day)) {
        this.incomeData.push(this.dates[day].income);
        this.expenseData.push(this.dates[day].expense);
      } else {
        this.incomeData.push(0);
        this.expenseData.push(0);
      }
    });
    if(this.transactionCharts) {
      this.transactionCharts.data.datasets[0].data = this.incomeData;
      this.transactionCharts.data.datasets[1].data = this.expenseData;
      this.transactionCharts.update();
    }
  }

  daysInMonth (month, year) {
    let totalDays = new Date(year, month, 0).getDate();
    this.days = Array.from({length: totalDays}, (_, i) => i + 1);
    if(this.transactionCharts) {
      this.transactionCharts.data.labels = Array.from({length: totalDays}, (_, i) => i + 1);
      this.transactionCharts.update()
    }
  }

  onChange($event, type: string) {
    let text = $event.target.options[$event.target.options.selectedIndex].text;
    if(type === "year") {
      this.currentYear = text;
      let yearObject = this.transactionReport[text];
      this.months = Object.keys(yearObject);
    } else {
      this.currentMonth = text;
      this.dates = this.transactionReport[this.currentYear][this.currentMonth];
      this.daysInMonth(this.currentMonth, this.currentYear);
      this.setData();
      // this.transactionCharts.data.labels = this.days;
      // this.transactionCharts.update()
    }
  }

  getTransactionReport() {
    this.transactionReport = this.report.transactionReport
    console.log(this.transactionReport)
  }

  determineFont() {
    if (window.innerWidth > 320 && window.innerWidth < 480) {
      this.fontSize = 7;
    }
    if (window.innerWidth > 481 && window.innerWidth < 768) {
      this.fontSize = 9;
    }
    if (window.innerWidth > 769 && window.innerWidth < 1024) {
      this.fontSize = 11;
    }
    if (window.innerWidth > 1025 && window.innerWidth < 1200) {
      this.fontSize = 13;
    }
    if (window.innerWidth > 1201) {
      this.fontSize = 15;
    }
  }

  transactionChart(id, type) {
    this.transactionCharts = new Chart(id, {
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
              beginAtZero: true,
              fontSize: this.fontSize,
              fontColor: 'black',
              callback: function (value) {
                return '₹' + value;
              }
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: 'black',
              fontSize: this.fontSize
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
        legend: { display: false },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontColor: 'black',
              fontSize: this.fontSize,
              callback: function (value) {
                return '₹' + value;
              }
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: 'black',
              fontSize: this.fontSize
            }
          }]
        }
      }
    });
  }

  incomeExpenseChart(id, type) {
    var incomeExpenseCharts = new Chart(id, {
      type: type,
      data: {
        labels: ['incomes', 'expenses'],
        datasets: [
          {
            label: '',
            data: [this.totalExpenses, this.totalIncomes],
            backgroundColor: [
              '#a27fc7',
              '#fae04d'
            ],
            borderWidth: 2
          }
        ]
      },
      options: {}
    });
  }

  categoryChart(id, type) {
    var incomeExpenseCharts = new Chart(id, {
      type: type,
      data: {
        labels: this.days,
        datasets: [
          {
            label: 'category',
            data: this.categoryData,
            backgroundColor: [
              '#a27fc7',
              '#fae04d',
              '#a27fc7',
              '#fae04d',
              '#a27fc7',
              '#fae04d',
              '#a27fc7'
            ],
            borderWidth: 2
          }
        ]
      },
      options: {
        legend: { display: false },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontColor: 'black',
              fontSize: this.fontSize,
              callback: function (value) {
                return '₹' + value;
              }
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: 'black',
              fontSize: this.fontSize
            }
          }]
        }
      }
    });
  }

  enableComponent() {
    this.createService.isDesktop = true;
    this.createService.isCategory = false;
    this.createService.isUncategory = false;
    this.createService.isHistory = false;
    this.createService.isTemplate = false;
    this.createService.isRecurringPayment = false;
    this.createService.isPlannedTransaction = false;
    this.createService.isTransfer = false;
    this.createService.createName = "New transaction";
  }
}
