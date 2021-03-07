import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';



@NgModule({
  declarations: [DashboardComponent,ToolbarComponent],
  imports: [
  ],
  exports: [
    DashboardComponent,ToolbarComponent
  ]
})
export class LayoutModule { }
