import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DoctorWithAdmissionsDto } from '../Models/doctor-with-admissions.dto';
import { PatientAdmissionDto } from '../Models/patient-admission.dto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DoctorAdmissionsService {
private baseUrl = `${environment.apiUrl}/Doctor`;
  constructor(private http: HttpClient) {}

  /**
   * Get all doctors with their admissions
   */
  getDoctorsWithAdmissions(): Observable<DoctorWithAdmissionsDto[]> {
    return this.http
      .get<{ $values: DoctorWithAdmissionsDto[] }>(`${this.baseUrl}/with-admissions`)
      .pipe(map(res => res.$values ?? []));
  }

  /**
   * Get a single doctor with admissions by ID
   */
  getDoctorWithAdmissionsById(id: number): Observable<DoctorWithAdmissionsDto> {
    return this.http.get<DoctorWithAdmissionsDto>(`${this.baseUrl}/with-admissions/${id}`);
  }

  /**
   * Get all patient admissions (flattened list)
   */
  getAdmissions(): Observable<PatientAdmissionDto[]> {
    return this.http
      .get<{ $values: PatientAdmissionDto[] }>(`https://localhost:7243/api/PatientAdmissions`)
      .pipe(map(res => res.$values ?? []));
  }

  /**
   * Fetch a doctor's profile image
   */
  getDoctorProfileImage(doctorId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${doctorId}/profile-image`, {
      responseType: 'blob'
    });
  }

  /**
   * Upload a doctor's profile image
   */
  uploadDoctorProfileImage(doctorId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/${doctorId}/profile-image`, formData);
  }

getDoctorByUserId(userId: number) {
  return this.http.get<any>(`${this.baseUrl}/user/${userId}`);
}




getDoctors(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}`);
}

getDoctorById(doctorId: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${doctorId}`);
}
bulkUploadDoctors(doctors: any[]): Observable<any> {
  return this.http.post(`${this.baseUrl}/bulk-upload`, doctors);
}
createDoctor(doctor: {
  name: string;
  specialty: string;
  phone: string;
  email: string;
  roleId: number;
  userId: number;
}): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}`, doctor);
}

getAppointmentsByDoctorAndStatus(doctorId: number, status: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/doctor/${doctorId}/by-status?status=${status}`);
}

}
