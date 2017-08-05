import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {routing, RootComponent} from './root/root.component';


import { SamplesService } from './services/api/Samples.service';
import { StabelV1Service } from './services/api/StabelV1.service';
import { StabelService } from './services/Stabel.service';

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
import {GalleryComponent} from './components/gallery.component';
import {EditorComponent} from './home/editor';
import {MainComponent} from './home/home';
import {SvgEditorComponent} from './components/common/svg-editor';
import {HeaderComponent} from './components/layout/header.component';
import {TitleComponent} from './components/layout/title.component';
import {FooterComponent} from './components/layout/footer.component';
import {CopyFieldComponent} from './components/common/copy-field.component';
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
  providers: [SamplesService, StabelService, StabelV1Service],
  entryComponents: [StabelDialogComponent],
  bootstrap: [RootComponent]
})
export class AppModule {}
