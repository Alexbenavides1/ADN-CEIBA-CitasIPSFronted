
export class HomeMockService {
    
    crearRespuestaAPITRM() {
        return {
            data: this.crearTRM(),
        };
    }

    crearTRM() {
        return {
            unidad: "COP",
            vigenciadesde: new Date("2022-06-09T00:00:00.000"),
            vigenciahasta: new Date("2022-06-09T00:00:00.000"),
            valor: 3782.65,
        };
    }
}