import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  path: string;
  icon?: string;
  canView?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent implements OnInit {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  menuItems: MenuItem[] = [];
  isMobile = false;

  role = localStorage.getItem('userRole');
  doctorId = localStorage.getItem('doctorId');

  ngOnInit(): void {
    const storedMenu = localStorage.getItem('menu');
    this.menuItems = storedMenu ? JSON.parse(storedMenu) : [];
    this.menuItems = this.menuItems.filter((item: MenuItem) => item.canView !== false);
    this.isMobile = window.innerWidth < 768;

    if (!this.menuItems.length) {
      this.menuItems = this.getLinks();
    }
  }

  onToggle(): void {
    this.toggle.emit();
  }

  getLinks(): MenuItem[] {
    switch (this.role) {
      case 'Doctor':
        return [
          { label: 'Assigned Patients', path: `/doctor/${this.doctorId}/assigned-patients`, icon: 'bi bi-people-fill' },
          { label: 'Upload Profile Picture', path: `/doctor/${this.doctorId}/upload-profile`, icon: 'bi bi-upload' }
        ];
      case 'Nurse':
        return [{ label: 'Dashboard', path: '/nurse/dashboard', icon: 'bi bi-speedometer2' }];
      case 'Gynaecologist':
        return [{ label: 'Dashboard', path: '/gyn/dashboard', icon: 'bi bi-speedometer2' }];
      case 'Ophthalmologist':
        return [{ label: 'Dashboard', path: '/eye/dashboard', icon: 'bi bi-speedometer2' }];
      case 'Dentist':
        return [{ label: 'Dashboard', path: '/dentist/dashboard', icon: 'bi bi-speedometer2' }];
      case 'Consultant':
        return [{ label: 'Dashboard', path: '/consult/dashboard', icon: 'bi bi-speedometer2' }];
      default:
        return [{ label: 'Dashboard', path: '/dashboard', icon: 'bi bi-speedometer2' }];
    }
  }
}
