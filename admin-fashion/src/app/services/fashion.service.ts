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

  getById(id: string): Observable<Fashion> {
    return this.http.get<Fashion>(`${this.api}/fashions/${id}`);
  }

  create(f: Fashion): Observable<Fashion> {
    return this.http.post<Fashion>(`${this.api}/fashions`, f);
  }

  update(f: Fashion): Observable<Fashion> {
    return this.http.put<Fashion>(`${this.api}/fashions`, f);
  }

  delete(id: string): Observable<{ deleted: number }> {
    return this.http.delete<{ deleted: number }>(`${this.api}/fashions/${id}`);
  }
}
