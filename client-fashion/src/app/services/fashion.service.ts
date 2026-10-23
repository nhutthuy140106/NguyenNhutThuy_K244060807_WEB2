import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Fashion } from '../models/fashion';

@Injectable({ providedIn: 'root' })
export class FashionService {
  private http = inject(HttpClient);
  private api = 'http://localhost:4000';

  getAll(): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(`${this.api}/fashions`);
  }

  getStyles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/styles`);
  }

  getByStyle(style: string): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(`${this.api}/fashions/style/${encodeURIComponent(style)}`);
  }

  getById(id: string): Observable<Fashion> {
    return this.http.get<Fashion>(`${this.api}/fashions/${id}`);
  }
}
