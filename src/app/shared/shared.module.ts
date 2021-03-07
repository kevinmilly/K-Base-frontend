import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { BackendService } from './services/backend.service';
import { MaterialModule } from './modules/material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  providers:[BackendService]
})
export class SharedModule { }
