import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { ThemeService } from './services/theme';
import { NavbarComponent } from './components/navbar/navbar';
import { SidebarComponent } from './components/sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet,RouterModule,CommonModule ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  test = 'Hello from Dashboard';
  sidebarOpen = true;
  protected readonly title = signal('hospital-management-ui');

  constructor(public themeService: ThemeService, private router: Router) {}

  // ngOnInit() {
  //   const devMode = false;

  //   if (devMode) {
  //     localStorage.setItem('userRole', 'Doctor');
  //     localStorage.setItem('userId', '9'); // Mobolaji's ID
  //     localStorage.setItem('menu', JSON.stringify([
  //       { name: 'Doctor Dashboard', route: '/doctor/dashboard', canView: true },
  //       { name: 'Doctor Detail', route: '/doctor', canView: true }
  //     ]));
  //     this.router.navigate(['/doctor/9']);
  //   }
  // }

  get isDarkMode(): boolean {
    return document.body.classList.contains('dark-mode');
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }

  logout() {
    localStorage.clear(); // or call AuthService.logout()
    this.router.navigate(['/login']);
  }

  // toggleSidebar(): void {
  //   this.sidebarOpen = !this.sidebarOpen;
  // }
}
