import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { CitaService } from './cita.service';
import { CitaMockService } from '../../../../shared/mock/cita-mock-service';
import { HttpResponse } from '@angular/common/http';


describe('CitaService', () => {
  let service: CitaService;
  let httpMock: HttpTestingController;
  const citaMockService: CitaMockService = new CitaMockService();


  const apiEndPointCrearCita = `${environment.endpoint}/cita`;
  const apiEndPointConsultarTodosLosAfiliados = `${environment.endpoint}/afiliado`;
  const apiEndPointConsultarTodosLosProcedimientos = `${environment.endpoint}/procedimiento`;
  const apiEndPointConsultarCitasPendientes = `${environment.endpoint}/cita/pendientes`;
  const apiEndPointConsultarCitasCanceladas = `${environment.endpoint}/cita/canceladas`;
  const apiEndPointCancelarCita = `${environment.endpoint}/cita/cancelar/1`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CitaService, HttpService
      ]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(CitaService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('deberia crear una cita', () => {
    const cita = citaMockService.crearComandoSolicitudAsignarCita();
    
    service.guardarCita(cita).subscribe((response) => {
      expect(response).toBe(1);
    });

    const req = httpMock.expectOne(apiEndPointCrearCita);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<number>({ body: 1 }));
  });

  it('deberia consultar todos los afiliados', () => {

    const afiliados = citaMockService.crearListadoAfiliados();
    
    service.consultarTodosLosAfiliados().subscribe(response => {
      expect(response.length).toBe(3);
      expect(response).toBe(afiliados);
    });

    const req = httpMock.expectOne(apiEndPointConsultarTodosLosAfiliados);
    expect(req.request.method).toBe('GET');
    req.flush(afiliados);
  });

  it('deberia consultar todos los procedimientos', () => {

    const procedimientos = citaMockService.crearListadoProcedimientos();
    
    service.consultarTodosLosProcedimientos().subscribe(response => {
      expect(response.length).toBe(3);
      expect(response).toBe(procedimientos);
    });

    const req = httpMock.expectOne(apiEndPointConsultarTodosLosProcedimientos);
    expect(req.request.method).toBe('GET');
    req.flush(procedimientos);
  });

  it('deberia consultar todas las citas pendientes', () => {

    const citasPendientes = citaMockService.crearListadoCitasPendientes();
    
    service.consultarTodasLasCitasPendientes().subscribe(response => {
      expect(response.length).toBe(2);
      expect(response).toBe(citasPendientes);
    });

    const req = httpMock.expectOne(apiEndPointConsultarCitasPendientes);
    expect(req.request.method).toBe('GET');
    req.flush(citasPendientes);
  });

  it('deberia consultar todas las citas canceladas', () => {

    const citasCanceladas = citaMockService.crearListadoCitasPendientes();
    
    service.consultarTodasLasCitasCanceladas().subscribe(response => {
      expect(response.length).toBe(2);
      expect(response).toBe(citasCanceladas);
    });

    const req = httpMock.expectOne(apiEndPointConsultarCitasCanceladas);
    expect(req.request.method).toBe('GET');
    req.flush(citasCanceladas);
  });

  it('deberia cancelar una cita', () => {

    service.cancelarCita(1).subscribe((response) => {
      expect(response).toBe(1);
    });

    const req = httpMock.expectOne(apiEndPointCancelarCita);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<number>({ body: 1 }));
  });


});
