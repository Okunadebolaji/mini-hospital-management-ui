import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NurseAssignmentService {
private apiUrl = `${environment.apiUrl}/nurse`;
  constructor(private http: HttpClient) {}

  getAssignments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/assignments`);
  }
createNurse(nurse: {
  name: string;
  specialty: string;
  phone: string;
  email: string;
  roleId: number;
  userId: number;
}): Observable<any> {
  return this.http.post(`${this.apiUrl}`, nurse);
}

  getNurses(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}`);
}
getAssignmentsForNurse(id: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/${id}/assignments`);
}

}
