import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Component, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from '../home/home';


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class RootComponent{
}

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];

export const routing = RouterModule.forRoot(routes);
