import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class StabelV1Service {
  
  public constructor(private _http : Http){

  }

  public post(request : StabelV1Service.StabelCreateRequest) : Observable<StabelV1Service.StabelCreateResponse>{
    var result = this._http.post('api/v1', request)
                    .map(r => r.json() as StabelV1Service.StabelCreateResponse)
                    .catch(error => {
                      return Observable.throw(error.json().error || 'Server error');
                    });                    
                    
    return result;
  }



}

export module StabelV1Service{
  export class StabelCreateRequest{
    public content : string = '';
    public parameter : any = {};
  }
  export class StabelCreateResponse{
      public publicId : string = '';
      public privateId : string = '';
      
      public putUrl : string = '';
      public getUrl : string = '';
      public sendUrl : string = '';
  }  
}
