import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PatientAdmissionService {
private baseUrl = `${environment.apiUrl}/PatientAdmis`;


  constructor(private http: HttpClient) {}

  getAdmissions(): Observable<any> {
  return this.http.get<any>(this.baseUrl);
}

}
