import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [
  {path:"signup-page", component: SignupPageComponent},
  {path:"portfolio-page", component: PortfolioPageComponent},
  {path:"login-page", component: LoginPageComponent},
  {path: "", redirectTo: "login-page", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
