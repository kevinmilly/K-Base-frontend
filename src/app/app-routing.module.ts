import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/login/auth.guard';
import { SplashComponent } from './core/splash/splash.component';

const routes: Routes = [
  // { path: '', loadChildren: () => import('./concepts/concepts.module').then(m => m.ConceptsModule),canActivate: [AuthGuard] },
  { path: '', component:SplashComponent},
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),canActivate: [AuthGuard] },
  { path: 'concepts', loadChildren: () => import('./concepts/concepts.module').then(m => m.ConceptsModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
