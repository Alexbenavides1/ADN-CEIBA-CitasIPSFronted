import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Afiliado } from '@cita/shared/model/afiliado';
import { Procedimiento } from '@cita/shared/model/procedimiento';
import { ResumenCita } from '@cita/shared/model/resumen-cita';
import { ComandoSolicitudAsignarCita } from '@cita/shared/model/comando-solicitud-asignar-cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(protected http: HttpService) { }

  public guardarCita(comandoSolicitudAsignarCita: ComandoSolicitudAsignarCita){
    return this.http.doPost<ComandoSolicitudAsignarCita,number>(`${environment.endpoint}/cita`, comandoSolicitudAsignarCita,
      this.http.optsName('crear cita'));
  }

  public consultarTodosLosAfiliados() {
    return this.http.doGet<Afiliado[]>(`${environment.endpoint}/afiliado`, 
      this.http.optsName('consultar todos los afiliados'));
  }

  public consultarTodosLosProcedimientos() {
    return this.http.doGet<Procedimiento[]>(`${environment.endpoint}/procedimiento`, 
      this.http.optsName('consultar todos los procedimientos'));
  }

  public consultarTodasLasCitasPendientes() {
    return this.http.doGet<ResumenCita[]>(`${environment.endpoint}/cita/pendientes`, 
      this.http.optsName('consultar todas las citas pendientes'));
  }

  public consultarTodasLasCitasCanceladas() {
    return this.http.doGet<ResumenCita[]>(`${environment.endpoint}/cita/canceladas`, 
      this.http.optsName('consultar todas las citas canceladas'));
  }
  
  public cancelarCita(idCita: number) {
    return this.http.doPost<null, number>(`${environment.endpoint}/cita/cancelar/${idCita}`, null,
      this.http.optsName('cancelar cita'));
  }
  
}
