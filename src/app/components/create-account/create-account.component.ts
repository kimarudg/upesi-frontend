import { APP_ROUTES } from './../../constants/app-routes';
import { AuthenticationService } from './../../services/authentication.service';
import { AccountsService } from './../../services/accounts.service';
import { AlertService } from './../../services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import CurrencyList from 'currency-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  accountApplicationForm: FormGroup;
  loading = false;
  submitted = false;
  faSpinner = faSpinner;
  currencies: any[];

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private service: AccountsService,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountApplicationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      reference: ['', [Validators.required, Validators.minLength(2)]],
      currency: ['', [Validators.required]],
    });
    this.currencies = Object.values(CurrencyList.getAll('en_KE'));
  }
  get f() {
    return this.accountApplicationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.accountApplicationForm.invalid) {
      return;
    }
    const name = this.accountApplicationForm.controls['name'].value;
    const reference = this.accountApplicationForm.controls['reference'].value;
    const currency = this.accountApplicationForm.controls['currency'].value;
    const userId = this.auth.currentUserValue.id;
    const owners = [
      {
        userId,
        authorizationType: 'Only',
      },
    ];

    const bankAccountDetails = {
      name,
      reference,
      owners,
      currency,
    };
    this.loading = true;
    this.service.applyBankAccount(bankAccountDetails).subscribe({
      next: (data) => {
        this.loading = false;
        this.submitted = false;
        this.accountApplicationForm.reset();
        this.alert.success('Account applied successfully');
        setTimeout(() => {
          this.router.navigate([APP_ROUTES.accountList]);
        }, 3000);
      },
      complete: () => {
        // not implemented
      },
      error: (e) => {
        const msg = e.message;
        this.alert.error(msg);
        this.loading = false;
      },
    });
  }
}
