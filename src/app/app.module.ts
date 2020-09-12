import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise'
import { HttpClientModule } from '@angular/common/http';
import { NumberFormatterComponent } from './number-formatter.component';
import { NumericEditorComponent } from './numeric-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberFormatterComponent,
    NumericEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    /* All custom components used by ag-Grid should be listed in the AgGridModule.withComponents */
    AgGridModule.withComponents([ NumberFormatterComponent, NumericEditorComponent ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
