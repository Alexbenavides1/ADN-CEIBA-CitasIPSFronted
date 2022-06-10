import { Injectable } from '@angular/core';
import { Options, HttpService } from '@core-service/http.service';
import { HttpParams } from '@angular/common/http';
import { RespuestaServicioTRM } from '../model/respuesta-servicio-trm';

@Injectable()
export class HomeService {

  private urlData ='https://www.datos.gov.co/resource/32sa-8pi3.json'; 


  constructor(protected http: HttpService) { }

  public consultarTRM(fechaTRM: string) {
    let options: Options = {
      params: new HttpParams().set('vigenciadesde', fechaTRM)
    };
    return this.http.doGet<RespuestaServicioTRM>(`${this.urlData}`, options);
  }
}
