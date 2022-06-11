import { Component, OnInit } from '@angular/core';
import { ResumenCita } from '../../shared/model/resumen-cita';
import { CitaService } from '../../shared/service/cita.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-citas-pendientes',
  templateUrl: './listar-citas-pendientes.component.html',
  styleUrls: ['./listar-citas-pendientes.component.css']
})
export class ListarCitasPendientesComponent implements OnInit {

  listaCitasPendientes: ResumenCita[];

  constructor(private citaService: CitaService) { }

  ngOnInit(): void {

    this.citaService.consultarTodasLasCitasPendientes().subscribe({
      next: response => {
        this.listaCitasPendientes = response;
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Se ha producido un error. ${error.error.mensaje}`,
          showConfirmButton: true,
          timer: 3000
        });
      }
    });

    
  }

}
