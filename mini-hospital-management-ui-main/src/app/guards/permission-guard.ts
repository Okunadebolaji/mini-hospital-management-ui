import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = localStorage.getItem('userRole');
    const allowedRoles = ['Doctor', 'Nurse', 'Gynaecologist', 'Pharmacist', 'Dentist', 'Consultant'];

    // 🔒 Role check
    if (!role || !allowedRoles.includes(role)) {
      console.warn('Blocked: role not allowed →', role);
      this.router.navigate(['/auth/login']);
      return false;
    }

    // 🔒 Menu-based permission check
    const menu = JSON.parse(localStorage.getItem('menu') || '[]');
    if (Array.isArray(menu) && menu.length > 0) {
      const path = state.url;
     const match = menu.find((m: any) => state.url.startsWith(m.route));

      if (match?.canView) {
        console.log('✅ Access granted to:', path);
        return true;
      }

      console.warn('Blocked: no permission for route →', path);
      this.router.navigate(['/dashboard']);

      console.log('Guard checking path:', state.url);
console.table(menu);


      return false;
    }

    // 🧯 Fallback if menu is empty
    console.warn('Blocked: no menu found');
    this.router.navigate(['/dashboard']);
    return false;
  }
}
