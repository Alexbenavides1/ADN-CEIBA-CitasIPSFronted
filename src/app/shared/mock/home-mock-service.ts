
export class HomeMockService {
    
    crearRespuestaAPITRM() {
        return {
            data: this.crearTRM(),
            web: "www.makaw.dev"
        };
    }

    crearTRM() {
        return {
            unit: "COP",
            validityFrom: new Date("2022-05-25T05:00:00.000Z"),
            validityTo: new Date("2022-05-25T05:00:00.000Z"),
            value: 3971.28,
            success: true
        };
    }
}