import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Role {
  roleId: number;
  roleName: string;
}
@Injectable({ providedIn: 'root' })
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>('https://localhost:7243/api/Roles');
  }

  getRoleById(id: number): Observable<string> {
    return this.http.get<string>(`https://localhost:7243/api/Roles/${id}`);
  }
}
