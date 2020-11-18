import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRequestParams} from '../app.component';

// tslint:disable-next-line:no-empty-interface
export interface ISpaceLaunchData {
  flight_number: number;
  mission_name: string;
  mission_id: [string];
  launch_year: string;
  launch_success: boolean;
  links: {
    mission_patch_small: string;
  };
}

@Injectable({
  providedIn: 'root'
})


export class SpaceLaunchDataAccessService {
  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient) { }
  private static _paramsToStrings(indexedObject: { [key: string]: any }): { [key: string]: string } {
    const returnVal: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(indexedObject)) {
      returnVal[key] = value.toString();
    }
    return returnVal;
  }

  public getSpaceLaunchPrograms(params: IRequestParams): Observable<ISpaceLaunchData> {
    return this._httpClient.get<ISpaceLaunchData>('https://api.spaceXdata.com/v3/launches', {
      params: SpaceLaunchDataAccessService._paramsToStrings(params)
    });
  }
}
