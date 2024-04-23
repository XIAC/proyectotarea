import { Injectable } from '@angular/core';
import  { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TareaModel } from '../model/tarea.model';
@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiURL ='http://localhost:8000/ruta-tarea'
  constructor(private http: HttpClient) { }

  getTodasTareas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL);
  }

  getOrdenarTaresPorPrioridad(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL+'ordenar-tarea');
  }
  // ------------------METODO CRUD
  agregarTarea(tarea: TareaModel): Observable<TareaModel> {
    // return this.http.post<TareaModel>(`${this.apiURL}/agregar`,tarea);
    return this.http.post<TareaModel>(this.apiURL+'/agregar',tarea);
  }

  editarTarea(id: string, tarea: TareaModel): Observable<TareaModel> {
    return this.http.put<TareaModel>(`${this.apiURL}/editar/${id}`,tarea);
  }

  eliminarTarea(id: string): Observable<TareaModel> {
    console.log(id);
    console.log(`${this.apiURL}/eliminar/${id}`);

    return this.http.delete<TareaModel>(`${this.apiURL}/eliminar/${id}`);
  }
}
