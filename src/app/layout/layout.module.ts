import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [DashboardComponent,ToolbarComponent, SidenavComponent],
  imports: [
    SharedModule
  ],
  exports: [
    DashboardComponent,ToolbarComponent,SidenavComponent
  ]
})
export class LayoutModule { }
