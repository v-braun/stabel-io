import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import {StabelSamples} from './StabelSamples';


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
  
  constructor (private http: Http, 
               private sanitizer: DomSanitizer,
               private samples: StabelSamples) {
                 //console.log(configService.config);
               }
  
  
  getSample() : string{
    let sampleSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="78" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="a"><rect width="78" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#a)"><path fill="#555" d="M0 0h37v20H0z"/><path fill="#97CA00" d="M37 0h41v20H37z"/><path fill="url(#b)" d="M0 0h78v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="18.5" y="15" fill="#010101" fill-opacity=".3">{{left_text}}</text><text x="18.5" y="14">{{left_text}}</text><text x="56.5" y="15" fill="#010101" fill-opacity=".3">{{right_text}}</text><text x="56.5" y="14">{{right_text}}</text></g></svg>';
    return sampleSVG;
  }

  getSamples() : SampleItem[]{
    let buildStatue = new SampleItem(
      'build status',
      this.samples.buildStatus
    );
    buildStatue.svg = buildStatue.svg.replace('\n', '');
    buildStatue.params = this.parse(buildStatue.svg);
    buildStatue.params[0].value = 'passing';
    buildStatue.compiled = this.compile(buildStatue.svg, buildStatue.params);


    let serviceStatus = new SampleItem(
      'service status',
      this.samples.serviceStatus
    );
    serviceStatus.svg = serviceStatus.svg.replace('\n', '');
    serviceStatus.params = this.parse(serviceStatus.svg);
    serviceStatus.params[0].value = 'running';
    serviceStatus.params[1].value = 'backend';
    serviceStatus.compiled = this.compile(serviceStatus.svg, serviceStatus.params);



    let location = new SampleItem(
      'location',
      this.samples.location
    );
    location.svg = location.svg.replace('\n', '');
    location.params = this.parse(location.svg);
    location.params[0].value = 'no';
    location.params[1].value = 'at home';
    location.compiled = this.compile(location.svg, location.params);


    let visitors = new SampleItem(
      'visitors',
      this.samples.visitors
    );
    visitors.svg = visitors.svg.replace('\n', '');
    visitors.params = this.parse(visitors.svg);
    visitors.params[0].value = '12345';
    visitors.compiled = this.compile(visitors.svg, visitors.params);


    let result : SampleItem[] = [];
    result.push(buildStatue);
    result.push(serviceStatus);
    result.push(location);
    result.push(visitors);


    return result;
  }

  compile(content : string, params : TemplateParameter[]) : SafeResourceUrl{
    // try{
      params.forEach(p => {
        var exp = '{{' + p.name + '}}';
        content = content.replace(new RegExp(exp, 'g'), p.value);
      });

      let contentBase64 = window.btoa(content);
      var compiledStr = `data:image/svg+xml;base64,${contentBase64}`;
      let compiled = this.sanitizer.bypassSecurityTrustResourceUrl(compiledStr);

      return compiled;
    // }
    // catch(e){
    //   console.log(e);
    //   return null;
    // }
    
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
    console.log('create ...');
  }
  
}
