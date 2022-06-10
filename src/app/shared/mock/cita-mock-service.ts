import { HttpErrorResponse } from "@angular/common/http";
import { ResumenCita } from "@cita/shared/model/resumen-cita";

export class CitaMockService{

    crearComandoSolicitudAsignarCita(){
        return {
            identificacionAfiliado: "1067333333",
            codigoProcedimiento: "112233",
            fecha: "2022-06-10",
            jornadaCita: "A"
        };
    }

    crearListadoAfiliados(){
        return ([
            {
                numeroIdentificacion:"1067000000",
                nombre: "Afiliado 1"
            },
            {
                numeroIdentificacion:"1067111111",
                nombre: "Afiliado 2"
            },
            {
                numeroIdentificacion:"1067333333",
                nombre: "Afiliado 3"
            }
        ]);
    }

    crearListadoProcedimientos(){
        return ([
            {
                codigo: "808081",
                nombre: "Proc 1"
            },
            {
                codigo: "808082",
                nombre: "Proc 2"
            },
            {
                codigo: "808083",
                nombre: "Proc 3"
            }
        ]);
    }

    crearListadoCitasPendientes(){
        return ([
            {
                id: 1,
                numeroIdentificacion: "1067111111",
                nombreAfiliado: "Juan Perez",
                codigoProcedimiento: "808081",
                nombreProcedimiento: "Dermabrasion",
                fecha: "2022-06-13",
                jornada: "M",
                valorCopago: 34500.0,
                estado: "PENDIENTE"
            },
            {
                id: 2,
                numeroIdentificacion: "1067333333",
                nombreAfiliado: "Pedro Lopez",
                codigoProcedimiento: "808082",
                nombreProcedimiento: "Exfoliacion por laser",
                fecha: "2022-06-02",
                jornada: "T",
                valorCopago: 92000.0,
                estado: "PENDIENTE"
            }
        ]);
    }

    crearListadoCitasCanceladas(){
        return ([
            {
                id: 3,
                numeroIdentificacion: "1067222222",
                nombreAfiliado: "PRUEBA 2",
                codigoProcedimiento: "808081",
                nombreProcedimiento: "Dermabrasion",
                fecha: "2022-06-13",
                jornada: "M",
                valorCopago: 34500.0,
                estado: "CANCELADA"
            },
            {
                id: 4,
                numeroIdentificacion: "1067444444",
                nombreAfiliado: "PRUEBA 4",
                codigoProcedimiento: "808082",
                nombreProcedimiento: "Exfoliacion por laser",
                fecha: "2022-06-02",
                jornada: "T",
                valorCopago: 92000.0,
                estado: "CANCELADA"
            }
        ]);
    }

    crearHttpRespuestaError501() {
        return new HttpErrorResponse({
          error: 'test 501 error',
          status: 501,
          statusText: 'Internal Server Error'
        });
      }
    
      crearResumenCitaPendiente() {
        return new ResumenCita(10,'Alex Benavides','1067944244',"902210","PROC ESTETICO", '2022-05-15', 'T', 125000, 'PENDIENTE');
      }

      crearResumenCitaCancelada() {
        return new ResumenCita(10,'Alex Benavides','1067944244',"902210","PROC ESTETICO", '2022-05-15', 'T', 125000, 'CANCELADA');
      }

}