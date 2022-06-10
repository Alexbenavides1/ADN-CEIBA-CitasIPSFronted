import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getTextBySelectorComponentAndTag(selectorComponent: string, tag: string) {
    return element(by.css(`${selectorComponent} ${tag}`)).getText() as Promise<string>;
  }

  getListTextBySelectorComponentAndTag(selectorComponent: string, tag: string) {
    return element.all(by.css(`${selectorComponent} ${tag}`)).getText() as Promise<string>;
  }

  getTitleTextByName(selectorName: string) {
    return element(by.className(selectorName)).getText() as Promise<string>;
  }

  getElementById(selectorId: string) {
    return element(by.id(selectorId)).isEnabled() as Promise<boolean>;
  }
}
