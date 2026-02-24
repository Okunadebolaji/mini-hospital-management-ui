import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor.service';
import { DoctorAdmissionsService } from '../../services/doctor';
import { AuthService } from '../../services/Auth';

@Component({
  selector: 'app-doctor-onboarding',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-onboarding.html',
  styleUrl: './doctor-onboarding.css'
})
export class DoctorOnboarding {
  form!: FormGroup;
  userId!: string;
  error = '';
  loading = false;
  profileImage!: File;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private doctorAdmissionsService: DoctorAdmissionsService,
    private auth: AuthService // ✅ Injected
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      name: ['', Validators.required],
      specialty: ['Doctor', Validators.required],
      phone: [''],
      email: ['', [Validators.email]]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profileImage = input.files[0];
      console.log('Selected image:', this.profileImage.name);
    }
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;
      const payload = this.form.value;

      this.doctorService.saveDoctorProfile(this.userId, payload).subscribe({
        next: () => {
          this.doctorAdmissionsService.getDoctorByUserId(+this.userId).subscribe({
            next: doctor => {
              if (!doctor || !doctor.doctorId) {
                this.error = 'Profile saved, but doctor record not found.';
                this.loading = false;
                return;
              }

              const doctorId = doctor.doctorId;
              localStorage.setItem('doctorId', doctorId.toString());

              if (this.profileImage) {
                const formData = new FormData();
                formData.append('file', this.profileImage);

                this.doctorService.uploadProfileImage(doctorId, formData).subscribe({
                  next: () => {
                    this.auth.refreshProfileImage(doctorId, this.doctorAdmissionsService); // ✅ Refresh navbar image
                    setTimeout(() => {
                      this.loading = false;
                      this.router.navigate(['/doctor', doctorId]);
                    }, 500);
                  },
                  error: err => {
                    console.error('Image upload failed:', err);
                    this.loading = false;
                    this.router.navigate(['/doctor', doctorId]);
                  }
                });
              } else {
                this.auth.refreshProfileImage(doctorId, this.doctorAdmissionsService); // ✅ Still refresh if no image uploaded
                this.loading = false;
                this.router.navigate(['/doctor', doctorId]);
              }
            },
            error: err => {
              this.error = 'Profile saved, but failed to load doctor details.';
              this.loading = false;
            }
          });
        },
        error: err => {
          this.error = err.error || 'Failed to save profile';
          this.loading = false;
        }
      });
    }
  }
}
