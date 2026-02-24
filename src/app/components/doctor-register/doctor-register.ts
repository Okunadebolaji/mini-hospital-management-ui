import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/Auth';
import { HttpClient } from '@angular/common/http';
import { MenuService } from '../../services/menu';


@Component({
  selector: 'app-doctor-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-register.html',
  styleUrl: './doctor-register.css'
})
export class DoctorRegister implements OnInit{
form!: FormGroup;
error = '';

constructor(
  private fb: FormBuilder,
  private http: HttpClient,
  private menuService: MenuService,
  private router: Router
) {}

ngOnInit() {
  const userId = Number(localStorage.getItem('userId'));

  this.form = this.fb.group({
    fullName: ['', Validators.required],
    specialty: ['', Validators.required],
    phone: ['', Validators.required],
    userId: [userId, Validators.required]
  });
}


submit() {
  if (this.form.valid) {
    this.http.post('https://localhost:7243/api/Doctor', this.form.value).subscribe({
      next: () => {
        const userId = Number(localStorage.getItem('userId'));

        this.menuService.getMenuByUserId(userId).subscribe({
          next: menu => {
            const defaultRoute = menu[0]?.route || '/doctors';
            this.router.navigate([defaultRoute]);
          },
          error: err => {
            console.error('Menu fetch failed', err);
            this.router.navigate(['/doctors']);
          }
        });
      },
      error: err => this.error = err.error
    });
  }
}


}
