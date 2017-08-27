import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
//import {StabelSamples} from './StabelSamples';
import { SamplesService } from './api/Samples.service';
import { StabelV1Service } from './api/StabelV1.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


export class TemplateParameter {
  constructor(
    public name: string,
    public value: string
  ) {

  }
}

export class SampleItem{

  public compiled : SafeResourceUrl;
  public params : TemplateParameter[];

  constructor(
    public name : string,
    public svg : string
  ){}
}

@Injectable()
export class StabelService {
  private endpointUrl = 'http://localhost:5000/api/values'; 
  
  constructor (private _http: Http, 
               private _sanitizer: DomSanitizer,
               private _samples: SamplesService,
               private _apiService: StabelV1Service) {
               }
  
  getSamples() : Subject<SampleItem[]>{
    let vm = new Subject<SampleItem[]>();
    this._samples.get().subscribe(samples => {
      let result : SampleItem[] = [];
      samples.items.forEach(item => {
        let itemVM = new SampleItem(item.title, '');
        itemVM.params = item.parameters.map(p => 
          new TemplateParameter(p.name, p.value)
        );

        this._http.get(item.url).subscribe(res => {
          itemVM.svg = res.text();
          itemVM.compiled = this.compile(itemVM.svg, itemVM.params);
          result.push(itemVM);
          if(result.length === samples.items.length){
            vm.next(result);
          }

        });
      });
    });

    return vm;
  }

  compile(content : string, params : TemplateParameter[]) : SafeResourceUrl{
    params.forEach(p => {
      var exp = '{{' + p.name + '}}';
      content = content.replace(new RegExp(exp, 'g'), p.value);
    });

    let contentBase64 = window.btoa(content);
    var compiledStr = `data:image/svg+xml;base64,${contentBase64}`;
    let compiled = this._sanitizer.bypassSecurityTrustResourceUrl(compiledStr);

    return compiled;
  }

  parse(content : string) : TemplateParameter[]{
    let matches = content.match(/{{\s*[\w\.\s]+\s*}}/g);
    let params : TemplateParameter[] = [];
    if(matches){
      params = matches.map((x) => x.match(/[\w\.\s]+/)[0])
                     .filter((v, i, a) => a.indexOf(v) === i)
                     .map((n) => new TemplateParameter(n, ''));
    }

    return params;    
  }

  create(content : string, parameter : TemplateParameter[]){
    let rq = new StabelV1Service.StabelCreateRequest();
    rq.content = content;
    rq.parameter = {};
    for(var i = 0; i < parameter.length; i++){
      var name = parameter[i].name;
      var val = parameter[i].value;
      rq.parameter[name] = val;
    }

    return this._apiService.post(rq);
  }
  
}
