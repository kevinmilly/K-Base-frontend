import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { Router, RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AddConceptComponent } from '../concepts/quick-add-concept/quick-add-concept.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    AddConceptComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent
   
  ]
})
export class GlobalLayoutModule { }
