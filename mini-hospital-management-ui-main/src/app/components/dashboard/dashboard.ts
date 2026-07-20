import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMetrics } from './dashboard-metrics/dashboard-metrics';
import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts';
import { DashboardPatientsComponent } from './dashboard-patients/dashboard-patients';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../services/dashboard';
import { AppointmentService } from '../../services/Appointment.service';
import { DashboardTreatmentsComponent } from './dashboard-treatments/dashboard-treatments';
import { DashboardAppointmentsComponent } from './dashboard-appointments/dashboard-appointments';
import { PatientService } from '../../services/patients';
import { PatientMainDashboardComponent } from '../patient-main-dashboard/patient-main-dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:
  [CommonModule, DashboardMetrics, DashboardChartsComponent, RouterModule, DashboardAppointmentsComponent,
    DashboardTreatmentsComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  metrics: any;
  nextPatient: any;
  approvals: any[] = [];
  appointments: any[] = [];
  treatments: any[] = [];
  todaysAppointments: any[] = [];


  constructor(
    private dashboardService: DashboardService,
    private appointmentService: AppointmentService,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    this.dashboardService.getAdminMetrics().subscribe(data => {
      this.metrics = data;
      console.log('Metrics:', this.metrics);
    });

    this.dashboardService.getNextPatient().subscribe(data => {
      this.nextPatient = data;
    });

    this.dashboardService.getApprovalRequests().subscribe(data => {
      this.approvals = data;
    });

    this.appointmentService.getUpcomingAppointments().subscribe(data => {
      this.appointments = data;
      console.log('Appointments:', this.appointments);
    });

    this.appointmentService.getTopTreatments().subscribe(data => {
      this.treatments = data;
      console.log('Treatments:', this.treatments);
    });

    this.appointmentService.getTodaysAppointments().subscribe(data => {
  this.todaysAppointments = data;
  console.log('Today:' , this.todaysAppointments);
});

  }
}
