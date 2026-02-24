import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorAdmissionsService } from '../../services/doctor';
import { DoctorWithAdmissionsDto } from '../../Models/doctor-with-admissions.dto';
import { RouterModule } from '@angular/router';
import { PatientAdmissionDto } from '../../Models/patient-admission.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gyn-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './gyn-dashboard.html',
  styleUrls: ['./gyn-dashboard.css']
})
export class GynDashboardComponent implements OnInit {
  doctorId = Number(localStorage.getItem('doctorId'));
  doctorData?: DoctorWithAdmissionsDto;
  searchTerm: string = '';
  stats = { totalPatients: 0, activeAdmissions: 0, discharged: 0 };

  constructor(private doctorService: DoctorAdmissionsService) {}

  ngOnInit() {
    this.doctorService.getDoctorWithAdmissionsById(this.doctorId).subscribe(data => {
      this.doctorData = data;

      // ✅ FIXED: Use blob directly without appending timestamp
      this.doctorService.getDoctorProfileImage(this.doctorId).subscribe({
        next: (blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.doctorData!.profileImageUrl = objectURL;
        },
        error: () => {
          this.doctorData!.profileImageUrl = 'assets/Images/avatar-1577909_1280.png';
        }
      });

      const admissions = data.admissions || [];
      this.stats.totalPatients = admissions.length;
      this.stats.activeAdmissions = admissions.filter(a => !a.reason.toLowerCase().includes('discharged')).length;
      this.stats.discharged = admissions.filter(a => a.reason.toLowerCase().includes('discharged')).length;
    });
  }

  get filteredAdmissions() {
    if (!this.doctorData?.admissions) return [];
    return this.doctorData.admissions.filter(a =>
      a.patientName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      a.reason.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      a.room.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
