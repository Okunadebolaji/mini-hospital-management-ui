import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HomeService } from '../../services/home';
import { DoctorAdmissionsService } from '../../services/doctor';
import { Doctor } from '../../Models/doctor-model.dto';
import { FormsModule } from '@angular/forms';

const initialPatient = {
  username: '',
  password: '',
  role: 'Patient',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  phoneNumber: '',
  email: '',
  address: '',
  emergencyContact: '',
  bloodType: '',
  allergies: ''
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  isSubmitting = false;
  doctors: Doctor[] = [];
  patient = { ...initialPatient };

  galleryImages: string[] = [
    'assets/Images/hospital-4904920.jpg',
    'assets/Images/pexels-pixabay-207601.jpg',
    'assets/Images/pexels-shvetsa-4226123.jpg',
    'assets/Images/pexels-jonathanborba-3279209.jpg',
    'assets/Images/rescue-service-4975223.jpg',
    'assets/Images/skin-2404163.jpg'
  ];

  testimonials = [
    {
      name: 'Tunde Okoro',
      quote: 'The care I received was exceptional. Dr. Habeeb truly saved my life.',
      date: 'Oct 2025'
    },
    {
      name: 'Amina Yusuf',
      quote: 'The nurses were so kind and attentive. I felt safe every step of the way.',
      date: 'Sep 2025'
    },
    {
      name: 'Chinedu Eze',
      quote: 'Dr. Mobolaji explained everything clearly. I’ve never felt more reassured.',
      date: 'Aug 2025'
    }
  ];

  constructor(
    private homeService: HomeService,
    private doctorAdmissionsService: DoctorAdmissionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.homeService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;

        this.doctors.forEach(d => {
          this.doctorAdmissionsService.getDoctorProfileImage(d.doctorId).subscribe({
            next: (imgBlob: Blob) => {
              const objectURL = URL.createObjectURL(imgBlob);
              d.profileImageUrl = objectURL;
            },
            error: () => {
              d.profileImageUrl = 'assets/Images/avatar-1577909_1280.png';
            }
          });
        });
      },
      error: () => {
        console.warn('Failed to load doctors from backend.');
      }
    });
  }

  registerPatient() {
  this.isSubmitting = true;

  if (!this.patient.dateOfBirth) {
    alert('Please select your date of birth.');
    this.isSubmitting = false;
    return;
  }

  console.log('Registering patient with:', this.patient);

  this.homeService.registerPatientWithUser(this.patient).subscribe({
    next: (response: any) => {
      alert('Registration successful!');
      this.patient = { ...initialPatient };
      this.isSubmitting = false;

      // ✅ Store full user context
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('userId', response.userId.toString());

      this.router.navigateByUrl('/patient/dashboard');
    },

    error: (err) => {
      console.error('Registration error:', err);
      alert('Registration failed. Please try again.');
      this.isSubmitting = false;
    }
  });
}

}
