import { Component, OnInit, ViewChildren } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  @ViewChildren('mycharts') allMyCanvas: any;
  transactionData: any;

  constructor(
    private createService: CreateService
  ) {
    this.transactionData = [
      {
        id: 1,
        chart: [],
        month: '08/2020',
        totalExpenses: 100,
        totalIncomes: 300,
        transactions: 3
      },
      {
        id: 2,
        chart: [],
        month: '08/2020',
        totalExpenses: 600,
        totalIncomes: 300,
        transactions: 1
      },
      {
        id: 3,
        chart: [],
        month: '08/2020',
        totalExpenses: 100,
        totalIncomes: 30,
        transactions: 2
      }
    ]
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    let canvasCharts = this.allMyCanvas._results; // Get array with all canvas
    canvasCharts.map((myCanvas, i) => { // For each canvas, save the chart on the charts array
      this.transactionData[i].chart = new Chart(myCanvas.nativeElement.getContext('2d'), {
        type: 'pie',
        data: {
          labels: ['credit', 'debit'],
          datasets: [
            {
              label: '',
              data: [this.transactionData[i].totalExpenses, this.transactionData[i].totalIncomes],
              backgroundColor: [
                '#a27fc7',
                '#fae04d'
              ],
              borderWidth: 2
            }
          ]
        },
        options: {}
      })
    })
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
