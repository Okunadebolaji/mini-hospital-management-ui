import { Component, Input, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './dashboard-charts.html',
  styleUrls: ['./dashboard-charts.css'] // ✅ Fix typo: use `styleUrls` not `styleUrl`
})
export class DashboardChartsComponent implements OnInit {
  @Input() successRate: number = 0;

  chartData: any;
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  ngOnInit(): void {
    this.chartData = {
      labels: ['Success Rate'],
      datasets: [
        {
          data: [this.successRate, 100 - this.successRate],
          backgroundColor: ['#4CAF50', '#e0e0e0']
        }
      ]
    };
  }
}
