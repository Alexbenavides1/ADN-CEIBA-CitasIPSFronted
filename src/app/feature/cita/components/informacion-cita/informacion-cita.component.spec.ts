import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionCitaComponent } from './informacion-cita.component';
import { CitaMockService } from '@shared/mock/cita-mock-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('InformacionCitaComponent', () => {
  let component: InformacionCitaComponent;
  let fixture: ComponentFixture<InformacionCitaComponent>;
  const citaMockService: CitaMockService = new CitaMockService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionCitaComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionCitaComponent);
    component = fixture.componentInstance;
    component.color ='warning';
    component.estadoCita = 'PENDIENTE';
    component.citaResumen = citaMockService.crearResumenCitaPendiente();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Informacion cita sin la propiedad color asignada', () => {
    const informacionCitaComponent = new InformacionCitaComponent();
    informacionCitaComponent.estadoCita = 'PENDIENTE';
    informacionCitaComponent.citaResumen = citaMockService.crearResumenCitaPendiente();
    informacionCitaComponent.ngOnInit();
    expect(informacionCitaComponent.color).toBe('danger');
    expect(informacionCitaComponent.estadoCita).toBe('PENDIENTE');
  });

  it('Informacion cita con la propiedad color', () => {
    const informacionCitaComponent = new InformacionCitaComponent();
    informacionCitaComponent.color = 'warning';
    informacionCitaComponent.estadoCita = 'PENDIENTE';
    informacionCitaComponent.citaResumen = citaMockService.crearResumenCitaPendiente();
    informacionCitaComponent.ngOnInit();
    expect(informacionCitaComponent.color).toBe('warning');
    expect(informacionCitaComponent.estadoCita).toBe('PENDIENTE');
  });
});
