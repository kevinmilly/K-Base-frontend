import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerModule } from './container/container.module';

const routes: Routes = [
  // {path:'', loadChildren: () => import('./container/container.module').then(m => ContainerModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
