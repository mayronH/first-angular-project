import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Moment } from '../interfaces/Moment';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private baseAPIUrl = environment.baseAPIUrl;
  private apiURL = `${this.baseAPIUrl}api/moments`;
  constructor(private http: HttpClient) {}

  createNewMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiURL, formData);
  }

  getAllMoments(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(this.apiURL);
  }

  getMoment(id: number): Observable<Response<Moment>> {
    return this.http.get<Response<Moment>>(`${this.apiURL}/${id}`);
  }

  removeMoment(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  updateMoment(formData: FormData, id: number): Observable<FormData> {
    return this.http.put<FormData>(`${this.apiURL}/${id}`, formData);
  }
}
