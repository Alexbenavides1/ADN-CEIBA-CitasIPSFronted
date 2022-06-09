export class ResumenCita{

    id: number;
    nombreAfiliado: string;
    numeroIdentificacion: string;
    codigoProcedimiento: string;
    nombreProcedimiento:string;
    fecha: string;
    jornada: string;
    valorCopago: number;
    estado: string;

    constructor(id: number,nombreAfiliado: string,numeroIdentificacion: string,codigoProcedimiento: string,nombreProcedimiento: string,fecha: string,jornada: string,valorCopago: number,estado: string){
            this.id=id;
            this.nombreAfiliado=nombreAfiliado;
            this.numeroIdentificacion=numeroIdentificacion;
            this.codigoProcedimiento=codigoProcedimiento;
            this.nombreProcedimiento=nombreProcedimiento;
            this.fecha=fecha;
            this.jornada=jornada;
            this.valorCopago=valorCopago;
            this.estado=estado;
        }

}

