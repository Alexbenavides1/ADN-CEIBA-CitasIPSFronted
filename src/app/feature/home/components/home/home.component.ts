import { formatDate } from '@angular/common';
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
    return formatDate(Date.now(),'yyyy-MM-dd','en-US');
  }

  inicializarTRM() {
    this.trm = {
      valor: 0,
      unidad: '',
      vigenciadesde: undefined,
      vigenciahasta: undefined
    };
  }

  obtenerTRM() {
    this.homeService.consultarTRM(this.obtenerFechaActualTRM()).subscribe((response) => {     
      this.trm = response[0];        
    });
  }
}
