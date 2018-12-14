import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColormanagementComponent } from './colormanagement.component';

describe('ColormanagementComponent', () => {
  let component: ColormanagementComponent;
  let fixture: ComponentFixture<ColormanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColormanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColormanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
