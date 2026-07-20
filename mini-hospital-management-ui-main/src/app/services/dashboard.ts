import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
private baseUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  //  Admin Dashboard Metrics
 getAdminMetrics(): Observable<any> {
  const token = localStorage.getItem('authToken'); // or wherever you store it
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.baseUrl}/admin/dashboard-metrics`, { headers });
}


  //  Success Rate Chart
  getSuccessRate(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/success-rate`);
  }

  //  Next Patient Info
  getNextPatient(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/next-patient`);
  }

  //  Approval Requests
  getApprovalRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/approval-requests`);
  }
}
