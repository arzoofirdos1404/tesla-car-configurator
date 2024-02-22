
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // constructor(private http: HttpClient) { }

  fetchImageUrl(model: string, color: string) {
    if (model && color) {
      return `https://interstate21.com/tesla-app/images/${model}/${color}.jpg`;
    }
    return '';
  }

  // getModels(){
  //   return this.http.get<CarModelOptions[]>('/models');
  // }

  // getConfigOptions(modelCode: string){
  //   return this.http.get<CarConfigOptions>(`/options/${modelCode}`);
  // }

}
