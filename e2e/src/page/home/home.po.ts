import { by, element } from 'protractor';

export class HomePage {

    getTitleText() {
        return element(by.css('app-root p')).getText() as Promise<string>;
    }
}