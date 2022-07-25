import { AuthenticationService } from './../../services/authentication.service';
import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive()
export class AbstractPermissionDirective implements OnInit, OnChanges {
  private currentUser;
  public permissions = [];
  public logicalOp = 'AND';
  targetAttributeName: string;

  constructor(
    protected element: ElementRef,
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.updateView();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes[this.targetAttributeName]) {
      console.log({ target: this.targetAttributeName });
      if (changes[this.targetAttributeName]?.currentValue?.length) {
        this.permissions = changes[this.targetAttributeName].currentValue; // -->>> 'BankAccountModel|update:any' ie Resouce:action
        this.updateView();
      } else {
        this.onHasPermission();
      }
    }
  }

  updateView() {
    if (this.checkPermission()) {
      this.onHasPermission();
    } else {
      this.onLacksPermission();
    }
  }

  protected onHasPermission() {} // Implemented in child directives

  protected onLacksPermission() {} // Implemented in child directives

  private checkPermission() {
    let hasPermission = false;

    if (this.currentUser && this.currentUser.permissions) {
      const perms = this.currentUser.permissions.map(
        (p) => `${p.resource}|${p.action}`
      );
      for (const checkPermission of this.permissions) {
        const permissionFound = perms.find(
          (x) => x.toUpperCase() === checkPermission.toUpperCase()
        );

        if (permissionFound) {
          hasPermission = true;

          if (this.logicalOp === 'OR') {
            break;
          }
        } else {
          hasPermission = false;
          if (this.logicalOp === 'AND') {
            break;
          }
        }
      }
    }
    return hasPermission;
  }
}
