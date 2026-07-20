import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface MenuDto {
  name: string;
  route: string;
  canEdit: boolean;
  canDelete: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
private baseUrl = `${environment.apiUrl}/Menu`;

  constructor(private http: HttpClient) {}

  getMenuByUserId(userId: number): Observable<MenuDto[]> {
    return this.http.get<MenuDto[]>(`${this.baseUrl}/${userId}`);
  }
}
