import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'add',
    component: AddUserComponent,
  },
  {
    path: 'user-home',
    component: UserHomeComponent,
    // canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
