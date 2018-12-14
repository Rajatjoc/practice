import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsizeComponent } from './addsize.component';

describe('AddsizeComponent', () => {
  let component: AddsizeComponent;
  let fixture: ComponentFixture<AddsizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
