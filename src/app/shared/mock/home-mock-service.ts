
export class HomeMockService {
    
    crearRespuestaAPITRM() {
        return {
            data: this.crearTRM(),
            web: "www.makaw.dev"
        };
    }

    crearTRM() {
        return {
            unidad: "COP",
            vigenciadesde: new Date("2022-05-25T05:00:00.000Z"),
            vigenciahasta: new Date("2022-05-25T05:00:00.000Z"),
            valor: 3971.28,
        };
    }
}