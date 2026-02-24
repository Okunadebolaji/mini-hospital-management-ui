import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';
import { NavbarComponent } from '../navbar/navbar';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent],
  templateUrl: './dashboard-layout.html',
  styleUrls: ['./dashboard-layout.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardLayoutComponent implements OnInit {
  isAdmin = localStorage.getItem('userRole') === 'Admin';
  isSidebarCollapsed = false;
  isMobile = false;
  sidebarOpen = true;

ngOnInit(): void {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile.bind(this));
  }



  checkMobile(): void {
    this.isMobile = window.innerWidth < 768;
  }

toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
}
  // toggleSidebar() {
  //   this.sidebarOpen = !this.sidebarOpen;
  // }
}
