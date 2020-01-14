import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { DetectadosComponent } from './menu/detectados/detectados.component';
import { VotarComponent } from './menu/votar/votar.component';
import { LoginComponent} from './menu/auth/login/login.component';
import {SignupComponent} from './menu/auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: VotarComponent },
  { path: 'votar', component: VotarComponent },
  { path: 'detectados', component: DetectadosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
