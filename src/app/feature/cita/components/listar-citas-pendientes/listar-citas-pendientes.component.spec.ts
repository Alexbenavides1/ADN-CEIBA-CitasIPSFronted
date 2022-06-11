import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCitasPendientesComponent } from './listar-citas-pendientes.component';
import { CitaService } from '@cita/shared/service/cita.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { of, throwError } from 'rxjs';
import { CitaMockService } from '@shared/mock/cita-mock-service';


describe('ListarCitasPendientesComponent', () => {
  let component: ListarCitasPendientesComponent;
  let fixture: ComponentFixture<ListarCitasPendientesComponent>;
  let service: CitaService;
  const citaMockService: CitaMockService = new CitaMockService();


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCitasPendientesComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        CitaService,
        HttpService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCitasPendientesComponent);
    component = fixture.componentInstance;
    service= TestBed.inject(CitaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Consultar todas las citas pendientes', () => {
    spyOn(service, 'consultarTodasLasCitasPendientes').and.returnValue(of(citaMockService.crearListadoCitasPendientes()));
    component.ngOnInit();
    expect(component.listaCitasPendientes.length).toBe(2);
  });

  it('Error al consultar todas las citas pendientes', () => {
    const errorResponse = citaMockService.crearHttpRespuestaError501();
    spyOn(service, 'consultarTodasLasCitasPendientes').and.returnValue(throwError(errorResponse));
    component.ngOnInit();
    expect(component.listaCitasPendientes).toBeUndefined();
  });

});
