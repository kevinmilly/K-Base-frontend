import { NgModule } from '@angular/core';
import { LayoutModule } from '../layout/layout.module';
import { MainComponent } from './main/main.component';




@NgModule({
  declarations: [MainComponent],
  imports: [
    LayoutModule
  ],
  exports:[
    MainComponent
  ]
})
export class ContainerModule { }
