import {Component} from '@angular/core';

import './home.scss';
import {GenerateRequest} from './editor';
import {StabelDialogComponent} from './stabel-dialog';
import {MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';

@Component({
  selector: 'home-page',
  template: require('./home.html')
})
export class MainComponent {
  

  constructor(private dialog: MdDialog){
    
  }

  

  generate(req : GenerateRequest){
    
    let conf : MdDialogConfig = new MdDialogConfig();
    conf.width = '90%';
    let dialogRef = this.dialog.open(StabelDialogComponent, conf);
    dialogRef.afterClosed().subscribe(result => {
      
    });
    
  }
}
