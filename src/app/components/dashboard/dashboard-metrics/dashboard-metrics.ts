import { Component,Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-metrics.html',
  styleUrl: './dashboard-metrics.css'
})
export class DashboardMetrics implements OnInit{
  @Input() metrics: any;
  @Input() approvals: any[] = [];

ngOnInit(): void {


}
getApprovalCount(): number {
  return this.approvals ? this.approvals.length : 0;
}

}
