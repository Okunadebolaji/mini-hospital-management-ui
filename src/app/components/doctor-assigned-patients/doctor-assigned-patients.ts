// doctor-assigned-patients.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-assigned-patients',
  standalone: true,
  imports:[CommonModule,RouterModule],
  templateUrl: './doctor-assigned-patients.html',
  styleUrls: ['./doctor-assigned-patients.css']
})
export class DoctorAssignedPatientsComponent implements OnInit {
  patients: any[] = [];
  loading = true;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Grab doctorId from route params
    const doctorId = this.route.snapshot.paramMap.get('id');

    if (doctorId) {
      this.http.get(`https://localhost:7243/api/Doctor/with-admissions/${doctorId}`)
        .subscribe({
          next: (data: any) => {
            this.patients = data.admissions ?? [];
            this.loading = false;
          },
          error: () => this.loading = false
        });
    } else {
      this.loading = false;
    }
  }
}
