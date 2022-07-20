import { HttpLink } from 'apollo-angular/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgReduxModule } from '@angular-redux/store';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArchitectUIState, rootReducer } from './theme-options/store';

// BOOTSTRAP COMPONENTS

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';

import {
  RegisterBoxedComponent,
  LoginBoxedComponent,
  ForgotPasswordBoxedComponent,
} from './components';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { PageTitleComponent } from './layout/components/page-title/page-title.component';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';

// HEADER

import { HeaderComponent } from './layout/components/header/header.component';
import { SearchBoxComponent } from './layout/components/header/elements/search-box/search-box.component';
import { UserBoxComponent } from './layout/components/header/elements/user-box/user-box.component';

// SIDEBAR

import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { LogoComponent } from './layout/components/sidebar/elements/logo/logo.component';

// FOOTER

import { FooterComponent } from './layout/components/footer/footer.component';
import { graphqlFactory } from './constants';
import { AlertPageComponent } from './components/alert-page/alert-page.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    AppComponent,
    RegisterBoxedComponent,
    LoginBoxedComponent,
    ForgotPasswordBoxedComponent,

    BaseLayoutComponent,
    PagesLayoutComponent,
    PageTitleComponent,

    HeaderComponent,
    SearchBoxComponent,
    UserBoxComponent,
    SidebarComponent,
    LogoComponent,
    FooterComponent,
    AlertPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    NgReduxModule,

    LoadingBarRouterModule,
    // Angular Bootstrap Components

    PerfectScrollbarModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // GraphQL
    ApolloModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: graphqlFactory,
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<ArchitectUIState>,
    private devTool: DevToolsExtension
  ) {
    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : (f) => f]
    );
  }
}
