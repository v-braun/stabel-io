import {Component, Inject} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import './stabel-dialog.scss';
import {GenerateRequest} from './editor';


@Component({
  selector: 'stabel-dialog',
  template: require('./stabel-dialog.html')
})
export class StabelDialogComponent {

  
  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    
  }

}
