import { AppPage } from '../app.po';
import { NavbarPage } from '../page/navbar/navbar.po';

describe('Page Home', () => {
    let page: AppPage;
    let navBar: NavbarPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
    });

    it('Deberia entrar a la opcion de Home y verificar existencia de informacion', () => {
        page.navigateTo();
        navBar.clickBotonHome();
        
        expect(page.getTextBySelectorComponentAndTag('app-home', 'h2')).toEqual('TRM Dollar');
        expect(page.getTextBySelectorComponentAndTag('app-home', '#legend-info-trm')).toEqual('TRM');
        expect(page.getTextBySelectorComponentAndTag('app-home', '#informacionTRM')).toContain('$');
    });
});