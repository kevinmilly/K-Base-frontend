
import { NgModule } from '@angular/core';
import { GlobalLayoutModule } from '../global-layout/global-layout.module';


import { SharedModule } from '../shared/shared.module';
import { BackendService } from './services/backend.service';
import { LoginComponent } from './auth/login/login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    GlobalLayoutModule,
    SharedModule
  ],
  exports: [LoginComponent],
  providers: [BackendService]
})
export class CoreModule { }
