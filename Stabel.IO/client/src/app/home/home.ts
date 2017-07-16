import {Component} from '@angular/core';

import './home.scss';
import {GenerateRequest} from './editor';
import {StabelDialogComponent} from './stabel-dialog';
import {ConfigService} from '../services/ConfigService'
import {MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';

@Component({
  selector: 'home-page',
  template: require('./home.html')
})
export class MainComponent {
  

  constructor(private dialog: MdDialog, private configService: ConfigService){
    console.log('MainComponent constructor');

  }

  async ngOnInit() {
    console.log('MainComponent init');
    let cfg = await this.configService.getConfig();
    
    console.log('MainComponent: ' + cfg.BASE_URL);
  }

  generate(req : GenerateRequest){
    
    let conf : MdDialogConfig = new MdDialogConfig();
    conf.width = '90%';
    // conf.height = "90%";
    
    let dialogRef = this.dialog.open(StabelDialogComponent, conf);
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
      // this.selectedOption = result;
    });
    //console.log(req);
  }
}
