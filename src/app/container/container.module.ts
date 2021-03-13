
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { LayoutModule } from '../layout/layout.module';
import { MainComponent } from './main/main.component';
=======
import { GlobalLayoutModule } from '../global-layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { ContainerRoutingModule } from './container.routing.module';
import { MainContainerComponent } from './main/maincontainer.component';
>>>>>>> 42d81fb57986b306e8b0035988d1752653fdb6e5




@NgModule({
<<<<<<< HEAD
  declarations: [MainComponent],
  imports: [
    LayoutModule
  ],
  exports:[
    MainComponent
=======
  declarations: [MainContainerComponent],
  imports: [
    ContainerRoutingModule,
    GlobalLayoutModule,
    SharedModule
>>>>>>> 42d81fb57986b306e8b0035988d1752653fdb6e5
  ]
})
export class ContainerModule { }
