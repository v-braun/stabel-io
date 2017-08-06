import {Component} from '@angular/core';

import './home.scss';
import {GenerateRequest} from './editor';
import {StabelDialogComponent} from './stabel-dialog';
import { StabelService } from '../services/Stabel.service';
import {MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';

@Component({
  selector: 'home-page',
  template: require('./home.html')
})
export class MainComponent {
  

  constructor(
    private _service : StabelService,
    private _dialog: MdDialog){
    
  }

  

  generate(req : GenerateRequest){
    
    this._service.create(req.content, req.params)
        .subscribe(res => {
          let paramJson = {};
          let query = '';
          for(let p of req.params){
            paramJson[p.name] = p.value;
            let qName = encodeURIComponent(`request.parameter.${p.name}`);
            let qVal = encodeURIComponent(p.value);
            query += `${qName}=${qVal}&`;
          }
          let conf : MdDialogConfig = new MdDialogConfig();
          conf.data = {
              get:{
                raw: res.getUrl,
                html: `<img src="${res.getUrl}" />`,
                md: `![delivered by stabel.io](${res.getUrl})`
              },
              post:{
                raw: `${res.sendUrl}?${query}`,
                curl: `curl -X PUT -H "Content-Type: application/json" -d '{parameter: ${JSON.stringify(paramJson)}}' "${res.putUrl}"`
              }
            };

            conf.width = '100%';
            //conf.position = 
            let dialogRef = this._dialog.open(StabelDialogComponent, conf);
            
          });
  }
}
