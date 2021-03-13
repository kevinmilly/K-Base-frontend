
import { NgModule } from '@angular/core';
import { GlobalLayoutModule } from '../global-layout/global-layout.module';


import { SharedModule } from '../shared/shared.module';
import { ContainerRoutingModule } from './container.routing.module';
import { MainComponent } from './main/main.component';




@NgModule({
  declarations: [MainComponent],
  imports: [
    ContainerRoutingModule,
    GlobalLayoutModule,
    SharedModule
  ]
})
export class ContainerModule { }
