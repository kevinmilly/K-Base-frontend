import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalLayoutModule } from './global-layout/global-layout.module';
import { CoreModule } from './core/core.module';
import { NotesDisplayComponent } from './notes/notes-display/notes-display.component';



@NgModule({
  declarations: [
    AppComponent,
    NotesDisplayComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    GlobalLayoutModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
