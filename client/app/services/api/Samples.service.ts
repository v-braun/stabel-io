import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class SamplesService {
  
  public constructor(private _http : Http){

  }

  public get() : Observable<SamplesService.SamplesResponse>{
    var result = this._http.get('/api/samples')
                    .map(r => {
                       return r.json() as SamplesService.SamplesResponse;
                     })
                    .catch(error => {
                      return Observable.throw(error.json().error || 'Server error');
                    });                    

    return result;
  }



}

export module SamplesService{
  export class SamplesResponse{
    public items : SampleEntry[] = [];
  }

  export class SampleEntry{
    public title : string = '';
    public url : string = '';
    public parameters : SampleEntryParam[] = [];
  }
  export class SampleEntryParam{
    public name : string  = '';
    public value : string = '';
  }
}
