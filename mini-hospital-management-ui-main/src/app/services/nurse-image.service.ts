import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NurseImageService {
private baseUrl = `${environment.apiUrl}/nurse`;

  constructor(private http: HttpClient) {}

  /** Get nurse profile image as Blob */
 getNurseImage(nurseId: number): Observable<Blob> {
  return this.http.get(`${this.baseUrl}/${nurseId}/image`, { responseType: 'blob' });
}

uploadNurseImage(nurseId: number, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post(`${this.baseUrl}/${nurseId}/upload-image`, formData);
}

}
