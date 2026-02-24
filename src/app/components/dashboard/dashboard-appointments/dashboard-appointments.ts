import { Component, OnChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../services/Appointment.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard-appointments.html',
  styleUrls: ['./dashboard-appointments.css']
})
export class DashboardAppointmentsComponent implements OnChanges {
  @Input() appointments: any[] = [];
  @Input() todaysAppointments: any[] = [];

  appointmentForm: FormGroup;
  loading = false;
  error?: string;
  currentUpcomingIndex = 0;

  constructor(
    private appointmentService: AppointmentService,
    private fb: FormBuilder
  ) {
    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      type: ['', Validators.required],
      doctorName: ['', Validators.required],
      appointmentDate: ['', Validators.required]
    });
  }

  ngOnChanges() {
    console.log('Upcoming:', this.appointments);
    console.log('Today:', this.todaysAppointments);
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) return;

    this.loading = true;
    const newAppointment = this.appointmentForm.value;

    this.appointmentService.createAppointment(newAppointment).subscribe({
      next: () => {
        this.loading = false;
        alert('Appointment created successfully!');
        this.appointmentForm.reset();

        const modalEl = document.getElementById('appointmentModal');
        if (modalEl) {
          (window as any).bootstrap.Modal.getInstance(modalEl)?.hide();
        }

        this.appointmentService.getUpcomingAppointments().subscribe({
          next: (data) => {
            this.appointments = data;
            this.currentUpcomingIndex = 0;
          }
        });
        this.appointmentService.getTodaysAppointments().subscribe({
          next: (data) => this.todaysAppointments = data
        });
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to create appointment';
        console.error(err);
      }
    });
  }

  nextUpcoming() {
    if (this.currentUpcomingIndex < this.appointments.length - 1) {
      this.currentUpcomingIndex++;
    }
  }

  checkUpcoming() {
    this.appointments.splice(this.currentUpcomingIndex, 1);
    if (this.currentUpcomingIndex >= this.appointments.length) {
      this.currentUpcomingIndex = 0;
    }
  }
}
