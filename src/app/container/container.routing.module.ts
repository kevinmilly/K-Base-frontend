import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalLayoutModule } from '../global-layout/global-layout.module';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component:MainComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    GlobalLayoutModule
  ],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
