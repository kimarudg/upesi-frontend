import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPageComponent } from './alert-page.component';

describe('AlertPageComponent', () => {
  let component: AlertPageComponent;
  let fixture: ComponentFixture<AlertPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
