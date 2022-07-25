import { APP_ROUTES } from './../../../../../constants/app-routes';
import { AuthenticationService } from './../../../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from '../../../../../theme-options';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  constructor(
    public globals: ThemeOptions,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate([APP_ROUTES.login]);
  }
}
