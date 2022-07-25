import { BankAccount } from './../../constants/models/bank-account.model';
import { AlertService } from './../../services/alert.service';
import { DepositWithdrawComponent } from './../deposit-withdraw/deposit-withdraw.component';
import { AuthenticationService } from './../../services/authentication.service';
import { AccountsService } from './../../services/accounts.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef, //dataSource: MatTableDataSource<RsyncModel>;
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
  accounts;
  modal: NgbModalRef;
  // dataSource = new MatTableDataSource([]);
  dataSource: MatTableDataSource<BankAccount>;
  displayedColumns = [
    'name',
    'reference',
    'balance',
    'currency',
    'approved',
    'action',
  ];
  constructor(
    private service: AccountsService,
    private auth: AuthenticationService,
    private dialog: NgbModal,
    private alertService: AlertService
  ) {
    const userId = this.auth.currentUserValue.id;
    this.service.getUserBankAccounts(0, 50, userId).subscribe({
      next: (value) => {
        this.accounts = value.data.getUserBankAccounts.list;
        this.dataSource = new MatTableDataSource(
          value.data.getUserBankAccounts.list
        );
      },
      error: (err: any) => {
        this.alertService.error(err.map((e) => e.message).join(' \n'));
      },
      complete: () => {},
    });
  }

  ngOnInit(): void {}

  approveAccount(accountId, status) {
    const approval = {
      accountId,
      approval: status,
    };
    this.service.approveBankAccount(approval).subscribe({
      next: (data) => {
        // update
        const acc = data.data.approveBankAccount;
        const records = [...this.dataSource.data];
        const i = records.findIndex((a) => a.id === acc.id);
        records[i] = acc;
        this.dataSource = new MatTableDataSource(records);
      },
      complete: () => {},
      error: (error) => {
        this.alertService.error(error.map((e) => e.message).join(' \n'));
      },
    });
  }

  withdraw(bankAccount) {
    const modal = this.dialog.open(DepositWithdrawComponent);
    modal.componentInstance.data = {
      action: 'deposit',
      bankAccount,
    };
    modal.result
      .then((res) => {
        if (!res) return;
        const { amount } = res;
        this.service
          .withdrawBankAccount({
            amount,
            bankAccount: bankAccount.id,
          })
          .subscribe({
            next: (data) => {
              const bankAccount = data.data.withdrawAccount.account;
              const rows = [...this.dataSource.data];

              const index = rows.findIndex((acc) => acc.id === bankAccount.id);
              if (index >= 0) {
                rows[index] = bankAccount;
                this.dataSource.data = rows;
              }
            },
            error: (err) => {
              this.alertService.error(err.message);
            },
          });
      })
      .catch((e) => {
        //
      });
  }

  deposit(bankAccount) {
    const modal = this.dialog.open(DepositWithdrawComponent);
    modal.componentInstance.data = {
      action: 'deposit',
      bankAccount,
    };
    modal.result
      .then((res) => {
        if (!res) return;
        const { amount } = res;
        this.service
          .depositBankAccount({
            amount,
            bankAccount: bankAccount.id,
          })
          .subscribe({
            next: (data) => {
              const bankAccount = data.data.depositAccount.account;
              const rows = [...this.dataSource.data];

              const index = rows.findIndex((acc) => acc.id === bankAccount.id);
              if (index >= 0) {
                rows[index] = bankAccount;
                this.dataSource.data = rows;
              }
            },
            error: (err) => {
              this.alertService.error(err.message);
            },
          });
      })
      .catch((e) => {
        //
      });
  }
}
