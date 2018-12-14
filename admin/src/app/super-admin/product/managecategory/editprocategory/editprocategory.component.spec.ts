import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprocategoryComponent } from './editprocategory.component';

describe('EditprocategoryComponent', () => {
  let component: EditprocategoryComponent;
  let fixture: ComponentFixture<EditprocategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprocategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprocategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
