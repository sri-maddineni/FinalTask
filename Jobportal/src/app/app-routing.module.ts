import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' }, //default route
  { path: '', component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: AboutComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
