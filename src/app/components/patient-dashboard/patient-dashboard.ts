import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patients';
import { Patient } from '../../Models/patient-model.dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/Auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './patient-dashboard.html',
  styleUrls: ['./patient-dashboard.css']
})
export class PatientDashboardComponent implements OnInit {
  patients: Patient[] = [];
  showModal = false;
  form!: FormGroup;
  error?: string;
  loading = false;

  // ✅ Toast
  toastMessage?: string;
  showToast = false;

  // ✅ Pagination + search
  searchTerm: string = '';
  entriesToShow: number = 10;
  currentPage: number = 1;

  constructor(
    private patientService: PatientService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPatients();

    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: [null, Validators.required],
      gender: ['', Validators.required],
      phoneNumber: [''],
      bloodType: [''],
      allergies: [''],
      address: [''],
      emergencyContact: ['']
    });
  }

  loadPatients() {
    this.patientService.getAllPatients().subscribe({
      next: (data) => {
        this.patients = data;
      },
      error: (err) => {
        console.error('Failed to load patients:', err);
        alert('Failed to load patients.');
      }
    });
  }

  // ✅ Filter + pagination
  get filteredPatients() {
    return this.patients.filter(p =>
      (p.firstName + ' ' + p.lastName).toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedPatients() {
    const start = (this.currentPage - 1) * this.entriesToShow;
    return this.filteredPatients.slice(start, start + this.entriesToShow);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPatients.length / this.entriesToShow);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // ✅ Toast helper
  showSuccessToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 4000);
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;

      const userPayload = {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
        roleId: 7
      };

      this.authService.register(userPayload).subscribe({
        next: (user) => {
          const patientPayload = {
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            dateOfBirth: this.form.value.dob,
            gender: this.form.value.gender,
            phoneNumber: this.form.value.phoneNumber,
            bloodType: this.form.value.bloodType,
            allergies: this.form.value.allergies,
            address: this.form.value.address,
            emergencyContact: this.form.value.emergencyContact,
            userId: user.userId,
            email: this.form.value.email
          };

          this.patientService.createPatient(patientPayload).subscribe({
            next: () => {
              this.loadPatients();
              this.loading = false;
              this.showModal = false;
              this.showSuccessToast('Patient successfully created ✅');
              this.form.reset();
            },
            error: (err: any) => {
              this.error = err.error || 'Failed to save patient profile';
              this.loading = false;
            }
          });
        },
        error: (err: any) => {
          this.error = err.error || 'Failed to register user';
          this.loading = false;
        }
      });
    }
  }
}
