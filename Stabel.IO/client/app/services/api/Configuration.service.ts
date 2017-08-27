import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class ConfigurationService {
  
  public constructor(private _http : Http){

  }

  public get() : Observable<ConfigurationService.ConfigurationResponse>{
    var result = this._http.get('/api/config')
                    .map(r => {
                       return r.json() as ConfigurationService.ConfigurationResponse;
                     })
                    .catch(error => {
                      return Observable.throw(error.json().error || 'Server error');
                    });                    

    return result;
  }



}

export module ConfigurationService{
  export class ConfigurationResponse{
    public appVersion : string = '';
  }
}
