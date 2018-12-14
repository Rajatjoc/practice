import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizemanagementComponent } from './sizemanagement.component';

describe('SizemanagementComponent', () => {
  let component: SizemanagementComponent;
  let fixture: ComponentFixture<SizemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
