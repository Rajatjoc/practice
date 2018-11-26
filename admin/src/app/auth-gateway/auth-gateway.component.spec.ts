import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGatewayComponent } from './auth-gateway.component';

describe('AuthGatewayComponent', () => {
  let component: AuthGatewayComponent;
  let fixture: ComponentFixture<AuthGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
