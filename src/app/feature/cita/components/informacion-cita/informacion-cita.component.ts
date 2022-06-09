import { Component, Input, OnInit } from '@angular/core';
import { ResumenCita } from '../../shared/model/resumen-cita';

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

  constructor() {
    this.citaResumen = new ResumenCita(0,'','','','','','',0,'');
   }

  ngOnInit(): void {
    this.color=(this.color == undefined ? 'danger' : this.color);
  }

}
