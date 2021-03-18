import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { TableComponent } from './components/table/table.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SharedButtonComponent } from './components/button/shared-button.component';
import { DifficultyPipe } from './pipes/difficulty-status.pipe';
import { TabComponent } from './components/tab/tab.component';



@NgModule({
  declarations: [
    TableComponent, 
    DropdownComponent,
    SharedButtonComponent,
    TabComponent,
    DifficultyPipe],
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
    TabComponent,
    DropdownComponent,
    SharedButtonComponent
  ],
})
export class SharedModule { }
