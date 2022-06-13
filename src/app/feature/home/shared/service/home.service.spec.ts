import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { HomeMockService } from '@shared/mock/home-mock-service';
import { HomeService } from '@home/shared/service/home.service';

describe('HomeService', () => {
  let service: HomeService;
  let httpMock: HttpTestingController;
  const homeMockService: HomeMockService = new HomeMockService();
  

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

  it('deberia consultar TRM', () => {

    const fechaTRM = '2022-06-09';
    const respuestaTRM = homeMockService.crearRespuestaAPITRM();
    const apiEndpointConsultarTRM = 'https://www.datos.gov.co/resource/32sa-8pi3.json?vigenciadesde=2022-06-09';
    
    service.consultarTRM(fechaTRM).subscribe(response => {
      expect(response).toBe(respuestaTRM);
    });

    const req = httpMock.expectOne(apiEndpointConsultarTRM);
    
    expect(req.request.method).toBe('GET');

    
  });

});
