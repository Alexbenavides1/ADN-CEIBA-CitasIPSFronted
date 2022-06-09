import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { HomeMockService } from '@shared/mock/home-mock-service';
import { HomeService } from './home.service';

describe('HomeService', () => {
  let service: HomeService;
  let httpMock: HttpTestingController;
  const homeMockService: HomeMockService = new HomeMockService();

  const apiEndpointConsultarTRM = `./assets/trm.json?date=2022-06-08`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HomeService,
        HttpService
      ]
    });
    httpMock= injector.inject(HttpTestingController);
    service = TestBed.inject(HomeService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia consultar el TRM', () => {

    const fechaTRM = '2022-06-08';
    const respuestaTRM = homeMockService.crearRespuestaAPITRM();
    
    service.consultarTRM(fechaTRM).subscribe(response => {
      expect(response).toBe(respuestaTRM);
    });

    const req = httpMock.expectOne(apiEndpointConsultarTRM);
    expect(req.request.method).toBe('GET');
    req.flush(respuestaTRM);
  });

});
