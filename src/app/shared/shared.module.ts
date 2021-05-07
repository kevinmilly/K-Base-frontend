import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { TableComponent } from './components/table/table.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SharedButtonComponent } from './components/button/shared-button.component';
import { LevelPipe } from './pipes/level-status.pipe';
import { TabComponent } from './components/tab/tab.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { PopupExampleComponent } from './components/popup-example/popup-example.component';


const components = [
  TableComponent, 
  DropdownComponent,
  SharedButtonComponent,
  TabComponent,
  LevelPipe,
  InputFormComponent,
  KanbanComponent,
  PopupExampleComponent
];
const modules = [
  CommonModule,
  HttpClientModule,
  MaterialModule,
];

@NgModule({
  declarations: components,
  imports: modules,
  exports: [...components,...modules],
  entryComponents: [PopupExampleComponent]
})
export class SharedModule { }
