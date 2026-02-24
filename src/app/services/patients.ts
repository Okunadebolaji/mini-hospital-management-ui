import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../Models/patient-model.dto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PatientService {
private apiUrl = `${environment.apiUrl}/Patients`

  constructor(private http: HttpClient) {}

  // 🔍 Get a single patient by ID
  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  // 📋 Get all patients
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  // 📝 Register a new patient
  registerPatient(patient: Patient): Observable<any> {
    return this.http.post(this.apiUrl, patient);
  }

  // ✏️ Update patient info
 updatePatient(patient: Patient): Observable<any> {
  return this.http.put(`${this.apiUrl}/${patient.id}`, patient);
}

createPatient(patient: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/register-with-user`, patient);
}




  // ❌ Delete a patient
  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // 🔎 Search patients by name or email
  searchPatients(query: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/search?query=${query}`);
  }


  getPatientByUserId(userId: number): Observable<Patient> {
  return this.http.get<Patient>(`${this.apiUrl}/by-user/${userId}`);
}

}
