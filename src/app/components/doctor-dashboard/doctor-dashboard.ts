import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorAdmissionsService } from '../../services/doctor';
import { DoctorWithAdmissionsDto } from '../../Models/doctor-with-admissions.dto';
import { DoctorService } from '../../services/doctor.service';
import { RoleService } from '../../services/role';
import { AuthService } from '../../services/Auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule,FormsModule],
  templateUrl: './doctor-dashboard.html',
  styleUrls: ['./doctor-dashboard.css']
})
export class DoctorDashboardComponent implements OnInit {
  doctors: DoctorWithAdmissionsDto[] = [];
  filteredDoctors: DoctorWithAdmissionsDto[] = [];
  loading = false;
  error?: string;
  errors: string[] = [];
 roles: { roleId: number; roleName: string }[] = [];


  showModal = false;
  form!: FormGroup;
  profileImage!: File;
  toastMessage?: string;
  showToast = false;

  entriesPerPage = 6;
  currentPage = 1;
  searchTerm = '';
  selectedRoleId: number | null = null;

  constructor(
    private doctorService: DoctorAdmissionsService,
    private fb: FormBuilder,
    private doctorsService: DoctorService,
    private roleService: RoleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();

    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roleId: [null, Validators.required],
      name: ['', Validators.required],
      specialty: ['', Validators.required],
      phone: ['']
    });

    this.roleService.getRoles().subscribe({
  next: (data: { roleId: number; roleName: string }[]) => {
    this.roles = data.filter(role =>
      role.roleName !== 'Nurse' && role.roleName !== 'Patient' && role.roleName !=='Admin'
    );
  }
});



  }

  get paginatedDoctors(): DoctorWithAdmissionsDto[] {
    const start = (this.currentPage - 1) * this.entriesPerPage;
    return this.filteredDoctors.slice(start, start + this.entriesPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredDoctors.length / this.entriesPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get mostAppointmentsDoctor(): string {
    if (!this.doctors.length) return 'N/A';
    const sorted = [...this.doctors].sort((a, b) => (b.admissions?.length ?? 0) - (a.admissions?.length ?? 0));
    const top = sorted[0];
    return `${top.name} (${top.admissions?.length ?? 0})`;
  }

  filterDoctors() {
    this.filteredDoctors = this.doctors.filter(doc => {
      const matchesName = doc.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesRole = this.selectedRoleId ? doc.roleId === this.selectedRoleId : true;
      return matchesName && matchesRole;
    });
    this.currentPage = 1;
  }

  showSuccessToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 5000);
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.filteredDoctors = [...data];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load doctors.';
        this.loading = false;
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profileImage = input.files[0];
    }
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;

      const userPayload = {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
        roleId: this.form.value.roleId
      };

      this.authService.register(userPayload).subscribe({
        next: (user) => {
          const doctorPayload = {
            name: this.form.value.name,
            specialty: this.form.value.specialty,
            phone: this.form.value.phone,
            email: this.form.value.email,
            roleId: this.form.value.roleId,
            userId: user.userId
          };

          this.doctorService.createDoctor(doctorPayload).subscribe({
            next: (doctor) => {
              if (this.profileImage) {
                const formData = new FormData();
                formData.append('file', this.profileImage);

                this.doctorsService.uploadProfileImage(doctor.doctorId, formData).subscribe({
                  next: () => this.finalizeSave(),
                  error: () => this.finalizeSave()
                });
              } else {
                this.finalizeSave();
              }
            },
            error: (err: any) => {
              this.error = err.error || 'Failed to save doctor profile';
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

  private finalizeSave() {
    this.loadDoctors();
    this.loading = false;
    this.showModal = false;
    this.showSuccessToast('Doctor successfully uploaded ✅');
  }
}
