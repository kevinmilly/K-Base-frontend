
import { NgModule } from '@angular/core';
import { GlobalLayoutModule } from '../global-layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { ContainerRoutingModule } from './container.routing.module';
import { MainContainerComponent } from './main/maincontainer.component';




@NgModule({
  declarations: [MainContainerComponent],
  imports: [
    ContainerRoutingModule,
    GlobalLayoutModule,
    SharedModule
  ]
})
export class ContainerModule { }
