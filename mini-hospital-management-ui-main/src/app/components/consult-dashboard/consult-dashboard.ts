import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorAdmissionsService } from '../../services/doctor';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/Auth';
import { DoctorWithAdmissionsDto } from '../../Models/doctor-with-admissions.dto';

@Component({
  selector: 'app-consult-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consult-dashboard.html',
  styleUrls: ['./consult-dashboard.css']
})
export class ConsultDashboardComponent implements OnInit {
  consultant: any = null;
  profileImage: string = 'assets/Images/avatar-1577909_1280.png';
  admissions: any[] = [];
  totalAdmissions: number = 0;
activePatients: number = 0;
pendingReviews: number = 0;

  constructor(
    private doctorService: DoctorAdmissionsService,
    private sanitizer: DomSanitizer,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId || isNaN(userId)) return;

    this.doctorService.getDoctorByUserId(userId).subscribe({
      next: (doctor: any) => {
        this.consultant = doctor;

        this.doctorService.getDoctorProfileImage(doctor.doctorId).subscribe({
          next: (blob: Blob) => {
            const objectURL = URL.createObjectURL(blob);
            const safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            this.profileImage = safeUrl as string;
            this.auth.setProfileImage(this.profileImage);
          },
          error: () => {
            this.auth.setProfileImage(this.profileImage);
          }
        });

        this.doctorService.getDoctorWithAdmissionsById(doctor.doctorId).subscribe({
          next: (data: DoctorWithAdmissionsDto) => {
             console.log('📦 Admissions payload:', data);
            this.admissions = data.admissions ?? [];
            this.calculateMetrics();
            console.log('👀 Fetching admissions for doctorId:', doctor.doctorId);

          },
          error: (err: any) => {
            console.error('❌ Failed to load admissions:', err);
          }
        });
      },
      error: (err: any) => {
        console.error('❌ Failed to load consultant data:', err);
      }
    });
  }

private calculateMetrics(): void {
  this.totalAdmissions = this.admissions.length;

  // Example: active = all admissions without discharge date
  this.activePatients = this.admissions.filter(a => !a.dischargeDate).length;

  // Example: pending = admissions with status "Pending"
  this.pendingReviews = this.admissions.filter(a => a.status === 'Pending').length;
}

}
