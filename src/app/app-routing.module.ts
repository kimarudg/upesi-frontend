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
    component: PagesLayoutComponent,
    children: [
      // User Pages

      {
        path: 'pages/login-boxed',
        component: LoginBoxedComponent,
        data: { extraParameter: '' },
      },
      {
        path: 'pages/register-boxed',
        component: RegisterBoxedComponent,
        data: { extraParameter: '' },
      },
      {
        path: 'pages/forgot-password-boxed',
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
