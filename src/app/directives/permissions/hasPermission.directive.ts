import { AuthenticationService } from './../../services/authentication.service';
import { AbstractPermissionDirective } from './abstract-permission.directive';
import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[hasPermission]',
})
export class HasPermissionDirective extends AbstractPermissionDirective {
  constructor(
    element: ElementRef,
    templateRef: TemplateRef<any>,
    viewContainer: ViewContainerRef,
    authService: AuthenticationService
  ) {
    super(element, templateRef, viewContainer, authService);
  }

  @Input() hasPermission;

  override targetAttributeName = 'hasPermission';

  override onHasPermission() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  override onLacksPermission() {
    this.viewContainer.clear();
  }
}
