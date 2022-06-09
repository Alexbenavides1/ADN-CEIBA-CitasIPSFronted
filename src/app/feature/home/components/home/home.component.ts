import { Component, OnInit } from '@angular/core';
import { TRM } from '@home/shared/model/trm';
import { HomeService } from '../../shared/service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  trm: TRM ;
  fechaTrm: string;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.inicializarTRM();
    this.fechaTrm = this.obtenerFechaActualTRM();
    this.obtenerTRM();
  }

  obtenerFechaActualTRM(): string {
    const fechaActual = new Date();
    return `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1)}-${fechaActual.getDate()}`;
  }

  inicializarTRM() {
    this.trm = {
      unit: '',
      validityFrom: undefined,
      validityTo: undefined,
      value: 0,
      success: undefined
    };
  }

  obtenerTRM() {
    this.homeService.consultarTRM(this.fechaTrm).subscribe((response) => {
      this.trm = response.data;
    });
  }
}
