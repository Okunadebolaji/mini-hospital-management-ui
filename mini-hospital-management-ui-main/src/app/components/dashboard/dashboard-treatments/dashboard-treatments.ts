import { Component, OnChanges,Input } from '@angular/core';
import { AppointmentService } from '../../../services/Appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-treatments',
  imports: [CommonModule],
  templateUrl: './dashboard-treatments.html',
  styleUrl: './dashboard-treatments.css'
})
export class DashboardTreatmentsComponent implements OnChanges {
  @Input() treatments: any[] = [];
  public Math = Math;


  ngOnChanges() {
    console.log('Treatments received:', this.treatments);
  }

  getProgressColor(treatment: string): string {
  switch (treatment?.toLowerCase()) {
    case 'consultation': return 'bg-success';
    case 'procedure': return 'bg-warning';
    case 'scan': return 'bg-info';
    default: return 'bg-secondary';
  }
}

}
