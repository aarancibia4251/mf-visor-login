import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmptyRouteComponent} from './empty-route/empty-route.component';
import {LoginComponent} from './login/login.component';
import {LoginGuard} from '@aarancibia96/utils';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent
  },
  {
    path: '**',
    component: EmptyRouteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
