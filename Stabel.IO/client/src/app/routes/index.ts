import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Component, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from '../home/home';
import {ConfigService} from '../services/ConfigService'

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class RootComponent{

  constructor(private configService: ConfigService){

  }

  async ngOnInit() {
    console.log('RootComponent init');
    let cfg = await this.configService.getConfig();
    console.log('RootComponent: ' + cfg.BASE_URL);
  }

}

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];

export const routing = RouterModule.forRoot(routes);
