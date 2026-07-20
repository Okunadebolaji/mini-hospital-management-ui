import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-navbar.html',
  styleUrls: ['./role-navbar.css']
})
export class RoleNavbarComponent {
  userRole = localStorage.getItem('userRole');
  userName = localStorage.getItem('userName');
  profileImageUrl = localStorage.getItem('profileImageUrl') || 'assets/default-avatar.png';

  logout(): void {
    localStorage.clear();
    window.location.href = '/auth/login';
  }
}
