import { Component, Input, OnInit } from '@angular/core';
import { ResumenCita } from '@cita/shared/model/resumen-cita';
import { CitaService } from '@cita/shared/service/cita.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacion-cita',
  templateUrl: './informacion-cita.component.html',
  styleUrls: ['./informacion-cita.component.css']
})
export class InformacionCitaComponent implements OnInit {

  @Input() citaResumen: ResumenCita;
  @Input() estadoCita: string;
  @Input() color: string | undefined;
  @Input() icon: string | undefined;

  constructor(protected citaService: CitaService) {
    this.citaResumen = new ResumenCita(0,'','','','','','',0,'');   
  }

  ngOnInit(): void {}

  cancelarCita(idCita: number): void {    
    Swal.fire({
      title: '¿Esta seguro(a) de cancelar la cita?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cancelar',
      cancelButtonText: 'Cerrar',
    }).then((result) => {      
      if (result.isConfirmed) {        
        this.citaService.cancelarCita(idCita).subscribe({
          next: response => {                       
            if (response > 0) {
              Swal.fire({
                icon: 'success',
                title: 'Realizado',
                text: 'La cita se ha cancelado exitosamente.',
                showConfirmButton: true,
                timer: 4000
              });               
            }
            
          },
          error: error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `Se ha producido un error. ${error.error.mensaje}`,
              showConfirmButton: true,
              timer: 5000
            });
          }
        });

      }
      
    });    
    
  }

}
