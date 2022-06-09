import { TRM } from './trm';

export class RespuestaServicioTRM {

	data: TRM;
	web: string;

    constructor(data: TRM, web: string) { 
		this.data = data;
		this.web = web;
	}
}