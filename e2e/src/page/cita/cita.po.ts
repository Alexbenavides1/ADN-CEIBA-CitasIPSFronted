import { by, element, browser } from 'protractor';

export class CitaPage {
    
    private linkAsignarCita = element(by.id('linkAsignarCita'));
    private linkListarCitasPendientes = element(by.id('linkListarPendientes'));
    private linkListarCitasCanceladas = element(by.id('linkListarCanceladas'));

    private selectAfiliado = element(by.id('afiliado'));
    private selectProcedimiento = element(by.id('procedimiento'));
    private inputFecha = element(by.id('fecha'));
    private selectJornada = element(by.id('jornada'));
    
    private btnCancelarCita = element(by.id('btn-cancelar-cita'));
    private btnGuardarCita = element(by.id('btn-asignar-cita'));
    

    private btnOkSuccessAlerta = element(by.className('swal2-confirm'));
    private successAlerta = element(by.className('swal2-icon-success'));

    async clickBotonAsignarCita() {
        await this.linkAsignarCita.click();
    }

    async clickBotonListarCitasPendientes() {
        await this.linkListarCitasPendientes.click();
    }

    async clickBotonListarCitasCanceladas() {
        await this.linkListarCitasCanceladas.click();
    }


    async clickCancelarCita() {
        await this.btnCancelarCita.click();
    }

    async clickGuardarCita() {
        await this.btnGuardarCita.click();
    }

    async clickOkSuccessAlerta() {
        await this.btnOkSuccessAlerta.click();
    }

    async clickOkSuccessAlertaByElementName(selectorName: string) {
        await element(by.className(selectorName)).click();
    }
    
    
    async seleccionarAfiliado(optionText: string) {
        await this.selectAfiliado.click();
        await element(by.cssContainingText('option', optionText)).click();
    }

    async seleccionarProcedimiento(optionText: string) {
        await this.selectProcedimiento.click();
        await element(by.cssContainingText('option', optionText)).click();
    }
    

    async ingresarFecha(fecha: string) {
        this.inputFecha.clear();
        await this.inputFecha.sendKeys(fecha);
    }

    async seleccionarJornada(optionText: string) {
        await this.selectJornada.click();
        await element(by.cssContainingText('option', optionText)).click();
    }


    async getValueInput(idSelector: string) {
        return element(by.id(idSelector)).getAttribute('value');
    }

    async getMensajeGuardado(){
        return element(by.id('swal2-title')).getText() as Promise<string>;
    }

    async getAlertaExitosa() {
        return this.successAlerta;
    }

    async irAElemento(selectorElemento: string) {
        const elemento = await browser.findElement(by.css(selectorElemento));
        await browser.actions().mouseMove(elemento).perform();
    }

    
}