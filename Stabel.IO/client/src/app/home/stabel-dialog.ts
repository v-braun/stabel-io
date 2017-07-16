import {Component} from '@angular/core';
import { MdDialogRef} from '@angular/material';
import './stabel-dialog.scss';
import {GenerateRequest} from './editor';

@Component({
  selector: 'stabel-dialog',
  template: require('./stabel-dialog.html')
})
export class StabelDialogComponent {

  public sampleUrl : string = 'http://google.de';
  
  constructor(public dialogRef: MdDialogRef<StabelDialogComponent>) {}

}
