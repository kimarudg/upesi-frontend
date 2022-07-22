import { AuthenticationService } from './../../services/authentication.service';
import { AccountsService } from './../../services/accounts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
  accounts;
  constructor(
    private service: AccountsService,
    private auth: AuthenticationService
  ) {
    const userId = this.auth.currentUserValue.id;
    console.log({ userId });
    this.service.getUserBankAccounts(0, 50, userId).subscribe({
      next: (value) => {
        this.accounts = value.data.getUserAccounts.list;
      },
      error: (err: any) => {},
      complete: () => {},
    });
  }

  ngOnInit(): void {}
}
