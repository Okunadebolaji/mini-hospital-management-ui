import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
 private baseUrl = `${environment.apiUrl}/appointments`;


  constructor(private http: HttpClient) {}


getUpcomingAppointments(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/upcoming`);
}

getTopTreatments(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/top-treatments`);
}

getTodaysAppointments(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/today`);
}

getAppointments(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/appointments`);

}




  confirmAppointment(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/confirm`, {});
  }

createAppointment(appt: any): Observable<any> {
  return this.http.post<any>(this.baseUrl, appt);
}

}
