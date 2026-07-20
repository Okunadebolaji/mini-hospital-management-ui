import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-patients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-patients.html',
  styleUrls: ['./dashboard-patients.css']
})
export class DashboardPatientsComponent implements OnInit {
  @Input() nextPatient: any;
 @Input() approvals: any[] = [];


  ngOnInit(): void {}
}
