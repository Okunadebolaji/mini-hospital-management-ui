import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/Auth';
import { ToastrService } from 'ngx-toastr';
import { DoctorAdmissionsService } from '../../services/doctor';
import { DomSanitizer } from '@angular/platform-browser';
import { PatientService } from '../../services/patients';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  form!: FormGroup;
  error = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private doctorService: DoctorAdmissionsService,
    private patientService: PatientService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.form.invalid) {
      this.toastr.error('Please fill in all fields', 'Validation Error', {
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-top-right',
        toastClass: 'ngx-toastr custom-toast-error'
      });
      return;
    }

    this.loading = true;
    const payload = this.form.value;

    this.auth.login(payload).subscribe({
      next: (res: any) => {
        this.toastr.success(`Welcome ${res.name}`, 'Login Successful', {
          toastClass: 'ngx-toastr custom-toast-success',
          timeOut: 3000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right'

        });

        try {
          const normalizedMenu = (res.menu || []).map((item: any) => ({
            ...item,
            canView: item.canView ?? (item.canEdit || item.canDelete) ?? false,
            canEdit: item.canEdit ?? false,
            canDelete: item.canDelete ?? false
          }));
          localStorage.setItem('menu', JSON.stringify(normalizedMenu));
        } catch (e) {
          console.error('Failed to normalize and save menu:', e);
        }

        localStorage.setItem('authToken', res.token);
        localStorage.setItem('userRole', res.role);
        localStorage.setItem('userId', res.userId.toString());
        localStorage.setItem('userName', res.name);

        const role = (res.role || '').trim().toLowerCase();

        switch (role) {
          case 'admin':
            this.auth.setLogin(res.userId.toString(), 'Admin', res.token);
            this.router.navigate(['/admin/dashboard']);
            break;

          case 'doctor':
          case 'gynaecologist':
          case 'ophthalmologist':
          case 'dentist':
          case 'consultant': {
            const userIdNum = Number(res.userId);
            const specialty = res.role.charAt(0).toUpperCase() + res.role.slice(1).toLowerCase();

            this.doctorService.getDoctorByUserId(userIdNum).subscribe({
              next: (doctor: any) => {
                if (!doctor || !doctor.doctorId) {
                  this.toastr.error('Doctor profile missing', 'Error', {
                    timeOut: 3000,
                    progressBar: true,
                    closeButton: true,
                    positionClass: 'toast-top-right',
                    toastClass: 'ngx-toastr custom-toast-error'
                  });
                  this.router.navigate(['/admin/doctors']);
                  this.loading = false;
                  return;
                }

                localStorage.setItem('doctorId', String(doctor.doctorId));
                localStorage.setItem('userName', doctor.name ?? res.name);

                this.doctorService.getDoctorProfileImage(doctor.doctorId).subscribe({
                  next: (blob) => {
                    const objectURL = URL.createObjectURL(blob);
                    const safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                    this.auth.setLogin(String(res.userId), res.role, res.token, safeUrl as unknown as string);
                  },
                  error: () => {
                    this.auth.setLogin(String(res.userId), res.role, res.token, 'assets/Images/avatar-1577909_1280.png');
                  }
                });

                this.router.navigate([`/role/doctors/${doctor.doctorId}`]);
                this.loading = false;
              },
              error: (err) => {
                console.error('Doctor lookup failed:', err);
                this.toastr.error(`${res.role} profile not found`, 'Error', {
                  timeOut: 3000,
                  progressBar: true,
                  closeButton: true,
                  positionClass: 'toast-top-right',
                  toastClass: 'ngx-toastr custom-toast-error'
                });
                this.router.navigate([`/role/onboarding/doctor/${userIdNum}`]);
                this.loading = false;
              }
            });
            break;
          }

          case 'nurse':
            this.auth.setLogin(res.userId.toString(), 'Nurse', res.token);
            this.router.navigate(['/role/nurse/dashboard']);
            this.loading = false;
            break;

          case 'pharmacist':
            this.auth.setLogin(res.userId.toString(), 'Pharmacist', res.token);
            this.router.navigate(['/role/pharmacy/dashboard']);
            this.loading = false;
            break;

          case 'patient':
            this.auth.setLogin(res.userId.toString(), 'Patient', res.token);
            this.router.navigate(['/role/patient/dashboard']);
            this.loading = false;
            break;

          default:
            this.auth.setLogin(res.userId.toString(), res.role, res.token);
            this.router.navigate(['/home']);
            this.loading = false;
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.error = 'Invalid credentials';
        this.toastr.error(this.error, 'Login Failed', {
          timeOut: 4000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-right',
          toastClass: 'ngx-toastr custom-toast-error'
        });
        this.loading = false;
      }
    });
  }
}
