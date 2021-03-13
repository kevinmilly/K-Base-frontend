import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { Router, RouterModule, Routes } from '@angular/router';


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
