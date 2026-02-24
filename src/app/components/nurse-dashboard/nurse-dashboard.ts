import { Component, OnInit } from '@angular/core';
import { NurseAssignmentService } from '../../services/nurse-assignment';
import { NurseImageService } from '../../services/nurse-image.service';
import { AuthService } from '../../services/Auth';
import { RoleService } from '../../services/role';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nurse-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './nurse-dashboard.html',
  styleUrls: ['./nurse-dashboard.css']
})
export class NurseDashboard implements OnInit {
  nurses: any[] = [];
  loading = true;
  error: string | null = null;

  form!: FormGroup;
  profileImage!: File;
  showModal = false;
  toastMessage?: string;
  showToast = false;
  roles: { roleId: number; roleName: string }[] = [];

  constructor(
    private nurseAssignmentService: NurseAssignmentService,
    private nurseImageService: NurseImageService,
    private authService: AuthService,
    private roleService: RoleService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadNurses();

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
      next: (data: any[]) => {
        this.roles = data.filter(role => role.roleName === 'Nurse');
      },
      error: (err: any) => console.error(err)
    });
  }
openModal() {
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
}

 loadNurses(): void {
    this.nurseAssignmentService.getNurses().subscribe({
      next: (data: any[]) => {
        this.nurses = data;

        this.nurses.forEach(nurse => {
          this.nurseImageService.getNurseImage(nurse.nurseId).subscribe({
            next: (blob: Blob) => {
              nurse.imageUrl = URL.createObjectURL(blob);
            },
            error: () => {
              nurse.imageUrl = 'assets/Images/avatar-1577909_1280.png';
            }
          });
        });

        this.loading = false;
      },
      error: (err: any) => { // Added : any here
        this.error = 'Failed to load nurses.';
        this.loading = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profileImage = input.files[0];
    }
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;

      const userPayload = {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
        roleId: this.form.value.roleId
      };

      this.authService.register(userPayload).subscribe({
        next: (user: any) => {
          const nursePayload = {
            name: this.form.value.name,
            specialty: this.form.value.specialty,
            phone: this.form.value.phone,
            email: this.form.value.email,
            roleId: this.form.value.roleId,
            userId: user.userId
          };

          this.nurseAssignmentService.createNurse(nursePayload).subscribe({
            next: (nurse: any) => { // Added : any here
              if (this.profileImage) {
                this.nurseImageService.uploadNurseImage(nurse.nurseId, this.profileImage).subscribe({
                  next: () => this.finalizeSave(),
                  error: () => this.finalizeSave()
                });
              } else {
                this.finalizeSave();
              }
            },
            error: (err: any) => { // Added : any here
              this.error = err.error || 'Failed to save nurse profile';
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

  private finalizeSave(): void {
    this.loadNurses();
    this.loading = false;
    this.showModal = false;
    this.toastMessage = 'Nurse successfully uploaded ✅';
    this.showToast = true;
    setTimeout(() => this.showToast = false, 5000);
  }
}
