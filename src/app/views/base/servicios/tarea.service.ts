import { Injectable } from '@angular/core';
import  { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiURL ='http://localhost:8000/ruta-tarea/'
  constructor(private http: HttpClient) { }

  getTodasTareas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL);
  }

  getOrdenarTaresPorPrioridad(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL+'ordenar-tarea');
  }
}
