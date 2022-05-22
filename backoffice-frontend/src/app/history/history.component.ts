import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historyService: HistoryService;
  history: any;

  chart = [];
  selected: Object;

  constructor(historyService: HistoryService) { this.historyService = historyService }

  createData(year: number) {
    this.history.forEach(h => {
      if (year === h.year) {
        this.chart.push(new Chart('canvas', {
          type: 'line',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
              {
                data: h.ca,
                borderColor: 'yellow',
                label: "Chiffre d'affaires",
                fill: false
              },
              {
                data: h.benefice,
                borderColor: 'green',
                label: "Bénéfices",
                fill: false
              },
            ]
          },
          options: {
            title: {
                display: true,
                text: h.year
            },
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            },
            responsive: false
          }

        }));
      }
    });
  }

      /*this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              data: ca[0],
              borderColor: '#3cba9f',
              fill: false
            },
            {
              data: benefice[0],
              borderColor: '#ffcc00',
              fill: false
            },
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      });*/

  ngOnInit(): void {
    this.historyService.getHistory().subscribe(history => {
      this.history = history
    });
  }
}
