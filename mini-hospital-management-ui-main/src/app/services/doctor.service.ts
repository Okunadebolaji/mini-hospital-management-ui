import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class DoctorService {
private baseUrl = `${environment.apiUrl}/doctors`;

  constructor(private http: HttpClient) {}

  /**
   * Save doctor profile after registration
   */
 saveDoctorProfile(userId: string, data: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/${userId}/profile`, data, {
    responseType: 'text' as const
  });
}

uploadProfileImage(doctorId: number, formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/${doctorId}/profile-image`, formData);
}



}
