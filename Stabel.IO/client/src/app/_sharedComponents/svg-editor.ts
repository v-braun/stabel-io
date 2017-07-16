import {Component, ElementRef, Inject, 
        Input, Output,
        SimpleChange, EventEmitter} from '@angular/core';

import * as vkbeautify from 'vkbeautify';

import * as ace from 'brace';
import 'brace/mode/svg';
import 'brace/theme/chrome';

import './svg-editor.scss';

// let vkbeautify : any;

@Component({
  selector: 'svg-editor',
  template: ''
})
export class SvgEditorComponent {

  @Output() 
  public onChange = new EventEmitter<string>();

  private _domNode: HTMLElement = null;
  private _editor : ace.Editor;

  constructor( @Inject(ElementRef) elementRef: ElementRef) {
      this._domNode = elementRef.nativeElement;      
  }



  setContent(text: string){
    this.updateAceEditor(text);
  }

  reinit(text: string){
    this.reinitEditor();
    this.updateAceEditor(text);
  }


  private beautify(content: string) : string{
    if(!content) {
      return '';
    }

    try{
      return vkbeautify.xml(content);
    }catch(e){
      return '';
    }
  }

  private updateAceEditor(newVal : string){
    if(!this._editor){
      return;
    }

    newVal = this.beautify(newVal);

    var currentText = this._editor.getValue();
    if(newVal === currentText){
      return;
    }
    
    this._editor.setValue(newVal, -1);
  }

  private reinitEditor(){
    if(this._editor){
      this._editor.destroy();
    }

    // ace has a strange "scroll the parent" behaviur that could not be fixed
    // reinit the entire editor if it has to be shown
    this._domNode.innerHTML = '';
    this._domNode.innerHTML = '<div class="svg-editor"></div>';
    let contentElement = this._domNode.firstChild as HTMLElement;

    this._editor = ace.edit(contentElement);
    this._editor.setTheme('ace/theme/chrome');
    this._editor.getSession().setMode('ace/mode/svg');
    this._editor.$blockScrolling = Infinity;

    this._editor.on('change', () => {
      var txt = this._editor.getValue();
      this.onChange.emit(txt);
    });
  }
  
}
