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
  selector: '[lacksPermission]',
})
export class LacksPermissionDirective extends AbstractPermissionDirective {
  constructor(
    element: ElementRef,
    templateRef: TemplateRef<any>,
    viewContainer: ViewContainerRef,
    authService: AuthenticationService
  ) {
    super(element, templateRef, viewContainer, authService);
  }

  @Input() lacksPermission;

  override targetAttributeName = 'lacksPermission';

  override onHasPermission() {
    this.viewContainer.clear();
  }

  override onLacksPermission() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}
