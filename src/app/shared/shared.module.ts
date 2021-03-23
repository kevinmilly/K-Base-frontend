import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { TableComponent } from './components/table/table.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SharedButtonComponent } from './components/button/shared-button.component';
import { DifficultyPipe } from './pipes/difficulty-status.pipe';
import { TabComponent } from './components/tab/tab.component';
import { EditElementComponent } from './components/edit-element/edit-element.component';


const components = [
  TableComponent, 
  DropdownComponent,
  SharedButtonComponent,
  TabComponent,
  DifficultyPipe,
  EditElementComponent
];
const modules = [
  CommonModule,
  HttpClientModule,
  MaterialModule,
];

@NgModule({
  declarations: components,
  imports: modules,
  exports: [...components,...modules]
})
export class SharedModule { }
