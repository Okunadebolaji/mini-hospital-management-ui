import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorAdmissionsService } from '../../services/doctor';
import { AuthService } from '../../services/Auth';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  userName = '';
  profileImage: string = 'assets/Images/avatar-1577909_1280.png';
  isLoggedIn = false;
   @Input() isSidebarCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    private router: Router,
    private doctorService: DoctorAdmissionsService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef

  ) {}

 ngOnInit(): void {
  const role = localStorage.getItem('userRole');
  if (role !== 'Admin') {
    return; // ✅ Prevent non-admins from triggering anything
  }

  this.auth.isLoggedIn$.subscribe(isLogged => {
    this.isLoggedIn = isLogged;
    this.userName = isLogged ? (localStorage.getItem('userName') || '') : 'Guest';
  });

  this.auth.profileImage$.subscribe(img => {
    this.profileImage = img;
  });

  const doctorId = localStorage.getItem('doctorId');
  if (doctorId) {
    this.auth.refreshProfileImage(+doctorId, this.doctorService);
  }
}



  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
