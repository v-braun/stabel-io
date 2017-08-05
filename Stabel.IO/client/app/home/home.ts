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
                   console.log('done!');
                   console.log(res);
                 });
    // let conf : MdDialogConfig = new MdDialogConfig();
    // conf.width = '90%';
    // let dialogRef = this.dialog.open(StabelDialogComponent, conf);
    // dialogRef.afterClosed().subscribe(result => {
      
    // });
    
  }
}
