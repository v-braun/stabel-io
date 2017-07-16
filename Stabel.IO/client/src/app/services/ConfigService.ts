import { Injectable }     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

export class StabelConfig{
  public BASE_URL :  string;
}

@Injectable()
export class ConfigService {

  private config : Promise<StabelConfig>;

  constructor(private http: Http){
      // let configTxt = document.getElementById('stabel-config').innerText;
      // configTxt = configTxt.replace('STABEL_CONFIG_BEGIN', '')
      //                      .replace('STABEL_CONFIG_END', '')
      //                      .trim();
                           
      //this.config = JSON.parse(configTxt);

      this.config = http.get('/config').map(data => data.json() as StabelConfig).toPromise();
      console.log('ConfigService constructor');
  }

  getConfig() : Promise<StabelConfig>{
    return this.config;
  }

  
}
