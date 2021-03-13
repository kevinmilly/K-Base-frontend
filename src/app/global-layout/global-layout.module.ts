import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { Router, RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarComponent,
    SidenavComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    DashboardComponent,
    ToolbarComponent,
    SidenavComponent
   
  ]
})
export class GlobalLayoutModule { }
