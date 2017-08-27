import {Component, Input, EventEmitter, Output} from '@angular/core';
import {SampleItem} from '../services/Stabel.service';
import './gallery.component.scss';

@Component({
  selector: 'stabel-gallery',
  template: require('./gallery.component.html')
})
export class GalleryComponent {

  @Output()
  public select = new EventEmitter<SampleItem>();

  @Input()
  public items : SampleItem[];

  itemSelected(item : SampleItem){
    this.select.emit(item);
  }
}
