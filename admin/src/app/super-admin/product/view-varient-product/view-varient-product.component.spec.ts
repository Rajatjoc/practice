import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVarientProductComponent } from './view-varient-product.component';

describe('ViewVarientProductComponent', () => {
  let component: ViewVarientProductComponent;
  let fixture: ComponentFixture<ViewVarientProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVarientProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVarientProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
