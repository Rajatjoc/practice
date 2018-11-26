import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCmsTemplateComponent } from './view-cms-template.component';

describe('ViewCmsTemplateComponent', () => {
  let component: ViewCmsTemplateComponent;
  let fixture: ComponentFixture<ViewCmsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCmsTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCmsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
