import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarCitasCanceladasComponent } from '@cita/components/listar-citas-canceladas/listar-citas-canceladas.component';
import { CitaService } from '@cita/shared/service/cita.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '@core/services/http.service';
import { CitaMockService } from '@shared/mock/cita-mock-service';
import { of, throwError } from 'rxjs';


describe('ListarCitasCanceladasComponent', () => {
  let component: ListarCitasCanceladasComponent;
  let fixture: ComponentFixture<ListarCitasCanceladasComponent>;
  let service: CitaService;
  const citaMockService: CitaMockService = new CitaMockService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCitasCanceladasComponent ],
      imports : [
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
    fixture = TestBed.createComponent(ListarCitasCanceladasComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CitaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe consultar todas las citas canceladas', () => {
    spyOn(service, 'consultarTodasLasCitasCanceladas').and.returnValue(of(citaMockService.crearListadoCitasCanceladas()));
    component.ngOnInit();
    expect(component.listaCitasCanceladas.length).toBe(2);
    expect(component.listaCitasCanceladas[0].estado).toBe('CANCELADA');
  });

  it('Error al consultar todas las citas canceladas', () => {
    const errorResponse = citaMockService.crearHttpRespuestaError501();
    spyOn(service, 'consultarTodasLasCitasCanceladas').and.returnValue(throwError(errorResponse));
    component.ngOnInit();
    expect(component.listaCitasCanceladas).toBeUndefined();
  });
  
});
