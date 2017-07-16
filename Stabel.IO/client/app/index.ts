import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {routing, RootComponent} from './routes';

import {StabelSamples} from './services/StabelSamples';

import {MdTabsModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdListModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdIconModule, MdChipsModule,
        MdCardModule, MdCoreModule,
        MdDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


 
import {StabelDialogComponent} from './home/stabel-dialog';
import {GalleryComponent} from './_sharedComponents/gallery';
import {EditorComponent} from './home/editor';
import {MainComponent} from './home/home';
import {SvgEditorComponent} from './_sharedComponents/svg-editor';
import {HeaderComponent} from './_sharedComponents/header';
import {TitleComponent} from './_sharedComponents/title';
import {FooterComponent} from './_sharedComponents/footer';
import {CopyFieldComponent} from './_sharedComponents/copy-field';
import { ClipboardModule } from 'ngx-clipboard';

//import '~@angular/material/prebuilt-themes/deeppurple-amber.css';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    routing,
    MdTabsModule,
    MdInputModule,
    MdListModule,
    MdToolbarModule,
    MdButtonModule,
    BrowserAnimationsModule,
    ClipboardModule,
    MdIconModule,
    MdChipsModule,
    MdCardModule,
    MdDialogModule,
    HttpModule
  ],
  declarations: [
    RootComponent,
    MainComponent,
    EditorComponent,
    HeaderComponent,
    SvgEditorComponent,
    StabelDialogComponent,
    GalleryComponent,
    TitleComponent,
    FooterComponent,
    CopyFieldComponent
  ],
  providers: [StabelSamples],
  entryComponents: [StabelDialogComponent],
  bootstrap: [RootComponent]
})
export class AppModule {}
