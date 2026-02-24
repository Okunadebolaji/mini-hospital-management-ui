import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { AppointmentService } from '../../../services/Appointment.service';
import { AppointmentListComponent } from '../../appointment-list/appointment-list';


@Component({
  selector: 'app-appointment-page',
  standalone:true,
  imports: [AppointmentListComponent],
  templateUrl: './appointment-page.html',
  styleUrl: './appointment-page.css'
})
export class AppointmentPage implements OnInit {
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe((data: any[]) => {
      this.appointments = data;
      console.log(this.appointments);
    });
  }
}
