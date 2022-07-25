import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deposit-withdraw',
  templateUrl: './deposit-withdraw.component.html',
  styleUrls: ['./deposit-withdraw.component.scss'],
})
export class DepositWithdrawComponent implements OnInit {
  @Input() data;

  withdrawForm: FormGroup;
  loading = false;
  submitted = false;
  faSpinner = faSpinner;
  operation;
  currencySymbol: string;
  currencyCode: string;
  action = 'Deposit';
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.currencySymbol = this.data.bankAccount.currency.symbol;
    this.currencyCode = this.data.bankAccount.currency.code;
    this.action = this.data.action;
    this.withdrawForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  get f() {
    return this.withdrawForm.controls;
  }

  onSubmit() {
    if (this.withdrawForm.invalid) {
      return;
    }
    const { action, bankAccount } = this.data;
    this.activeModal.close({
      action,
      bankAccount,
      amount: this.withdrawForm.controls['amount'].value,
    });
  }
}
