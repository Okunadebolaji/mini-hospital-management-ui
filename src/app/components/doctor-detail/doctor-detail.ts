import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorAdmissionsService } from '../../services/doctor';
import { AppointmentService } from '../../services/Appointment.service';
import { DoctorWithAdmissionsDto } from '../../Models/doctor-with-admissions.dto';
import { AdmissionDto } from '../../Models/Admission.dto';
import { forkJoin } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-doctor-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './doctor-detail.html',
  styleUrls: ['./doctor-detail.css']
})
export class DoctorDetailComponent implements OnInit {
  doctor?: DoctorWithAdmissionsDto;
  loading = true;
  error?: string;
  profileImgUrl: string = '';
  doctorId!: number;

  activeTab: 'pending' | 'confirmed' = 'pending';
  pendingAppointments: any[] = [];
  confirmedAppointments: any[] = [];
  allPendingAppointments: any[] = [];
  allConfirmedAppointments: any[] = [];

  toastMessage = '';
  showToast = false;
  searchTerm = '';

  entriesPerPage = 5;
  pendingPage = 1;
  confirmedPage = 1;

  dateFilter: '' | 'today' | 'yesterday' | 'custom' = '';
  customDateFrom: string = '';
  customDateTo: string = '';

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorAdmissionsService,
    private appointmentService: AppointmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (Number.isNaN(id)) {
      this.error = 'Invalid doctor ID';
      this.loading = false;
      return;
    }

    this.doctorId = id;

    this.doctorService.getDoctorById(id).subscribe({
      next: (doctor: any) => {
        this.doctor = {
          ...doctor,
          admissions: []
        };
        const timestamp = new Date().getTime();
        this.profileImgUrl = `https://localhost:7243/api/Doctor/${doctor.doctorId}/profile-image?${timestamp}`;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load doctor profile';
        this.loading = false;
        console.error(err);
      }
    });

    this.doctorService.getDoctorWithAdmissionsById(id).subscribe({
      next: (doctorWithAdmissions: DoctorWithAdmissionsDto) => {
        if (this.doctor) {
          this.doctor.admissions = doctorWithAdmissions.admissions;
        }
      },
      error: (err) => {
        console.warn('Admissions not loaded', err);
      }
    });

    this.loadAppointmentsByStatus();
  }

  loadAppointmentsByStatus() {
    forkJoin({
      pending: this.doctorService.getAppointmentsByDoctorAndStatus(this.doctorId, 'Pending'),
      confirmed: this.doctorService.getAppointmentsByDoctorAndStatus(this.doctorId, 'Confirmed')
    }).subscribe(({ pending, confirmed }) => {
      this.allPendingAppointments = pending;
      this.pendingAppointments = [...pending];
      this.allConfirmedAppointments = confirmed;
      this.confirmedAppointments = [...confirmed];
    });
  }

  applyDateFilter() {
    const formatDate = (dateStr: string) => new Date(dateStr).toISOString().split('T')[0];

    let fromDate: string | null = null;
    let toDate: string | null = null;

    if (this.dateFilter === 'today') {
      const today = formatDate(new Date().toISOString());
      fromDate = toDate = today;
    } else if (this.dateFilter === 'yesterday') {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const y = formatDate(yesterday.toISOString());
      fromDate = toDate = y;
    } else if (this.dateFilter === 'custom' && this.customDateFrom && this.customDateTo) {
      fromDate = formatDate(this.customDateFrom);
      toDate = formatDate(this.customDateTo);
    }

    if (fromDate && toDate) {
      this.pendingAppointments = this.allPendingAppointments.filter(a => {
        const date = formatDate(a.appointmentDate);
        return date >= fromDate && date <= toDate;
      });

      this.confirmedAppointments = this.allConfirmedAppointments.filter(a => {
        const date = formatDate(a.appointmentDate);
        return date >= fromDate && date <= toDate;
      });
    }
  }

  clearDateFilter() {
    this.dateFilter = '';
    this.customDateFrom = '';
    this.customDateTo = '';
    this.pendingAppointments = [...this.allPendingAppointments];
    this.confirmedAppointments = [...this.allConfirmedAppointments];
  }

  confirmAppointment(id: number) {
    this.appointmentService.confirmAppointment(id).subscribe({
      next: () => {
        this.toastMessage = 'Appointment confirmed ✅';
        this.showToast = true;
        setTimeout(() => this.showToast = false, 3000);

        forkJoin({
          pending: this.doctorService.getAppointmentsByDoctorAndStatus(this.doctorId, 'Pending'),
          confirmed: this.doctorService.getAppointmentsByDoctorAndStatus(this.doctorId, 'Confirmed')
        }).subscribe(({ pending, confirmed }) => {
          this.allPendingAppointments = pending;
          this.pendingAppointments = [...pending];
          this.allConfirmedAppointments = confirmed;
          this.confirmedAppointments = [...confirmed];
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Failed to confirm appointment:', err);
      }
    });
  }

  get filteredPendingAppointments() {
    return this.pendingAppointments.filter(a =>
      a.patientName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedPendingAppointments() {
    const start = (this.pendingPage - 1) * this.entriesPerPage;
    return this.filteredPendingAppointments.slice(start, start + this.entriesPerPage);
  }

  get filteredConfirmedAppointments() {
    return this.confirmedAppointments.filter(a =>
      a.patientName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedConfirmedAppointments() {
    const start = (this.confirmedPage - 1) * this.entriesPerPage;
    return this.filteredConfirmedAppointments.slice(start, start + this.entriesPerPage);
  }

  get totalPendingPages() {
    return Math.ceil(this.filteredPendingAppointments.length / this.entriesPerPage);
  }

  get totalConfirmedPages() {
    return Math.ceil(this.filteredConfirmedAppointments.length / this.entriesPerPage);
  }

  changePage(tab: 'pending' | 'confirmed', page: number) {
    if (tab === 'pending') this.pendingPage = page;
    else this.confirmedPage = page;
  }

  getProfileImageUrl(): string {
    return `https://localhost:7243/api/Doctor/${this.doctorId}/profile-image?ts=${Date.now()}`;
  }

  get totalAppointments(): number {
    return this.allPendingAppointments.length + this.allConfirmedAppointments.length;
  }

  get mostCommonService(): string {
    const types = [...this.allPendingAppointments, ...this.allConfirmedAppointments].map(a => a.type);
    const freq: Record<string, number> = {};
    types.forEach(t => freq[t] = (freq[t] || 0) + 1);
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'N/A';
  }

  get averageAppointmentsPerDay(): string {
    const all = [...this.allPendingAppointments, ...this.allConfirmedAppointments];
    const days = new Set(all.map(a => new Date(a.appointmentDate).toDateString()));
    const avg = days.size ? (all.length / days.size).toFixed(1) : '0';
    return `${avg} per day`;
  }
}
