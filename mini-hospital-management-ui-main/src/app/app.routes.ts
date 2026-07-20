import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './components/public-layout/public-layout';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout';
import { NavbarOnlyLayout } from './components/navbar-only-layout/navbar-only-layout';
import { DashboardComponent } from './components/dashboard/dashboard';
import { AppointmentPage } from './components/dashboard/appointment-page/appointment-page';
import { PatientMainDashboardComponent } from './components/patient-main-dashboard/patient-main-dashboard';

export const routes: Routes = [
  // 🌐 Public Layout (Homepage, Auth)
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home').then(m => m.HomeComponent)
      },
      {
        path: 'auth/login',
        loadComponent: () =>
          import('./components/login/login').then(m => m.Login)
      },
      {
        path: 'auth/register',
        loadComponent: () =>
          import('./components/register/register').then(m => m.Register)
      }
    ]
  },

  // 🔐 Admin Layout (Sidebar + Admin Navbar)
  {
    path: 'admin',
    component: DashboardLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'appointments',
        loadComponent: () =>
          import('./components/dashboard/appointment-page/appointment-page').then(
            m => m.AppointmentPage
          )
      },
      {
        path: 'patients/:id',
        loadComponent: () =>
          import('./components/patient-main-dashboard/patient-main-dashboard').then(
            m => m.PatientMainDashboardComponent
          )
      },
      {
        path: 'patients',
        loadComponent: () =>
          import('./components/patient-dashboard/patient-dashboard').then(
            m => m.PatientDashboardComponent
          )
      },
      {
        path: 'doctors',
        loadComponent: () =>
          import('./components/doctor-dashboard/doctor-dashboard').then(
            m => m.DoctorDashboardComponent
          )
      },
      {
        path: 'doctors/:id',
        loadComponent: () =>
          import('./components/doctor-detail/doctor-detail').then(
            m => m.DoctorDetailComponent
          )
      },
      {
        path: 'nurses',
        loadComponent: () =>
          import('./components/nurse-dashboard/nurse-dashboard').then(
            m => m.NurseDashboard
          )
      },
      {
        path: 'nurses/:id',
        loadComponent: () =>
          import('./components/nurse-detail/nurse-detail').then(
            m => m.NurseDetail
          )
      }
    ]
  },

  // 👨‍⚕️ Staff Layout (Navbar Only)
  {
    path: 'role',
    component: NavbarOnlyLayout,
    children: [

       {
        path: 'doctors',
        loadComponent: () =>
          import('./components/doctor-dashboard/doctor-dashboard').then(
            m => m.DoctorDashboardComponent
          )
      },
      {
        path: 'doctors/:id',
        loadComponent: () =>
          import('./components/doctor-detail/doctor-detail').then(
            m => m.DoctorDetailComponent
          )
      },

    ]
  },

  // 🚨 Fallback Route
  { path: '**', redirectTo: 'home' }
];
