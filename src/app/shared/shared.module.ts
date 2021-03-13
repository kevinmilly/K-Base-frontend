import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { BackendService } from './services/backend.service';
import { MaterialModule } from './modules/material.module';
import { TableComponent } from './components/table/table.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';



@NgModule({
  declarations: [TableComponent, DropdownComponent],
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
