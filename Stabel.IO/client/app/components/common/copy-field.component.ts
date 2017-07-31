import {Component, SimpleChange, Input} from '@angular/core';

import './copy-field.component.scss';

@Component({
  selector: 'copy-field',
  template: require('./copy-field.component.html')
})
export class CopyFieldComponent {

  @Input()
  public text: string;
  
  public copied: boolean;
  public label: string = 'copy';


  copyClicked(){
    this.copied = true;
    this.label = 'yup';
    setTimeout(() => {
      this.copied = false;
      this.label = 'copy';
    }, 1000);
  }
}
