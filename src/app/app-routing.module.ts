import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';

const routes: Routes = [
  { 
    path: 'auth',
    loadChildren: () =>  import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    canLoad: [IsAuthenticatedGuard],
    loadChildren: () =>  import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }