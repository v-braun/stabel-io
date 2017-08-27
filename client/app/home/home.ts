import {Component, ElementRef} from '@angular/core';

import './home.scss';
import {GenerateRequest} from './editor';
import {StabelDialogComponent} from './stabel-dialog';
import { StabelService } from '../services/Stabel.service';
import { ConfigurationService } from '../services/api/Configuration.service';

import {MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';


let ga : any;

@Component({
  selector: 'home-page',
  template: require('./home.html')
})
export class MainComponent {

  constructor(
    private _service : StabelService,
    private _configApiService : ConfigurationService,
    private _dialog: MdDialog,
    private _elementRef : ElementRef){
      
  }

  ngAfterViewInit() {
    this._configApiService.get().subscribe(cfg => {
      if(!cfg.analyticsTrackingId){
        console.log('tracking disabled');
        return;
      }
      var tracking = document.createElement('script');
      tracking.type = 'text/javascript';
      tracking.innerHTML = `
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  
    ga('create', '${cfg.analyticsTrackingId}', 'auto');
    ga('send', 'pageview');    
  `;
  
      this._elementRef.nativeElement.appendChild(tracking);      
    });

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
