import { AlertService } from './../../services/alert.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-boxed',
  templateUrl: './login-boxed.component.html',
  styles: [],
})
export class LoginBoxedComponent implements OnInit {
  year = new Date().getFullYear();
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  faSpinner = faSpinner;

  returnUrl = '/';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    const redirectUrl = this.route.snapshot.queryParams.returnUrl;
    this.returnUrl = redirectUrl ? redirectUrl : '/';
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const email = this.f.email.value;
    const password = this.f.password.value;
    this.auth
      .login(email, password)
      .pipe(first())
      .subscribe(
        async (data) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.alertService.error(error.map((e) => e.message).join(' \n'));
        }
      );
  }
}
