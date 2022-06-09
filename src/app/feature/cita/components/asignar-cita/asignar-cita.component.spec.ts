import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ComandoSolicitudAsignarCita } from '@cita/shared/model/comando-solicitud-asignar-cita';
import { CitaService } from '@cita/shared/service/cita.service';
import { CitaMockService } from '@shared/mock/cita-mock-service';
import { of, throwError } from 'rxjs';
import { AsignarCitaComponent } from './asignar-cita.component';

describe('AsignarCitaComponent', () => {
  let component: AsignarCitaComponent;
  let fixture: ComponentFixture<AsignarCitaComponent>;
  let service : CitaService;
  const citaMockService : CitaMockService = new CitaMockService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarCitaComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        CitaService,
        HttpService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarCitaComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CitaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Inicializar componente', () => {
    spyOn(service, 'consultarTodosLosAfiliados').and.returnValue(of(citaMockService.crearListadoAfiliados()));
    component.ngOnInit();
    component.listaAfiliados.subscribe(response => {
      expect(response.length).toBe(3);
    });
    /*expect(component.listaProductosOrdenados).toEqual([]);*/
  });



  it('Error al asignar cita', () => {
    const errorResponse = citaMockService.crearHttpRespuestaError501();
    
    spyOn(service, 'guardarCita').and.returnValue(throwError(errorResponse));
    
    component.asignarCita();

    /*expect(component.listaProductosOrdenados).toEqual([]);*/
  });

  it('Asignar cita de forma exitosa', () => {
    
 
    component.listaAfiliados = of(citaMockService.crearListadoAfiliados());
    
    component.citaForm.controls.afiliado.setValue("1067000000");
    component.citaForm.controls.procedimiento.setValue('808081');


    expect(component.citaForm.valid).toBeTruthy();

    component.asignarCita();
    
    /*expect(component.listaProductosOrdenados.length).toEqual(3);
    expect(component.pedidoForm.get('direccion').value).toBe('Calle 2 sur # 34 a');*/
    expect(component.citaForm.get('procedimiento').value).toBe('808081');
  });

  it('Crear cita exitosamente', () => {
    const comandoSolicitud : ComandoSolicitudAsignarCita = citaMockService.crearComandoSolicitudAsignarCita();
    
    //component.listaProductosOrdenados = (pedidoMockService.crearListadoProductosOrdenados());
    
    spyOn(service, 'guardarCita').withArgs(comandoSolicitud).and.returnValue(of(10));

    component.guardarCita(comandoSolicitud);
    
    //expect(component.listaProductosOrdenados.length).toEqual(3);
  });

});
