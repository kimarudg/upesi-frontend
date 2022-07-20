import { AlertService } from './../../services/alert.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from '../../constants';

@Component({
  selector: 'app-alert',
  templateUrl: './alert-page.component.html',
  styleUrls: ['./alert-page.component.scss'],
})
export class AlertPageComponent implements OnInit, OnDestroy {
  @Input() id: string;
  alerts: Alert[] = [];
  subscription: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService
      .onAlert(this.id)
      .subscribe((alert) => {
        if (!alert.message) {
          // clear alerts when an empty alert is received
          this.alerts = [];
          return;
        }
        // add alert to array
        this.alerts.push(alert);
      });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    if (this.subscription) this.subscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    // remove specified alert from array
    this.alerts = this.alerts.filter((x) => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert-success';
      case AlertType.Error:
        return 'alert alert-danger';
      case AlertType.Info:
        return 'alert alert-info';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }
}
