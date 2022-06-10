import { Component, OnInit } from '@angular/core';
import { ResumenCita } from '../../shared/model/resumen-cita';
import { CitaService } from '../../shared/service/cita.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-citas-canceladas',
  templateUrl: './listar-citas-canceladas.component.html',
  styleUrls: ['./listar-citas-canceladas.component.css']
})
export class ListarCitasCanceladasComponent implements OnInit {

  listaCitasCanceladas : ResumenCita[];

  constructor(private citaService : CitaService) { }

  ngOnInit(): void {

    this.citaService.consultarTodasLasCitasCanceladas().subscribe({
      next: response => {
        this.listaCitasCanceladas = response;
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Se ha producido un error. ${error.error.mensaje}`,
          showConfirmButton: true,
          timer: 3000
        })
      }
    });

  }

}
