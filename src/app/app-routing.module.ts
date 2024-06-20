import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditCardApplicationComponent } from './credit-card-application/credit-card-application.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'credit-card', component: CreditCardComponent,canActivate: [AuthGuard] },
  { path: 'apply/:cardType', component: CreditCardApplicationComponent,canActivate: [AuthGuard] },
  { path: 'update-card/:id', component: CreditCardApplicationComponent,canActivate: [AuthGuard] },
  // { path: 'edit-card/:id', component: CreditCardApplicationComponent },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
