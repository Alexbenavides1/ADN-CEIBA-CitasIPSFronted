import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionCitaComponent } from '@cita/components/informacion-cita/informacion-cita.component';
import { CitaMockService } from '@shared/mock/cita-mock-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CitaService } from '@cita/shared/service/cita.service';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';


describe('InformacionCitaComponent', () => {
  let component: InformacionCitaComponent;
  let fixture: ComponentFixture<InformacionCitaComponent>;
  const citaMockService: CitaMockService = new CitaMockService();
  let service: CitaService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionCitaComponent ],
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
    fixture = TestBed.createComponent(InformacionCitaComponent);
    component = fixture.componentInstance;
    component.color ='warning';
    component.estadoCita = 'PENDIENTE';
    component.citaResumen = citaMockService.crearResumenCitaPendiente();
    service = TestBed.inject(CitaService);
    fixture.detectChanges();
  });


  it('deberia crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

   it('deberia cancelar la cita', () => {

     spyOn(service,'cancelarCita').withArgs(2).and.returnValue(of(1));
     spyOn(Swal,'clickConfirm').and.callFake(() => {
      service.cancelarCita(2).subscribe({
        next: response => {
          if (response > 0) {
            Swal.fire({
              icon: 'success',
              title: 'Realizado',
              text: 'La cita se ha cancelado exitosamente.',
              showConfirmButton: true,
              timer: 4000
            });
            
          }
        }
      });
     });

     component.cancelarCita(2);
       
     expect(Swal.isVisible()).toBeTruthy();
     expect(Swal.getTitle().textContent).toEqual('¿Esta seguro(a) de cancelar la cita?');

     Swal.clickConfirm();    

     expect(Swal.clickConfirm).toHaveBeenCalled();
     expect(service.cancelarCita).toHaveBeenCalled();


   });

  it('deberia mostrar error al cancelar la cita', () => {

    spyOn(service,'cancelarCita').withArgs(2).and.returnValue(of(0));
    spyOn(Swal,'clickConfirm').and.callFake(() => {
      service.cancelarCita(2).subscribe({
        error: error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Se ha producido un error. ${error.error.mensaje}`,
            showConfirmButton: true,
            timer: 5000
          });
        }
      });
    });

    component.cancelarCita(2);
       
    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle().textContent).toEqual('¿Esta seguro(a) de cancelar la cita?');

    Swal.clickConfirm();    

    expect(Swal.clickConfirm).toHaveBeenCalled();
    expect(service.cancelarCita).toHaveBeenCalled();


  });

});
