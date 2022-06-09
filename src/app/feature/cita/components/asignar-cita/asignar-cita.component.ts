import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CitaService } from '@cita/shared/service/cita.service';
import { Observable } from 'rxjs';
import { Afiliado } from '@cita/shared/model/afiliado';
import { Procedimiento } from '@cita/shared/model/procedimiento';
import { ComandoSolicitudAsignarCita } from '@cita/shared/model/comando-solicitud-asignar-cita';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-cita',
  templateUrl: './asignar-cita.component.html',
  styleUrls: ['./asignar-cita.component.css']
})
export class AsignarCitaComponent implements OnInit {

  listaAfiliados: Observable<Afiliado[]>;
  listaProcedimientos: Observable<Procedimiento[]>;

  citaForm: FormGroup;

  constructor(protected citaService: CitaService) { }

  ngOnInit(): void {
    this.listaAfiliados = this.citaService.consultarTodosLosAfiliados();
    this.listaProcedimientos=this.citaService.consultarTodosLosProcedimientos();
    this.construirFormularioCita();
  }

  asignarCita(){
    const comandoSolicitudAsignarCita: ComandoSolicitudAsignarCita = this.crearComandoSolicitudAsignarCita();
    this.guardarCita(comandoSolicitudAsignarCita);
  }

  guardarCita(comandoSolicitudAsignarCita: ComandoSolicitudAsignarCita){
    this.citaService.guardarCita(comandoSolicitudAsignarCita).subscribe(response => {
      if (response['valor'] !== undefined) {
        Swal.fire({
          icon: 'success',
          title: 'Realizado',
          text: 'La cita se ha asignado exitosamente.',
          showConfirmButton: true,
          timer: 4000
        });

        this.resetearCitaForm();
      }
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Se ha producido un error. ${error.error.mensaje}`,
        showConfirmButton: true,
        timer: 5000
      });

      
    });
  }

  private construirFormularioCita() {
    this.citaForm = new FormGroup({
      afiliado: new FormControl('', [Validators.required]),
      procedimiento: new FormControl('', [Validators.required]), 
      fecha : new FormControl('',[Validators.required]) ,      
      jornada : new FormControl('',[Validators.required]) ,                                               
    });
  }

  private crearComandoSolicitudAsignarCita(): ComandoSolicitudAsignarCita {
    return new ComandoSolicitudAsignarCita(
      this.citaForm.get('afiliado').value,
      this.citaForm.get('procedimiento').value,
      this.citaForm.get('fecha').value,
      this.citaForm.get('jornada').value);
  }


  private resetearCitaForm() {
    this.citaForm.reset();
  }

}
