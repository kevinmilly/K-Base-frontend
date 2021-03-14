
import { NgModule } from '@angular/core';
import { GlobalLayoutModule } from '../global-layout/global-layout.module';


import { SharedModule } from '../shared/shared.module';
import { BackendService } from './services/backend.service';



@NgModule({
  declarations: [],
  imports: [
    GlobalLayoutModule,
    SharedModule
  ],
  providers: [BackendService]
})
export class CoreModule { }
