import { AppPage } from "../app.po";
import { NavbarPage } from "../page/navbar/navbar.po";
import { CitaPage } from "../page/cita/cita.po";
import { browser } from 'protractor';

describe('Page Cita', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let cita: CitaPage;

    const IDENTIFICACION_AFILIADO = '1067000000';
    const CODIGO_PROCEDIMIENTO = '808085';
    const FECHA = '2022-06-16';
    const JORNADA = 'T';

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        cita = new CitaPage();

        browser.manage().window().maximize();
        
        page.navigateTo();
        navBar.clickBotonCita();
    });

    it('Deberia entrar a la opcion de Cita y comprobar las tres opciones del menu', () => {
        
        page.getListTextBySelectorComponentAndTag('app-cita', 'a.nav-link').then((item) => {
            const subMenuCita = item.toString().split(',');
            expect(subMenuCita[0]).toBe('Asignar cita');
            expect(subMenuCita[1]).toBe('Ver citas pendientes');
            expect(subMenuCita[2]).toBe('Ver citas canceladas');
        });
    });

    it('Deberia asignar una cita', async () => {        
        
        cita.clickBotonAsignarCita();

        await cita.seleccionarAfiliado(IDENTIFICACION_AFILIADO);
        await cita.seleccionarProcedimiento(CODIGO_PROCEDIMIENTO);
        cita.ingresarFecha(FECHA);
        cita.seleccionarJornada(JORNADA);
     
        await cita.irAElemento('#btn-asignar-cita');

        await cita.clickGuardarCita();
        
    });

    it('Deberia inhabilitar boton de guardar porque no se ha ingresado toda la informacion', async () => {
              
        cita.clickBotonAsignarCita();
       
        await cita.seleccionarAfiliado(IDENTIFICACION_AFILIADO);
        await cita.seleccionarProcedimiento(CODIGO_PROCEDIMIENTO);
        cita.ingresarFecha(FECHA);

        expect(page.getElementById('btn-asignar-cita')).toEqual(false);
    });

    it('Deberia listar las citas pendientes', async () => {
        
        cita.clickBotonListarCitasPendientes();

        expect(page.getTextBySelectorComponentAndTag('app-listar-citas-pendientes', 'h2')).toEqual('Citas pendientes');

        expect(page.getTextBySelectorComponentAndTag('app-listar-citas-pendientes', '#legend-citas-pendientes')).toEqual('Listado de citas');
              
       
    });

    it('Deberia listar las citas canceladas', async () => {
        
        cita.clickBotonListarCitasCanceladas();

        expect(page.getTextBySelectorComponentAndTag('app-listar-citas-canceladas', 'h2')).toEqual('Citas canceladas');
        expect(page.getTextBySelectorComponentAndTag('app-listar-citas-canceladas', '#legend-citas-canceladas')).toEqual('Listado de citas');
       
    });
});