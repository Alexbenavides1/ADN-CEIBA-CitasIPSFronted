import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ComandoSolicitudAsignarCita } from '@cita/shared/model/comando-solicitud-asignar-cita';
import { CitaService } from '@cita/shared/service/cita.service';
import { CitaMockService } from '@shared/mock/cita-mock-service';
import { of, throwError } from 'rxjs';
import { AsignarCitaComponent } from '@cita/components/asignar-cita/asignar-cita.component';
import Swal from 'sweetalert2';

describe('AsignarCitaComponent', () => {
  let component: AsignarCitaComponent;
  let fixture: ComponentFixture<AsignarCitaComponent>;
  let service: CitaService;
  const citaMockService: CitaMockService = new CitaMockService();

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
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarCitaComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CitaService);
    fixture.detectChanges();
  });

  it('Deberia ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('Inicializar componente', () => {
    
    spyOn(service, 'consultarTodosLosAfiliados').and.returnValue(of(citaMockService.crearListadoAfiliados()));
    spyOn(service, 'consultarTodosLosProcedimientos').and.returnValue(of(citaMockService.crearListadoProcedimientos()));
    
    component.ngOnInit();
    
    component.listaAfiliados.subscribe(response => {
      expect(response.length).toBe(3);
    });

    component.listaProcedimientos.subscribe(response => {
      expect(response.length).toBe(3);
    });

  });



  it('deberia dar error al guardar cita', () => {
    const errorResponse = citaMockService.crearHttpRespuestaError501();
    
    spyOn(service, 'guardarCita').and.returnValue(throwError(errorResponse));
    
    component.asignarCita();

    spyOn(Swal,'fire');

    Swal.fire();

    expect(Swal.isVisible()).toBeTruthy();
    expect(service.guardarCita).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalled();

  });

  it('deberia asignar los datos de la cita', () => {    
 
    component.listaAfiliados = of(citaMockService.crearListadoAfiliados());
    component.listaProcedimientos = of(citaMockService.crearListadoProcedimientos());

    
    component.citaForm.controls.afiliado.setValue('1067000000');
    component.citaForm.controls.procedimiento.setValue('808081');
    component.citaForm.controls.jornada.setValue('M');
    component.citaForm.controls.fecha.setValue('2022-06-13');

    expect(component.citaForm.valid).toBeTruthy();

    component.asignarCita();
    
    expect(component.citaForm.get('afiliado').value).toBe('1067000000');
    expect(component.citaForm.get('procedimiento').value).toBe('808081');
    expect(component.citaForm.get('fecha').value).toBe('2022-06-13');
    expect(component.citaForm.get('jornada').value).toBe('M');

  });

  it('deberia crear cita exitosamente', () => {
    
    const comandoSolicitud: ComandoSolicitudAsignarCita = citaMockService.crearComandoSolicitudAsignarCita();
    
    spyOn(service, 'guardarCita').withArgs(comandoSolicitud).and.returnValue(of(1));

    component.guardarCita(comandoSolicitud);

    expect(component.citaForm.get('afiliado').value).toBe(null);
    expect(component.citaForm.get('procedimiento').value).toBe(null);
    expect(component.citaForm.get('fecha').value).toBe(null);
    expect(component.citaForm.get('jornada').value).toBe(null);

    
  });

  it('Debe limpiar todos los campos del formulario', () => {

    component.resetearCitaForm();

    expect(component.citaForm.get('afiliado').value).toBe(null);
    expect(component.citaForm.get('procedimiento').value).toBe(null);
    expect(component.citaForm.get('fecha').value).toBe(null);
    expect(component.citaForm.get('jornada').value).toBe(null);
    
  });


});
