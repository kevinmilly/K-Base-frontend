import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
<<<<<<< HEAD
  { path: '', loadChildren: () => import('./container/container.module').then(m => m.ContainerModule) },
  { path: '**', redirectTo: 'not-found' }
=======
  {path:'', loadChildren: () => import('./container/container.module').then(m => m.ContainerModule)}
>>>>>>> 42d81fb57986b306e8b0035988d1752653fdb6e5
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
