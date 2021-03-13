import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
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
=======
import { MainContainerComponent } from './main/maincontainer.component';

const routes: Routes = [
    {path:'', component:MainContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule {
    
}
>>>>>>> 42d81fb57986b306e8b0035988d1752653fdb6e5
