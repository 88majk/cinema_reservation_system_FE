import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RepertoirePageComponent } from './components/repertoire-page/repertoire-page.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/repertoire',
  pathMatch: 'full'
},
{
  path: 'register',
  component: RegisterPageComponent
},
{
  path: 'login',
  component: LoginPageComponent
},
{
  path: 'repertoire',
  component: RepertoirePageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
