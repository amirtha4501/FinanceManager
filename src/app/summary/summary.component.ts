import { Component, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private createService: CreateService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void { 
    this.transactionData = this.route.snapshot.data["summary"];
  }

  ngAfterViewInit() {
    this.createPieChart();
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

  createPieChart() {
    let canvasCharts = this.allMyCanvas._results; // Get array with all canvas
    canvasCharts.map((myCanvas, i) => { // For each canvas, save the chart on the charts array
      this.transactionData[i].chart = new Chart(myCanvas.nativeElement.getContext('2d'), {
        type: 'pie',
        data: {
          labels: ['debit', 'credit'],
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

}
