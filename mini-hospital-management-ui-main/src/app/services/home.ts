import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../Models/doctor-model.dto';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HomeService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {

    return this.http.get<Doctor[]>(`${this.baseUrl}/Doctor`);
  }

  getGalleryImages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/gallery`);
  }

  registerPatient(patient: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Patient`, patient);
  }

  registerPatientWithUser(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Patient/register-with-user`, payload);
  }
}
