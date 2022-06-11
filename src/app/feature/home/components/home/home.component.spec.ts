import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { HomeService } from '../../shared/service/home.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeMockService } from '@shared/mock/home-mock-service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: HomeService;
  const homeMockService: HomeMockService = new HomeMockService();

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [HomeService, HttpService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HomeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Obtener TRM', () => {
    
    const fechaActualTRM = component.obtenerFechaActualTRM();
    const respuestaServicioTRM = homeMockService.crearRespuestaAPITRM();

    spyOn(service, 'consultarTRM').withArgs(fechaActualTRM).and.returnValue(of(respuestaServicioTRM));
    
    component.obtenerTRM();
  
    expect('COP').toEqual(respuestaServicioTRM.data.unidad);

  });
});
