import { Injectable } from '@angular/core';
import { Property } from './property/property';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {
  propertydata: Property[] = [];
  currenturl: string;
  constructor(private http: HttpClient) {}
  HEADER = 'https://bus6yno844.execute-api.ap-northeast-1.amazonaws.com/default/ang-api-suumo?url=';

  isNotSuumo(url: string): boolean {
    return !url && !Boolean(url.search('suumo') > 0);
  }
  async getPropertydata(url: string): Promise<Property> {
    let resultProperty: Property = new Property();
    // API通信
    await this.http
      .get<any>(this.HEADER + url)
      .pipe(timeout(20000))
      .toPromise()
      .then(text => {
        console.log('--- response :');
        console.log(text.res);
        resultProperty = JSON.parse(text.res);
        resultProperty.isok = true;
      })
      .catch(err => {
        console.log(err);
        resultProperty.isok = false;
      });
    return Promise.resolve(resultProperty);
  }
  getPropertydataList(urls: string): Property[] {
    let resultPropertyList: Property[] = [];
    // API通信
    return resultPropertyList;
  }
}
