import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../services/patients';
import { Patient } from '../../Models/patient-model.dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DoctorDashboardComponent } from '../doctor-dashboard/doctor-dashboard';
import { DashboardAppointmentsComponent } from '../dashboard/dashboard-appointments/dashboard-appointments';

@Component({
  selector: 'app-patient-main-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardAppointmentsComponent],
  templateUrl: './patient-main-dashboard.html',
  styleUrls: ['./patient-main-dashboard.css']
})
export class PatientMainDashboardComponent implements OnInit {
  patient: Patient | null = null;
  activeTab: string = 'viewDoctors';
   @Input() appointments: any[] = [];
  @Input() todaysAppointments: any[] = [];


  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id || isNaN(id)) return;

    this.patientService.getPatientById(id).subscribe({
      next: (data) => this.patient = data,
      error: () => alert('Failed to load patient.')
    });
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
  }
}
