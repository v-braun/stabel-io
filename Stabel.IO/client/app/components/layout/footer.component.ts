import {Component} from '@angular/core';
import {ConfigurationService} from '../../services/api/Configuration.service';

import './footer.component.scss';

@Component({
  selector: 'stabel-footer',
  template: require('./footer.component.html')
})
export class FooterComponent {

  public appVersion : string = '';

  constructor(private configurationService : ConfigurationService){
    this.configurationService.get().subscribe(res => {
      this.appVersion = res.appVersion;
    });
  }

}
