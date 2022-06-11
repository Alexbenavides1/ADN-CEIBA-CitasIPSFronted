
export class ComandoSolicitudAsignarCita{

  identificacionAfiliado: string;
  codigoProcedimiento: string;
  fecha: string;
  jornadaCita: string;

  constructor(identificacionAfiliado: string,codigoProcedimiento: string,fecha: string,jornada: string){
    this.identificacionAfiliado=identificacionAfiliado;
    this.codigoProcedimiento=codigoProcedimiento;
    this.fecha=fecha;
    this.jornadaCita=jornada;
  }

}