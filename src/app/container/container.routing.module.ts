import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component:MainComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LayoutModule
  ],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
