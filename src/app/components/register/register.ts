import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/Auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  form!: FormGroup;
  roles: any[] = [];
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roleId: [null, Validators.required]
    });

    this.auth.getRoles().subscribe({
      next: res => this.roles = res,
      error: err => console.error('Failed to load roles', err)
    });
  }

  register() {
    if (this.form.valid) {
      const payload = this.form.value;

      this.auth.register(payload).subscribe({
        next: (res) => {
          console.log('Registration response:', res);

          //  Logss the user in immediately
          this.auth.setLogin(res.userId.toString(), res.role, res.token);

          // Normalize role name for routing
          const roleMap: any = {
            doctor: 'doctor',
            gynacologist: 'gynacologist',
            gynaecologist: 'gynacologist',
            gynecologist: 'gynacologist',
            consultant: 'consultant',
            nurse: 'nurse',
            patient: 'patient'
          };

          const rolePath = roleMap[res.role.toLowerCase()] || 'dashboard';
          console.log('Redirecting to:', `/onboarding/${rolePath}/${res.userId}`);

          //  Redirect to role-specific onboarding
          this.router.navigate([`/onboarding/${rolePath}/${res.userId}`]);
        },
        error: err => {
          console.error('Registration error:', err);
          this.error = err.error?.message || 'Registration failed';
        }
      });
    }
  }
}
