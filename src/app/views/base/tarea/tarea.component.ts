import { Component } from '@angular/core';
import { TareaService } from '../servicios/tarea.service';
import { ButtonDirective, ListGroupDirective,
          ListGroupItemDirective,
          RowComponent, ColComponent,
          CardComponent, CardHeaderComponent, CardBodyComponent,
          FormDirective, FormLabelDirective, FormControlDirective} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { TareaModel } from '../model/tarea.model';

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [
    ListGroupDirective,
    ListGroupItemDirective,
    ButtonDirective,
    RowComponent, ColComponent,
    CardComponent, CardHeaderComponent, CardBodyComponent,
    FormsModule, FormDirective, FormLabelDirective, FormControlDirective,
  ],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.scss'
})
export class TareaComponent {
  listaTareas : any[] = [];
  tarea: TareaModel;
  constructor(private tareaServicios : TareaService) {
    this.tarea = new TareaModel;
  }
  ngOnInit(){
    this.getTareas();
  }

  getTareas(){
    this.tareaServicios.getTodasTareas().subscribe(
      (data) => {
        this.listaTareas = data;
        console.log(this.listaTareas);
      },
      (error) => console.log(error)
    );
  }

  getTareasPorPrioridad(){
    this.tareaServicios.getOrdenarTaresPorPrioridad().subscribe(
      (data) => {
        this.listaTareas = data;
        console.log(this.listaTareas);
      },
      (error) => console.log(error)
    );
  }

  agregarTarea(){
    console.log(this.tarea);
    if (this.tarea._id == null || this.tarea._id == ''){
        //agregar
        this.tareaServicios.agregarTarea(this.tarea).subscribe(
          (data: TareaModel) => {
            console.log("Tarea agregada:", data);
            this.getTareas();
          },
          (error) => console.log(error)
        );
    } else {
      this.tareaServicios.editarTarea(this.tarea._id,this.tarea).subscribe(
        (data: TareaModel) => {
          console.log("Tarea editada:", data);
          this.getTareas();
        },
        (error) => console.log(error)
      );
    }

    //editar
  }

  editarTarea(item : TareaModel){
    console.log(item);
    this.tarea = item;
  }
  eliminarTarea(item : TareaModel){
    this.tareaServicios.eliminarTarea(item._id).subscribe(
      (data: TareaModel) => {
        console.log("Tarea eliminado:", data);
        this.getTareas();
      },
      (error) => console.log(error)
    );
  }
}
