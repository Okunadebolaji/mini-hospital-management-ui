import { PatientService } from './../../services/patients';
import { FormsModule } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentService } from '../../services/Appointment.service';
import { DoctorAdmissionsService } from '../../services/doctor';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './appointment-list.html',
  styleUrls: ['./appointment-list.css']
})
export class AppointmentListComponent implements OnInit {
  @Input() appointments: any[] = [];
  @Input() showNewButton: boolean = true;

  doctors: any[] = [];
  patients: any[] = [];

  searchTerm: string = '';
  entriesToShow: number = 10;
  currentPage: number = 1;
  showModal = false;
  loading = false;
  toastMessage?: string;
  showToast = false;

  activeTab: 'all' | 'pending' | 'confirmed' = 'all';
  selectedAppointment: any = null;

  dateFilterFrom: string = '';
  dateFilterTo: string = '';

  // ✅ New appointment form model
  newAppointment: any = {
    doctorId: null,
    patientId: null,
    appointmentDate: '',
    type: '',
    fee: null,
    notes: ''
  };

  constructor(
    private appointmentService: AppointmentService,
    private doctoradmissionsService: DoctorAdmissionsService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.loadDoctors();
    this.loadPatients();
  }

  // ✅ Load appointments from API
  loadAppointments() {
    this.loading = true;
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
        this.loading = false;
      }
    });
  }

  // ✅ Load doctors
  loadDoctors() {
    this.doctoradmissionsService.getDoctors().subscribe({
      next: (data) => (this.doctors = data),
      error: (err) => console.error('Error loading doctors:', err)
    });
  }

  // ✅ Load patients
  loadPatients() {
    this.patientService.getAllPatients().subscribe({
      next: (data) => (this.patients = data),
      error: (err) => console.error('Error loading patients:', err)
    });
  }

  // ✅ Filter appointments by search, tab, and date range
  get filteredAppointments() {
    return this.appointments.filter((appt) => {
      const matchesSearch = appt.patientName
        ?.toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const status = (appt.status || '').toLowerCase();

      const matchesTab =
        this.activeTab === 'all' ||
        (this.activeTab === 'pending' && status === 'pending') ||
        (this.activeTab === 'confirmed' &&
          ['confirmed', 'completed'].includes(status));

      const matchesDate =
        (!this.dateFilterFrom || new Date(appt.appointmentDate) >= new Date(this.dateFilterFrom)) &&
        (!this.dateFilterTo || new Date(appt.appointmentDate) <= new Date(this.dateFilterTo));

      return matchesSearch && matchesTab && matchesDate;
    });
  }

  // ✅ Pagination
  get paginatedAppointments() {
    const start = (this.currentPage - 1) * this.entriesToShow;
    return this.filteredAppointments.slice(start, start + this.entriesToShow);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAppointments.length / this.entriesToShow);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // ✅ Modal handling for details
  openAppointmentModal(appt: any) {
    this.selectedAppointment = appt;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedAppointment = null;
  }

  // ✅ Countdown to appointment
  getCountdown(apptDate: string): string {
    const now = new Date().getTime();
    const target = new Date(apptDate).getTime();
    const diff = target - now;

    if (diff <= 0) return 'Appointment time has passed';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m remaining`;
  }

  // ✅ Dynamic status badge class
  getStatusClass(status: string | null | undefined): string {
    const s = (status || '').trim().toLowerCase();

    switch (s) {
      case 'pending':
        return 'bg-warning text-dark';
      case 'completed':
      case 'confirmed':
        return 'bg-success';
      default:
        return 'bg-secondary'; // fallback for unknown statuses
    }
  }

  // ✅ Toast notification
  showSuccessToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 4000);
  }

  // ✅ Submit new appointment
 submitAppointment() {
  this.loading = true;
  this.appointmentService.createAppointment(this.newAppointment).subscribe({
    next: (response) => {
      // Map doctor/patient names immediately
      const doctor = this.doctors.find(d => d.doctorId === response.doctorId);
      const patient = this.patients.find(p => p.id === response.patientId);

      const mapped = {
        ...response,
        doctorName: doctor ? doctor.name : 'Unknown Doctor',
        patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient',
        diagnosis: response.notes
      };

      this.appointments.unshift(mapped); // ✅ top of list

      this.loading = false;
      this.newAppointment = {
        doctorId: null,
        patientId: null,
        appointmentDate: '',
        type: '',
        fee: null,
        notes: ''
      };

      this.showSuccessToast('Appointment successfully created ✅');
    },
    error: (err) => {
      console.error('Error saving appointment:', err);
      alert('❌ Failed to save appointment.');
      this.loading = false;
    }
  });
}

}
