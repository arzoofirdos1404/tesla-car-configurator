import { Injectable } from '@angular/core';
import { CarModelOptions, configsModel } from '../models/modelOptions';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
    window.addEventListener('beforeunload', () => {
      sessionStorage.clear();
    });
  }
  storeSelectedColor(colorCode: string) {
    sessionStorage.setItem('color', colorCode);
  }

  retrieveSelectedColor() {
    return sessionStorage.getItem('color');
  }

  storeSelectedModel(model: string) {
    sessionStorage.setItem('model', (model));
  }

  retrieveSelectedModel(): string | null {
    return sessionStorage.getItem('model');
  }

  storeSelectedConfig(config: string) {
    sessionStorage.setItem('config', (config));
  }

  retrieveSelectedConfig() {
    return sessionStorage.getItem('config');
  }

  storeConfig(model: configsModel) {
    sessionStorage.setItem('config-list', JSON.stringify(model));
  }

  retrieveConfig(): configsModel | null {
    const configString = sessionStorage.getItem('config-list');
    return configString ? JSON.parse(configString) : null;
  }

  storeModel(model: CarModelOptions) {
    sessionStorage.setItem('model-list', JSON.stringify(model));
  }

  retrieveModel(): CarModelOptions | null {
    const configString = sessionStorage.getItem('model-list');
    return configString ? JSON.parse(configString) : null;
  }

  storeYoke(key: string, value: boolean): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  retrieveyoke(key: string): boolean | null {
    const value = sessionStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  }

  storeTow(key: string, value: boolean): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  retrieveTow(key: string): boolean | null {
    const value = sessionStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  }

  isStep1Completed(): boolean {
    const selectedModel = this.retrieveSelectedModel();
    const selectedcolor = this.retrieveSelectedColor();
    return !!selectedModel && !!selectedcolor;
  }

  isStep2Completed(): boolean {
    const selectedModel = this.retrieveSelectedConfig();
    return !!selectedModel;
  }
}
