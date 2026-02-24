import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DoctorAdmissionsService } from './doctor';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
 private apiUrl = `${environment.apiUrl}/Autho`

  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('user'));
  isLoggedIn$ = this.loggedIn.asObservable();

  private profileImage = new BehaviorSubject<string>('assets/Images/avatar-1577909_1280.png');
  profileImage$ = this.profileImage.asObservable();

  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: { username: string; email: string; password: string; roleId: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

 getRoles(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Roles`);
  }

  // ✅ Store everything as one object
  setLogin(userId: string, role: string, token: string, profileImageUrl?: string) {
    const user = { userId, role, token };
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedIn.next(true);

    if (profileImageUrl) {
      this.profileImage.next(profileImageUrl);
    }
  }

  setProfileImage(url: string) {
    this.profileImage.next(url);
  }

  // ✅ Always returns { userId, role, token }
  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  refreshProfileImage(doctorId: number, doctorService: DoctorAdmissionsService) {
    doctorService.getDoctorProfileImage(doctorId).subscribe({
      next: (blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.setProfileImage(objectURL);
      },
      error: () => {
        this.setProfileImage('assets/Images/avatar-1577909_1280.png?ts=' + Date.now());
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn.next(false);
    this.profileImage.next('assets/Images/avatar-1577909_1280.png?ts=' + Date.now());
  }
}
