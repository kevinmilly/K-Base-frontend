import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { TableComponent } from './components/table/table.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SharedButtonComponent } from './components/button/shared-button.component';
import { AddConceptComponent } from './components/add-concept/add-concept.component';



@NgModule({
  declarations: [TableComponent, DropdownComponent,SharedButtonComponent, AddConceptComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    TableComponent, 
    DropdownComponent,
    AddConceptComponent,
    SharedButtonComponent
  ],
})
export class SharedModule { }
