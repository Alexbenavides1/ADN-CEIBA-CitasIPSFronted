import { Injectable } from '@angular/core';
import { Options, HttpService } from '@core-service/http.service';
import { HttpParams } from '@angular/common/http';
import { RespuestaServicioTRM } from '../model/respuesta-servicio-trm';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private urlData: string ='https://www.datos.gov.co/resource/32sa-8pi3.json'; 
  //'./assets/trm.json';

  constructor(protected http: HttpService) { }

  public consultarTRM(fechaActualTRM: string) {
    let options: Options = {
      params: new HttpParams().set('vigenciadesde', fechaActualTRM)
    };
    return this.http.doGet<RespuestaServicioTRM>(`${this.urlData}`, options);
  }
}
