import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandmanagmentComponent } from './brandmanagment.component';

describe('BrandmanagmentComponent', () => {
  let component: BrandmanagmentComponent;
  let fixture: ComponentFixture<BrandmanagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandmanagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandmanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
