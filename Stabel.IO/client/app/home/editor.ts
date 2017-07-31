import {Component, SimpleChange, ViewChild, EventEmitter, Output} from '@angular/core';
import { SafeResourceUrl} from '@angular/platform-browser';

import {StabelService, TemplateParameter, SampleItem} from '../services/StabelService';
import { DomSanitizer} from '@angular/platform-browser';
import {MdTabChangeEvent} from '@angular/material';
import {SvgEditorComponent} from '../components/common/svg-editor';



import './editor.scss';

export class GenerateRequest{
  public content : string;
  public compiledContent : SafeResourceUrl;
  public params : TemplateParameter[];
}

@Component({
  selector: 'stabel-editor',
  template: require('./editor.html'),
  providers: [StabelService]
})
export class EditorComponent {

  @Output() 
  public generate = new EventEmitter<GenerateRequest>();
  public compiled : SafeResourceUrl;
  public params : TemplateParameter[];
  public sampleItems : SampleItem[];

  @ViewChild(SvgEditorComponent)
  private _svgEditor: SvgEditorComponent;
  private _content: string;
  private selectedTab = 0;

  constructor(
    private stabelService : StabelService){

    stabelService.getSamples().subscribe(data => {
      this.sampleItems = data;
      this.showSample(this.sampleItems[0]);
      console.log(this.sampleItems[0]);
    });
  }

  ngAfterViewInit() {
    this._svgEditor.setContent(this._content);
    this._svgEditor.onChange.subscribe(txt => {
      this._content = txt;
      let params = this.stabelService.parse(this._content);
      this.params = this.updateParams(params, this.params);

      this.compiled = this.stabelService.compile(this._content, this.params);
    });
  }

  generateClicked(){
    let req = new GenerateRequest();
    req.content = this._content;
    req.compiledContent = this.compiled;
    req.params = this.params;

    this.generate.emit(req);
  }
  tabChanged(params: MdTabChangeEvent){
    if(params.index === 1){
      this._svgEditor.reinit(this._content);
    }
  }
  paramChanged(){
    this.compiled = this.stabelService.compile(this._content, this.params);
  }

  galleryItemSelected(item : SampleItem){
    this.showSample(item);
    this.selectedTab = 0;
  }




  private updateParams(newParams : TemplateParameter[], currentParams : TemplateParameter[]){
    for(let i = 0; i < newParams.length; i++){
      if(currentParams.length > i){
        newParams[i].value = currentParams[i].value;
      }
    }

    return newParams;
  }

  private showSample(item : SampleItem){
    if(!item) return;
    this._content = item.svg;
    this.params = item.params;
    this.compiled = item.compiled;

  }
  
}
