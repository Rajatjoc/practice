import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageResetPasswordComponent } from './message-reset-password.component';

describe('MessageResetPasswordComponent', () => {
  let component: MessageResetPasswordComponent;
  let fixture: ComponentFixture<MessageResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
