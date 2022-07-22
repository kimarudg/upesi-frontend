import { AccountListComponent } from './components/account-list/account-list.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  RegisterBoxedComponent,
  LoginBoxedComponent,
  ForgotPasswordBoxedComponent,
} from './components';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        // Dashboads

        path: '',
        component: DashboardComponent,
        data: { extraParameter: 'dashboardsMenu' },
      },
      {
        path: 'accounts/list',
        component: AccountListComponent,
        data: { extraParameter: 'elementsMenu' },
      },
    ],
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      // User Pages

      {
        path: 'auth/login',
        component: LoginBoxedComponent,
        data: { extraParameter: '' },
      },
      {
        path: 'auth/register',
        component: RegisterBoxedComponent,
        data: { extraParameter: '' },
      },
      {
        path: 'auth/forgot-password',
        component: ForgotPasswordBoxedComponent,
        data: { extraParameter: '' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
